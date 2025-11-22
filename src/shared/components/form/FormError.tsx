import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { AlertCircleIcon } from "lucide-react-native";
import { Text } from "react-native";

export const FormError = ({ show, message }: { show: boolean; message?: string }) => {
    if (!show || !message) return null;

    return (
        <HStack className="items-start mt-2">
            <Icon as={AlertCircleIcon} className="text-red-700 w-4 h-4 mr-2" />

            <Box className="flex-shrink">
                <Text className="text-red-700 text-base leading-none">{message}</Text>
            </Box>
        </HStack>
    );
};
