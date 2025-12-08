import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { useQuery } from "@tanstack/react-query";
import { UserDetails } from "../types/UserDetails";
import { ResponseWrapper } from './../../config/types/ResponseWrapper';

export const useGetUserDetailsService = () => {

    return useQuery({
        queryKey: ["user-details"],
        queryFn: async () => {
            const auth = await getAuthStore();

            const response = await apiClient.get<ResponseWrapper<UserDetails>>(
                `user/${auth?.userId}`
            );

            return response.data.body;
        },
    });
};

