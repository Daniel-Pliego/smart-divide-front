import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useSignUpService } from "../services/useSignUpService";
import { AuthWrappedResponse, UserSignUpForm } from "../types";
import { mapSignUpFormToUserSignUp } from "../utils";
interface useSignInStateProps {
    showToast: (message: string, type: "success" | "error") => void;
}

const messagesForStatus: Record<number, string> = {
    409: "El usuario ya existe. Por favor, intenta con otro correo electrónico",
};

export const useSignUpState = (props: useSignInStateProps) => {
    const { login } = useAuth();

    const onSuccess = async ({ body }: AuthWrappedResponse) => {
        props.showToast("¡Su cuenta ha sido creada exitosamente!", "success");
        await login(body);
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
