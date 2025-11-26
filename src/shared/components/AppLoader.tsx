import { Box } from "@/lib/gluestack-ui/ui/box";
import { Spinner } from "@gluestack/spinner";
import { Text } from "@gluestack/text";
import { VStack } from "@gluestack/vstack";

type LoaderSize = "small" | "large";

interface AppLoaderProps {
    isVisible: boolean;
    message?: string;
    size?: LoaderSize;
}

export const AppLoader = ({ isVisible, message, size = "large" }: AppLoaderProps) => {
    if (!isVisible) return null;

    return (
        <Box className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg z-[200]">
            <VStack className="items-center gap-3">
                <Spinner size={size} className="text-purple-700" />
                {message && (
                    <Text className="text-white text-center font-medium">
                        {message}
                    </Text>
                )}
            </VStack>
        </Box>
    );
};
