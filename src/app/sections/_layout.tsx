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
            <Stack.Screen
                name="group/[groupId]/create-expense"
                options={{
                    headerTitleAlign: "center",
                    headerTitle: "Registrar gasto",
                }}
            />
        </Stack>
    );
}
