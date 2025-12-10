import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { ExpenseDetails } from "../types/ExpenseDetails";

export const useGetExpenseDetailsService = (groupId: string, expenseId: string) => {
    return useQuery({
        queryKey: ["expense-detail", groupId, expenseId],
        enabled: Boolean(groupId && expenseId),
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<ExpenseDetails>>(
                `/groups/${groupId}/expense/${expenseId}`
            );

            return response.data.body;
        },
    });
};
