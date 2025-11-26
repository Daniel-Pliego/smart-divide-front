import { storageRepository } from "@/shared/services/uploadService";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useCallback } from "react";
import { useDeteleExpenseService } from "../services/useDeteleExpenseService";

interface useDeleteExpenseProps {
    showToast: (message: string, type: "success" | "error") => void;
    groupId: string;
    expenseEvidenceUrl?: string;
    expenseId?: string;
}

export const useDeleteExpense = ({
    showToast,
    groupId,
    expenseEvidenceUrl,
    expenseId,
}: useDeleteExpenseProps) => {

    const onSuccess = useCallback(async () => {
        showToast("¡Gasto eliminado con exito!", "success");

        if (expenseEvidenceUrl) {
            await storageRepository.deleteFile(expenseEvidenceUrl);
        }

        setTimeout(() => {
            router.back();
        }, 500);
    }, [expenseEvidenceUrl]);

    const onError = useCallback(
        (_error: AxiosError) => {
            showToast(
                "Ha ocurrido un error al eliminar el gasto. Por favor, intente de nuevo",
                "error"
            );
        },
        [showToast]
    );
    const mutation = useDeteleExpenseService({
        groupId,
        onSuccess,
        onError,
    });

    const handleDelete = () => {
        mutation.mutate(expenseId ?? "");
    };

    return {
        isDeleting: mutation.isPending,
        handleDelete,
    };
};
