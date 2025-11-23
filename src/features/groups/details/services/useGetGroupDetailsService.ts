import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { GroupDetails } from "../types";

interface useGetGroupsService {
    groupId: string;
    userId: string;
}

export const useGetGroupDetailsService = ({ groupId, userId }: useGetGroupsService) => {
    return useQuery({
        queryKey: ["group-detail", groupId],
        enabled: !!groupId && !!userId,
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<GroupDetails>>(
                `/user/${userId}/groups/${groupId}/transactions`
            );

            return response?.data?.body;
        },
    });
};
