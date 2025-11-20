import { AuthValidator } from "@/features/auth/utils/AuthValidator";
import { GluestackUIProvider } from "@gluestack/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <GluestackUIProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthValidator />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: "#fff" },
                        }}
                    />
                </QueryClientProvider>
            </GluestackUIProvider>
        </SafeAreaProvider>
    );
}
