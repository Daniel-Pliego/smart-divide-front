import { HeaderStatusBar } from "@/shared/components";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                contentStyle: {
                    backgroundColor: "#fff",
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    header: () => (
                        <HeaderStatusBar bgColor="#7e22ce" statusBarStyle="light-content" />
                    ),
                }}
            />
        </Stack>
    );
}
