import { AUTH_STORE_KEY } from "@/features/config/enviroment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "../types";

export const getAuthStore = async (): Promise<AuthResponse | null> => {
    const authStore = await AsyncStorage.getItem(AUTH_STORE_KEY);
    return authStore ? JSON.parse(authStore) : null;
};

export const getAuthToken = async (): Promise<string | null> => {
    const authStore = await AsyncStorage.getItem(AUTH_STORE_KEY);
    const auth = authStore ? JSON.parse(authStore) : null;
    return auth ? auth.token : null;
};

export const setAuthToken = async (authResponse: AuthResponse): Promise<void> => {
    await AsyncStorage.setItem(AUTH_STORE_KEY, JSON.stringify(authResponse));
};

export const removeAuthToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(AUTH_STORE_KEY);
};
