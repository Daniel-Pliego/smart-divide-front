import { AxiosError } from "axios";
import { router } from "expo-router";
import { useCreateExpenseService } from "../services";
import { ExpenseForm } from "../types";
import { mapFormToModel } from "../utils/mapFormToModel";

interface useCreateExpenseProps {
    showToast: (message: string, type: "success" | "error") => void;
    groupId: string;
}

export const useCreateExpense = ({ showToast, groupId }: useCreateExpenseProps) => {
    const onSuccess = () => {
        showToast("¡Gasto creado exitosamente!", "success");
        setTimeout(() => {
            router.replace(`/(tabs)/(group)/${groupId}`);
        }, 500);
    };

    const onError = (error: AxiosError) => {
        showToast(
            "Ha ocurrido un error al registrar el gasto. Por favor, intente de nuevo",
            "error"
        );
    };

    const mutation = useCreateExpenseService({ onSuccess, onError, groupId });

    const handleSubmit = (expense: ExpenseForm) => {
        mutation.mutate(mapFormToModel(expense));
    };

    return {
        handleSubmit,
        isPending: mutation.isPending,
    };
};
