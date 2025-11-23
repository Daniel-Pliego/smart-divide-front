import { storageRepository } from "@/shared/services/uploadService";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useCreateExpenseService } from "../services";
import { ExpenseForm } from "../types";
import { mapFormToModel } from "../utils/mapFormToModel";

interface UseCreateExpenseProps {
    showToast: (message: string, type: "success" | "error") => void;
    groupId: string;
}

export const useCreateExpense = ({ showToast, groupId }: UseCreateExpenseProps) => {
    const [tempEvidencePath, setTempEvidencePath] = useState("");

    const onSuccess = useCallback(async () => {
        showToast("¡Gasto creado exitosamente!", "success");

        if (tempEvidencePath) {
            await storageRepository.confirmUpload(tempEvidencePath);
            setTempEvidencePath("");
        }

        setTimeout(() => {
            router.replace(`/(tabs)/(group)/${groupId}`);
        }, 500);
    }, [tempEvidencePath, showToast, groupId]);

    const onError = useCallback(async (_error: AxiosError) => {
        showToast(
            "Ha ocurrido un error al registrar el gasto. Por favor, intente de nuevo",
            "error"
        );
    }, [showToast]);

    const mutation = useCreateExpenseService({ onSuccess, onError, groupId });

    const uploadEvidenceIfNeeded = async (form: ExpenseForm) => {
        const evidence = form.evidence;

        if (!evidence?.uri || !evidence?.fileName || !evidence?.mimeType) {
            return { finalPath: "", tempPath: "" };
        }

        const { path: tempPath, finalPath } = await storageRepository.uploadFile(
            evidence.uri,
            evidence.fileName,
            evidence.mimeType
        );

        setTempEvidencePath(tempPath);
        return { finalPath, tempPath };
    };

    const handleSubmit = async (formValues: ExpenseForm) => {
        let tempPath = "";

        try {
            const { finalPath, tempPath: uploadedTemp } =
                await uploadEvidenceIfNeeded(formValues);

            tempPath = uploadedTemp;

            const expenseToSave = mapFormToModel(formValues);

            mutation.mutate({
                ...expenseToSave,
                evidenceUrl: finalPath ?? "",
            });
        } catch (error) {
            showToast("Error al procesar el gasto.", "error");

            if (tempPath) {
                await storageRepository.discardFile(tempPath);
                setTempEvidencePath("");
            }
        }
    };

    return {
        handleSubmit,
        isPending: mutation.isPending,
    };
};
