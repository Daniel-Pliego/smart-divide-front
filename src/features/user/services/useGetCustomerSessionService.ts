import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { CustomerSession } from "../types/CustomerSession";

export function useGetCustomerSessionService() {
    return useQuery({
        queryKey: ["customer-session"],
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<CustomerSession>>(
                `stripe/customerSession`
            );

            return response.data.body;
        },
    });
}
