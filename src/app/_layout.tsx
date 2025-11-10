import { Stack } from "expo-router";

import { GluestackUIProvider } from "@gluestack/gluestack-ui-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom", "left", "right"]}>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </GluestackUIProvider>
    );
}
