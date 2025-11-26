import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Expense } from "../types";

interface useCreateExpenseServiceProps {
    onSuccess: () => Promise<void>;
    onError?: (error: AxiosError) => Promise<void>;
    groupId: string;
}

export const useCreateExpenseService = ({
    onSuccess,
    onError,
    groupId,
}: useCreateExpenseServiceProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Expense) => {
            const auth = await getAuthStore();
            return await apiClient.post(`user/${auth?.userId}/groups/${groupId}/expense`, data);
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-detail", groupId] });
        },

        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
