import { Box } from "@/lib/gluestack-ui/ui/box";
import { ScrollView } from "react-native";

interface ScreenLayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export const ScreenLayout = ({ children, header }: ScreenLayoutProps) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box>
                {header || null}
                <Box className="mx-5 mb-10">{children}</Box>
            </Box>
        </ScrollView>
    );
};
