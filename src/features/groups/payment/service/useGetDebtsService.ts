import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { Debts } from "../types";

export function useGetDebtsService(groupId: string) {
    return useQuery({
        queryKey: ["debts", groupId],
        enabled: Boolean(groupId),
        queryFn: async () => {
            const auth = await getAuthStore();

            const response = await apiClient.get<ResponseWrapper<Debts>>(
                `groups/${groupId}/balances/users/${auth?.userId}`
            );

            return response.data.body;
        },
    });
}
