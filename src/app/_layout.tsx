import { Stack } from "expo-router";

import { GluestackUIProvider } from "@gluestack/gluestack-ui-provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <GluestackUIProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "#fff" },
                    }}
                />
            </GluestackUIProvider>
        </SafeAreaProvider>
    );
}
