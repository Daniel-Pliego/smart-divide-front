import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { HeaderStatusBar } from "@/shared/components";
import { Stack } from "expo-router";
import { Bolt } from "lucide-react-native";

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
             <Stack.Screen
                name="[groupId]"
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "#7e22ce",
                    },
                    headerShadowVisible: false,
                    headerRight: () => <Icon as={Bolt} className="w-7 h-7 text-white" />,
                    headerTintColor: "#fff",
                }}
            />
        </Stack>
    );
}
