import { apiClient } from "@/features/config/api";
import { useQuery } from "@tanstack/react-query";
import { ResponseWrapper } from "../../config/types/ResponseWrapper";
import { FriendDetail } from "../types/FriendDetail";

export const useGetFriendsService = () => {
    return useQuery({
        queryKey: ["friends"],
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<FriendDetail[]>>(`friendship`);

            return response.data.body;
        },
    });
};
