import { router } from "expo-router";
import { useCreateGroupService } from "../services";
import { GroupFormData } from "../types/groupForm";

interface useCreateGroupStateProps {
    showToast: (message: string, type: "success" | "error") => void;
}

export const useCreateGroupState = ({ showToast }: useCreateGroupStateProps) => {
    const onSuccess = () => {
        showToast("¡Grupo creado exitosamente!", "success");
        setTimeout(() => {
            router.back();
        }, 500);
    };

    const mutation = useCreateGroupService({ onSuccess });

    const handleSubmit = (group: GroupFormData) => {
        mutation.mutate(group);
    };

    return {
        handleSubmit,
        mode: "create",
    };
};
