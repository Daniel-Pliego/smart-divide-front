import {
    AddressCollectionMode,
    ClientSecretProvider,
    CustomerSessionClientSecret,
    CustomerSheet,
} from "@stripe/stripe-react-native";
import { useGetCustomerSessionService } from "../services/useGetCustomerSessionService";
import { useGetSetUpIntentService } from "../services/useGetSetUpIntentService";

export default function useCreateCustomerSheet() {
    const {
        data: customerSession,
        error: customerSessionError,
        isLoading: customerSessionIsLoading,
    } = useGetCustomerSessionService();
    const {
        data: setupIntent,
        error: setupIntentError,
        isLoading: setupIntentIsLoading,
    } = useGetSetUpIntentService();

    const clientSecretProvider: ClientSecretProvider = {
        async provideCustomerSessionClientSecret(): Promise<CustomerSessionClientSecret> {
            return {
                customerId: customerSession?.customerId!,
                clientSecret: customerSession?.customerSessionClientSecret!,
            };
        },

        async provideSetupIntentClientSecret(): Promise<string> {
            const result = setupIntent?.setupIntent;
            return result!;
        },
    };

    const initializeCustomerSheet = async () => {
        await CustomerSheet.initialize({
            intentConfiguration: {
                paymentMethodTypes: ["card"],
            },
            clientSecretProvider: clientSecretProvider,
            headerTextForSelectionScreen: "Gestiona tus métodos de pago",
            billingDetailsCollectionConfiguration: {
                address: AddressCollectionMode.NEVER,
            },
        });
    };

    const showCustomerSheet = async () => {
        await CustomerSheet.present();
    };

    const handleShowCustomerSheet = async () => {
        await initializeCustomerSheet();
        await showCustomerSheet();
    };

    return {
        handleShowCustomerSheet,
    };
}
