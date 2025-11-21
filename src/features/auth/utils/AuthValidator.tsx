import { Redirect, SplashScreen, usePathname } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

const PUBLIC_PATHS = ["/auth/signIn", "/auth/signUp"];

export const AuthValidator = () => {
    const { isLoading, isAuthenticated } = useAuth();
    const pathname = usePathname();

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
