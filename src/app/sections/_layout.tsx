import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                statusBarStyle: "dark",
                contentStyle: { backgroundColor: "#fff" },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="group/create"
                options={{
                    headerTitleAlign: "center",
                    title: "¡Crea tu grupo!",
                }}
            />
        </Stack>
    );
}
