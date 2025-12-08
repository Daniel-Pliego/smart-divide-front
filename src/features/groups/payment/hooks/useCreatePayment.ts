import { useAppToast } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreatePaymentService } from "../service/useCreatePaymentService";
import { CreatePaymentForm, createPaymentSchema } from "../types";
import { UserBalance } from "../types/UserBalance";


export default function useCreatePayment() {
    const { groupId, creditorId, debtorId, amount, creditorName, creditorPhoto, debtorName, debtorPhoto } = useLocalSearchParams();
    const { showToast } = useAppToast();
    const router = useRouter();

    const debt: UserBalance | null = (creditorId && debtorId) ? {
        creditor: {
            userId: creditorId as string,
            name: creditorName as string,
            photoUrl: creditorPhoto as string,
            lastName: ''
        },
        debtor: {
            userId: debtorId as string,
            name: debtorName as string,
            photoUrl: debtorPhoto as string,
            lastName: ''
        },
        amount: Number(amount)
    } : null;

    const {
        control,
        handleSubmit,
        formState,
        reset,
    } = useForm<CreatePaymentForm>({
        resolver: zodResolver(createPaymentSchema(debt?.amount ?? 0)),
        defaultValues: {
            creditorId: creditorId as string || "",
            debtorId: debtorId as string || "",
            amount: amount as string || "0",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (debt) {
            reset({
                creditorId: debt.creditor.userId,
                debtorId: debt.debtor.userId,
                amount: String(debt.amount),
            });
        }
    }, [creditorId, debtorId, amount, reset]);

        const onSuccess = () => {
            showToast("¡El pago ha sido registrado!", "success")
    
            setTimeout(() => {
                router.back(); 
                router.back(); 
            }, 500);
        };
    
        const onError = (_error: AxiosError) => {
            showToast(
                "Ha ocurrido un error al registrar el gasto. Por favor, intente de nuevo",
                "error"
            );

        };

        const createPayment = useCreatePaymentService({
            groupId: groupId as string,
            onSuccess,
            onError,
        });

    const onSubmit = (data: CreatePaymentForm) => {

        const payment = {
            fromUserId: data.debtorId, 
            toUserId: data.creditorId,
            amount: Number(data.amount)
        }
        createPayment.mutate(payment);
    };

    return {
        debtToPay: debt,
        control,
        handleSubmit,
        onSubmit,
        formState,
        groupId: groupId as string,
    };
}
