import { useAppToast } from "@/shared/hooks";
import { AddressCollectionMode, useStripe } from "@stripe/stripe-react-native";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useGetPaymentSheetsParamsService } from "../service/useGetPaymentSheetParams";
import { PaymentSheetParams } from "../types/PaymentSheetParams";

const messagesForStatus: Record<number, string> = {
    404: "No es posible realizar pagos con tarjeta a este usuario",
};

export const useCreatePaymentSheet = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useGetPaymentSheetsParamsService();
    const { showToast } = useAppToast();
    const router = useRouter();

    const invalidatePaymentQueries = (groupId: string) => {
        queryClient.invalidateQueries({ queryKey: ["group-detail", groupId] });
        queryClient.invalidateQueries({ queryKey: ["group-list"] });
    };

    const navigateBackAfterPayment = () => {
        setTimeout(() => {
            router.back();
            router.back();
        }, 500);
    };

    const initializePaymentSheet = async (paymentParams: PaymentSheetParams) => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Smart Divide",
            customerId: paymentParams.customerId,
            customerSessionClientSecret: paymentParams.customerSessionClientSecret,
            paymentIntentClientSecret: paymentParams.paymentIntentClientSecret,
            allowsDelayedPaymentMethods: false,
            customFlow: false,
            billingDetailsCollectionConfiguration: {
                address: AddressCollectionMode.NEVER,
            },
        });

        if (error) {
            showToast(
                "Oops! Ha ocurrido un error al inicializar el pago. Por favor intente de nuevo.",
                "error"
            );
            return false;
        }

        return true;
    };

    const openPaymentSheet = async (groupId: string) => {
        const { error } = await presentPaymentSheet();

        if (error) {
            if (error.code !== "Canceled") {
                showToast(
                    "Ha ocurrido un error al registrar el gasto. Por favor, intente de nuevo.",
                    "error"
                );
            }
            return;
        }

        invalidatePaymentQueries(groupId);
        showToast("¡El pago ha sido registrado!", "success");
        navigateBackAfterPayment();
    };

    const handlePayment = ({
        groupId,
        fromUser,
        toUser,
        amount,
    }: {
        groupId: string;
        fromUser: string;
        toUser: string;
        amount: number;
    }) => {
        if (amount <= 10) {
            showToast("El pago con tarjeta solo permite montos superiores a $10.00", "error");
            return;
        }

        mutate(
            { groupId, fromUser, toUser, amount },
            {
                onSuccess: async (paymentParams) => {
                    const ok = await initializePaymentSheet(paymentParams);
                    if (ok) openPaymentSheet(groupId);
                },
                onError: (error: Error) => {
                    const axiosError = error as AxiosError;
                    const status = axiosError?.response?.status;

                    const errorMessage =
                        messagesForStatus[status || 0] ??
                        "No se pudo iniciar el proceso de pago. Por favor intente de nuevo.";
                    showToast(errorMessage, "error");
                },
            }
        );
    };

    return { handlePayment, isPending };
};
