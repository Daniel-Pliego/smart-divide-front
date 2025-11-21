import axios from "axios";
import { navigate } from "expo-router/build/global-state/routing";
import { getAuthToken, removeAuthToken } from "../auth/utils";
import { API_URL } from "./enviroment";

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(async (config) => {
    const authToken = await getAuthToken();

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
            await removeAuthToken();
            navigate("/auth/signIn");
        }

        return Promise.reject(error);
    }
);
