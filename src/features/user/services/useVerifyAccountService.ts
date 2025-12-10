import { apiClient } from "@/features/config/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseWrapper } from "./../../config/types/ResponseWrapper";

interface VerifyAccountArgs {
    userId: string;
    returnUrl: string;
    refreshUrl: string;
}

interface OnboardingResponse {
    url: string;
}

export default function useVerifyAccountService() {
    return useMutation<ResponseWrapper<OnboardingResponse>, AxiosError, VerifyAccountArgs>({
        mutationFn: async ({ userId, returnUrl, refreshUrl }) => {
            const endpoint = "/stripe/onboarding/link";
            const response = await apiClient.post(endpoint, null, {
                params: {
                    userId,
                    returnUrl,
                    refreshUrl,
                },
            });

            return response.data;
        },

        onSuccess: (data) => {
            console.log("Link generado con éxito:", data.body.url);
        },

        onError: (error) => {
            console.error("Error generando link de onboarding:", error.response?.data);
        },
    });
}
