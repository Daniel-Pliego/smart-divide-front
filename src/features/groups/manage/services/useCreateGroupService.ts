import { apiClient } from "@/features/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GroupFormData } from "../types/groupForm";

interface useCreateGroupServiceProps {
    onSuccess: () => void;
    onError?: (error: AxiosError) => void;
}

export const useCreateGroupService = ({ onSuccess, onError }: useCreateGroupServiceProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: GroupFormData) => {
            return await apiClient.post(`/groups`, data);
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-list"] });
        },

        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
