import { getAuthStore } from "@/features/auth/utils";
import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { CustomerSession } from "../types/CustomerSession";

export function useGetCustomerSessionService() {
    return useQuery({
        queryKey: ["customer-session"],
        queryFn: async () => {
            const auth = await getAuthStore();

            const response = await apiClient.get<ResponseWrapper<CustomerSession>>(
                `api/stripe/${auth?.userId}/customerSession`
            );

            return response.data.body;
        },
    });
}
