import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { GroupInfoResume } from "../types";

export const useGetGroupListService = () => {
    return useQuery({
        queryKey: ["group-list"],
        queryFn: async () => {
            const auth = await getAuthStore();

            const response = await apiClient.get<ResponseWrapper<GroupInfoResume[]>>(
                `/user/${auth?.userId}/groups`
            );

            return response.data;
        },
    });
};
