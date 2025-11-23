import { AUTH_STORE_KEY } from "@/features/config/enviroment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "../types";

let authTokenCache: string = "";
let onUnauthorized: (() => Promise<void> | void) | null = null;

export const setUnauthorizedHandler = (handler: (() => Promise<void> | void) | null) => {
    onUnauthorized = handler;
};

export const notifyUnauthorized = async () => {
    if (onUnauthorized) {
        await onUnauthorized();
    }
};

export const getCachedAuthToken = (): string | null => authTokenCache ?? null;

export const getAuthStore = async (): Promise<AuthResponse | null> => {
    const authStore = await AsyncStorage.getItem(AUTH_STORE_KEY);
    return authStore ? JSON.parse(authStore) : null;
};

export const getAuthToken = async (): Promise<string | null> => {
    if (authTokenCache) {
        return authTokenCache;
    }

    const authStore = await AsyncStorage.getItem(AUTH_STORE_KEY);
    const auth = authStore ? JSON.parse(authStore) : null;
    authTokenCache = auth ? auth.token : null;

    return authTokenCache;
};

export const setAuthToken = async (authResponse: AuthResponse): Promise<void> => {
    authTokenCache = authResponse.token;
    await AsyncStorage.setItem(AUTH_STORE_KEY, JSON.stringify(authResponse));
};

export const removeAuthToken = async (): Promise<void> => {
    authTokenCache = "";
    await AsyncStorage.removeItem(AUTH_STORE_KEY);
};
