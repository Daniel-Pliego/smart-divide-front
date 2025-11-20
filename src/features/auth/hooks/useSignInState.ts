import { router } from "expo-router";
import { useSignInService } from "../services/useSignInService";
import { AuthWrappedResponse, UserSignIn } from "../types";
import { setAuthToken } from "../utils";

interface useSignInStateProps {
    showToast: (message: string, type: "success" | "error") => void;
}

export const useSignInState = (props: useSignInStateProps) => {
    const onSuccess = async ({ body }: AuthWrappedResponse) => {
        props.showToast("¡Inicio de sesión exitoso!", "success");
        await setAuthToken(body);
        setTimeout(() => {
            router.replace("/(tabs)/group");
        }, 500);
    };

    const onError = () => {
        props.showToast("Error al iniciar sesión. Por favor, verifica tus credenciales.", "error");
    };

    const mutation = useSignInService({ onSuccess, onError });

    const handleSubmit = (data: UserSignIn) => {
        mutation.mutate(data);
    };

    return {
        handleSubmit,
    };
};
