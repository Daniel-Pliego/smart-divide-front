import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom", "left", "right"]}>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </GluestackUIProvider>
    );
}
