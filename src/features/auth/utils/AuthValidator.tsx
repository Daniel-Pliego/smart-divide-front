import { Redirect, SplashScreen, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { getAuthToken } from "./auth";

SplashScreen.preventAutoHideAsync();

const PUBLIC_PATHS = ["/auth/signIn", "/auth/signUp"];

export const AuthValidator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const validateAuth = async () => {
            const authToken = await getAuthToken();

            if (authToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        validateAuth();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    if (!isLoading) {
        if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
            return <Redirect href="/auth/signIn" />;
        }
        if (isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
            return <Redirect href="/(tabs)/(group)" />;
        }
    }

    return null;
};
