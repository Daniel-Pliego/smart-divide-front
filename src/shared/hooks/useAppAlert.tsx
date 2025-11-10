import { HStack } from "@gluestack/hstack";
import { Icon } from "@gluestack/icon";
import { Toast, ToastDescription, useToast } from "@gluestack/toast";
import { AlertCircle, CheckCircle2 } from "lucide-react-native";

type ToastType = "success" | "error";

export const useAppToast = () => {
    const toast = useToast();

    const showToast = (message: string, type: ToastType = "success") => {
        return toast.show({
            placement: "top",
            duration: 3000,
            render: ({ id }) => (
                <Toast
                    nativeID={`toast-${id}`}
                    action={type}
                    variant="solid"
                    className="rounded-2xl shadow-lg px-4 py-3"
                    style={{
                        backgroundColor:
                            type === "success" ? "rgb(34 197 94)" : "rgb(239 68 68)",
                    }}
                >
                    <HStack className="items-center gap-2">
                        <Icon
                            as={type === "success" ? CheckCircle2 : AlertCircle}
                            className="text-white w-5 h-5"
                        />
                        <ToastDescription className="text-white">{message}</ToastDescription>
                    </HStack>
                </Toast>
            ),
        });
    };

    return { showToast };
};
