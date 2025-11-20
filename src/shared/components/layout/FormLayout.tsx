import { Box } from "@/lib/gluestack-ui/ui/box";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const FormLayout = ({
    children,
    boxClassName,
}: {
    children: React.ReactNode;
    boxClassName?: string;
}) => {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
            }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={Platform.OS === "ios" ? 50 : 210}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Box className={`px-5 ${boxClassName || ""}`}>{children}</Box>
        </KeyboardAwareScrollView>
    );
};
