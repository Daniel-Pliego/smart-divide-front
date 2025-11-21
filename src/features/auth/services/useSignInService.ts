import { apiClient } from "@/features/config/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthWrappedResponse } from "../types";
import { UserSignIn } from "../types/UserSignIn";

interface useSignInServiceProps {
    onSuccess: (data: AuthWrappedResponse) => void;
    onError?: (error: AxiosError) => void;
}

export const useSignInService = ({ onSuccess, onError }: useSignInServiceProps) => {
    return useMutation({
        mutationFn: (data: UserSignIn) => apiClient.post<AuthWrappedResponse>("/auth/sign-in", data),
        onSuccess: ({ data }) => onSuccess(data),
        onError: (error) => {
            onError?.(error as AxiosError);
        },
    });
};
