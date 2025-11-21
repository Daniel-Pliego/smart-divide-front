import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse } from "../types";
import { getAuthToken, removeAuthToken, setAuthToken } from "../utils";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (authResponse: AuthResponse) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                await removeAuthToken();
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
        };

        validateAuth();
    }, []);

    const login = async (authResponse: AuthResponse) => {
        await setAuthToken(authResponse);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await removeAuthToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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