import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useQuery } from "@tanstack/react-query";
import { SetUpIntent } from "../types/SetUpIntent";

export function useGetSetUpIntentService() {
    return useQuery({
        queryKey: ["setup-intent"],
        queryFn: async () => {
            const response = await apiClient.get<ResponseWrapper<SetUpIntent>>(
                `stripe/setupIntent`
            );

            return response.data.body;
        },
    });
}
