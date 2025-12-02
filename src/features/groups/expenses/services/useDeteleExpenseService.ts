import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface useDeteleExpenseService {
    groupId: string;
    onSuccess: () => void;
    onError: (error: AxiosError) => void;
}

export const useDeteleExpenseService = ({
    groupId,
    onSuccess,
    onError,
}: useDeteleExpenseService) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (expenseId: string) => {
            const authUser = await getAuthStore();
            await apiClient.delete<ResponseWrapper<void>>(
                `/user/${authUser?.userId}/groups/${groupId}/expense/${expenseId}`
            );
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-detail", groupId] });
        },
        onError: (error) => {
            onError(error as AxiosError);
        },
    });
};
