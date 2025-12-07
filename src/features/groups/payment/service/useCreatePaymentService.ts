import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreatePaymentRequest } from "../types";

interface useCreatePaymentServiceProps {
    onSuccess: () => void;
    onError?: (error: AxiosError) => void;
    groupId: string;
}

export const useCreatePaymentService = ({
    onSuccess,
    onError,
    groupId,
}: useCreatePaymentServiceProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreatePaymentRequest) => {
            const auth = await getAuthStore();
            const url = `user/${auth?.userId}/groups/${groupId}/payments`;
            console.log("Creating payment:", { url, data, auth });
            return await apiClient.post(url, data);
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-detail", groupId] });
            queryClient.invalidateQueries({ queryKey: ["group-list"] });
        },

        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
