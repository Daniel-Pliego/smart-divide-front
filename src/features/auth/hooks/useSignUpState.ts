import { AxiosError } from "axios";
import { router } from "expo-router";
import { useSignUpService } from "../services/useSignUpService";
import { AuthWrappedResponse, UserSignUpForm } from "../types";
import { mapSignUpFormToUserSignUp, setAuthToken } from "../utils";

interface useSignInStateProps {
    showToast: (message: string, type: "success" | "error") => void;
}

const messagesForStatus: Record<number, string> = {
    409: "El usuario ya existe. Por favor, intenta con otro correo electrónico",
};

export const useSignUpState = (props: useSignInStateProps) => {
    const onSuccess = async ({ body }: AuthWrappedResponse) => {
        props.showToast("¡Su cuenta ha sido creada exitosamente!", "success");
        await setAuthToken(body);
        setTimeout(() => {
            router.replace("/(tabs)/group");
        }, 500);
    };

    const onError = (error: AxiosError) => {
        const status = error?.response?.status;

        const errorMessage =
            messagesForStatus[status || 0] ?? "Oops! Ha ocurrido un error inesperado";

        props.showToast(errorMessage, "error");
    };

    const mutation = useSignUpService({ onSuccess, onError });

    const handleSubmit = (data: UserSignUpForm) => {
        const user = mapSignUpFormToUserSignUp(data);

        mutation.mutate(user);
    };

    return {
        handleSubmit,
    };
};
