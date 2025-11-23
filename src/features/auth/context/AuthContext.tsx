import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthResponse } from "../types";
import { getAuthToken, removeAuthToken, setAuthToken, setUnauthorizedHandler } from "../utils";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (authResponse: AuthResponse) => Promise<void>;
    logout: () => Promise<void>;
    validateAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const validateAuth = useCallback(async () => {
        try {
            const authToken = await getAuthToken();
            if (authToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (authResponse: AuthResponse) => {
        await setAuthToken(authResponse);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(async () => {
        await removeAuthToken();
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        validateAuth();
    }, [validateAuth]);

    useEffect(() => {
        setUnauthorizedHandler(logout);

        return () => setUnauthorizedHandler(null);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, validateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
