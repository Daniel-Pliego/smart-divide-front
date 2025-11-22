import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { GroupMember } from "../types";

export const useGetGroupMembersService = (groupId: string) => {
    return useQuery({
        queryKey: ["group-members", groupId],
        enabled: Boolean(groupId),
        queryFn: async () => {
            const authStore = await getAuthStore();

            const response = await apiClient.get<ResponseWrapper<GroupMember[]>>(
                `/user/${authStore?.userId}/groups/${groupId}/members`
            );

            return response?.data?.body;
        },
    });
};
