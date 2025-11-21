import { apiClient } from "@/features/config/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthWrappedResponse, UserSignUp } from "../types";

interface useSignUpServiceProps {
    onSuccess: (data: AuthWrappedResponse) => void;
    onError?: (error: AxiosError) => void;
}

export const useSignUpService = ({ onSuccess, onError }: useSignUpServiceProps) => {
    return useMutation({
        mutationFn: (data: UserSignUp) => apiClient.post<AuthWrappedResponse>("/auth/sign-up", data),
        onSuccess: ({ data }) => onSuccess(data),
        onError: (error) => {
            onError?.(error as AxiosError);
        },
    });
};
