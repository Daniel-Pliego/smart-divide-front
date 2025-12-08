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
            await apiClient.delete<ResponseWrapper<void>>(
                `/groups/${groupId}/expense/${expenseId}`
            );
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-detail", groupId] });
            queryClient.invalidateQueries({ queryKey: ["group-list"] });
        },
        onError: (error) => {
            onError(error as AxiosError);
        },
    });
};
