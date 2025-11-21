import { Box } from "@/lib/gluestack-ui/ui/box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const FormLayout = ({
    children,
    boxClassName,
    extraScrollHeight = 0
}: {
    children: React.ReactNode;
    boxClassName?: string;
    extraScrollHeight?: number;
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
            extraScrollHeight={extraScrollHeight}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Box className={`px-5 ${boxClassName || ""}`}>{children}</Box>
        </KeyboardAwareScrollView>
    );
};
