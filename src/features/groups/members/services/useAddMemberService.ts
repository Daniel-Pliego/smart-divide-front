import { apiClient } from "@/features/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddMember } from "../types";

interface useAddMemberServiceProps {
    onSuccess: () => void;
    onError?: (error: AxiosError) => void;
    groupId: string;
}

export const useAddMemberService = ({
    onSuccess,
    onError,
    groupId,
}: useAddMemberServiceProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddMember) => {
            const url = `groups/${groupId}/members`;
            return await apiClient.post(url, data);
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["group-members", groupId] });
        },

        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
