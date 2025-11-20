import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@gluestack/hstack";
import { Icon } from "@gluestack/icon";
import { Toast, ToastDescription, ToastTitle, useToast } from "@gluestack/toast";
import { AlertCircle, CheckCircle2, Info } from "lucide-react-native";

type ToastType = "success" | "error" | "info" | "warning";

const BG_COLORS: Record<ToastType, string> = {
    success: "border-green-500",
    error: "border-red-500",
    info: "border-blue-500",
    warning: "border-orange-500",
};

const ICONS: Record<ToastType, React.ReactElement> = {
    success: <Icon as={CheckCircle2} className="text-green-500 w-5 h-5" />,
    error: <Icon as={AlertCircle} className="text-red-500 w-5 h-5" />,
    info: <Icon as={Info} className="text-blue-500 w-5 h-5" />,
    warning: <Icon as={Info} className="text-orange-500 w-5 h-5" />,
};

export const useAppToast = () => {
    const toast = useToast();

    const showToast = (message: string, type: ToastType = "success", title?: string) => {
        return toast.show({
            placement: "top",
            duration: 3000,
            render: ({ id }) => (
                <Toast
                    nativeID={`toast-${id}`}
                    action={type}
                    variant="solid"
                    className={`rounded-2xl shadow-lg px-4 py-3 w-11/12 bg-white border ${BG_COLORS[type]}`}
                >
                    <HStack className="items-center gap-2">
                        {ICONS[type]}
                        <Box className="flex-1">
                            {title && <ToastTitle className="text-slate-900">{title}</ToastTitle>}
                            <ToastDescription
                                className={`${
                                    title ? "text-slate-700" : "text-slate-900 font-medium"
                                }`}
                            >
                                {message}
                            </ToastDescription>
                        </Box>
                    </HStack>
                </Toast>
            ),
        });
    };

    return { showToast };
};
