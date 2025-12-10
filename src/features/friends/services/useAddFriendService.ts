import { apiClient } from "@/features/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FriendRequest } from "../types/FriendRequest";

interface useAddFriendServiceProps {
    onSuccess: () => void;
    onError?: (error: AxiosError) => void;
}

export const useAddFriendService = ({
    onSuccess,
    onError,
}: useAddFriendServiceProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FriendRequest) => {
            const url = `friendship`;
            return await apiClient.post(url, data);
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        },

        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
