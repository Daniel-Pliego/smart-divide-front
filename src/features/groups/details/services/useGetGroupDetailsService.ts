import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { GroupDetails } from "../types";

interface useGetGroupsService {
    groupId: string;
}

export const useGetGroupDetailsService = ({ groupId }: useGetGroupsService) => {
    return useQuery({
        queryKey: ["group-detail", groupId],
        enabled: !!groupId,
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<GroupDetails>>(
                `/groups/${groupId}/transactions`
            );

            return response?.data?.body;
        },
    });
};
