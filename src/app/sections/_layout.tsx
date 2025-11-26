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
                name="group/[groupId]/expense/index"
                options={{
                    headerTitleAlign: "center",
                    headerTitle: "Registrar gasto",
                }}
            />
            <Stack.Screen
                name="group/[groupId]/expense/[expenseId]"
                options={{
                    title: "",
                    statusBarStyle: "light",
                    headerStyle: {
                        backgroundColor: "#7e22ce",
                    },
                    headerShadowVisible: false,
                    headerTintColor: "#fff",
                }}
            />
        </Stack>
    );
}
