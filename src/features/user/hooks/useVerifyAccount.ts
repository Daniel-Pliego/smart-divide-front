import { getAuthStore } from "@/features/auth/utils";
import { useQueryClient } from "@tanstack/react-query";
import { createURL } from "expo-linking";
import { openBrowserAsync } from "expo-web-browser";
import { useEffect } from "react";
import { AppState } from "react-native";
import useVerifyAccountService from "../services/useVerifyAccountService";

export const useVerifyAccount = () => {
    const verifyAccountService = useVerifyAccountService();

    const queryClient = useQueryClient();

    useEffect(() => {
        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                queryClient.invalidateQueries({ queryKey: ["user-details"] });
            }
        });
        return () => sub.remove();
    }, []);

    const initVerification = async () => {
        try {
            const auth = await getAuthStore();
            const userId = auth?.userId || "";
            const returnUrl = createURL("/(tabs)/account");
            const refreshUrl = createURL("/(tabs)/account");

            const response = await verifyAccountService.mutateAsync({
                userId,
                returnUrl,
                refreshUrl,
            });

            await openBrowserAsync(response.body.url);
            queryClient.invalidateQueries({ queryKey: ["user-details"] });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        initVerification,
    };
};
