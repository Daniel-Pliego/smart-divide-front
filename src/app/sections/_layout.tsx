import { CloseIcon, Icon } from "@/lib/gluestack-ui/ui/icon";
import { NavigationButton } from "@/shared/components";
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
            <Stack.Screen
                name="group/[groupId]/payment/index"
                options={{
                    headerTitle: "Selecciona un prestamo",
                    headerLeft: () => {
                        return <NavigationButton>
                            <Icon as={CloseIcon} className="w-6 h-6 mr-5" />
                        </NavigationButton>
                    }
                }}
            />
            <Stack.Screen
                name="group/[groupId]/member/add"
                options={{
                    headerTitle: "Agrega un nuevo miembro",
                    headerLeft: () => {
                        return <NavigationButton>
                            <Icon as={CloseIcon} className="w-6 h-6 mr-5" />
                        </NavigationButton>
                    }
                }}
            />
            <Stack.Screen
                name="group/[groupId]/payment/create"
                options={{
                    headerTitle: "Realiza tu pago",
                    gestureDirection: "vertical",
                    animation: "slide_from_bottom",
                }}
            />
            <Stack.Screen
                name="group/[groupId]/index"
                options={{
                    headerTitle: "Información del grupo",
                }}
            />
        </Stack>
    );
}
