import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { GroupInfoResume } from "../types";

export const useGetGroupListService = () => {
    return useQuery({
        queryKey: ["group-list"],
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<GroupInfoResume[]>>(
                `/groups`
            );

            return response.data;
        },
    });
};
