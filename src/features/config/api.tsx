import axios from "axios";
import { getAuthToken, getCachedAuthToken, notifyUnauthorized } from "../auth/utils";
import { API_URL } from "./enviroment";

export const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(async (config) => {
    let authToken = getCachedAuthToken();

    if (!authToken) {
        authToken = await getAuthToken();
    }

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
            await notifyUnauthorized();
        }

        return Promise.reject(error);
    }
);
