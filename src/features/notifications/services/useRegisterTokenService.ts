import { apiClient } from "@/features/config/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseRegisterTokenServiceProps {
    onSuccess?: () => void;
    onError?: (error: AxiosError) => void;
}

interface RegisterDeviceTokenDTO {
    token: string;
}

export const useRegisterTokenService = ({
    onSuccess,
    onError,
}: UseRegisterTokenServiceProps = {}) => {
    return useMutation({
        mutationFn: async (data: RegisterDeviceTokenDTO) => {
            return await apiClient.post("/notifications/token", data);
        },
        onSuccess: () => {
            onSuccess?.();
        },
        onError: (error: AxiosError) => {
            onError?.(error);
        },
    });
};
