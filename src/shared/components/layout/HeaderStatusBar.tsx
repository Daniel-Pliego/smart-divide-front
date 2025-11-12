import { Box } from "@/lib/gluestack-ui/ui/box";
import { StatusBar, type StatusBarStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderStatusBarProps {
    bgColor: string;
    statusBarStyle: StatusBarStyle;
}

export const HeaderStatusBar = ({ bgColor, statusBarStyle }: HeaderStatusBarProps) => {
    const insteads = useSafeAreaInsets();

    return (
        <>
            <StatusBar barStyle={statusBarStyle} />
            <Box style={{ height: insteads.top, backgroundColor: bgColor }} />
        </>
    );
};
