import { useAuth } from "../context/AuthContext";
import { useSignInService } from "../services/useSignInService";
import { AuthWrappedResponse, UserSignIn } from "../types";

interface useSignInStateProps {
    showToast: (message: string, type: "success" | "error") => void;
}

export const useSignInState = ({ showToast}: useSignInStateProps) => {
    const { login } = useAuth();

    const onSuccess = async ({ body }: AuthWrappedResponse) => {
        showToast("¡Inicio de sesión exitoso!", "success");
        await login(body);
    };

    const onError = () => {
        showToast("Error al iniciar sesión. Por favor, verifica tus credenciales.", "error");
    };

    const mutation = useSignInService({ onSuccess, onError });

    const handleSubmit = (data: UserSignIn) => {
        mutation.mutate({
            email: data.email.toLocaleLowerCase(),
            password: data.password,
        });
    };

    return {
        handleSubmit,
    };
};
