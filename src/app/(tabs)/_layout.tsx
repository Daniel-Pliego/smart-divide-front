import { HeaderStatusBar } from "@/shared/components";
import { Tabs } from "expo-router";
import { CircleUserRound, ContactRound, UsersRound } from "lucide-react-native";
import { Platform, StyleSheet, Text } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#d8b4fe",
                tabBarItemStyle: {
                    paddingVertical: 5,
                },
            }}
        >
            <Tabs.Screen
                name="group/index"
                options={{
                    title: "Grupos",
                    tabBarIcon: ({ color }) => <UsersRound color={color} size={24} />,
                    headerShown: true,
                    header: () => (
                        <HeaderStatusBar bgColor="#7e22ce" statusBarStyle="light-content" />
                    ),
                }}
            />
            <Tabs.Screen
                name="friends/index"
                options={{
                    title: "Amigos",
                    tabBarIcon: ({ color }) => <ContactRound color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="account/index"
                options={{
                    title: "Cuenta",
                    tabBarIcon: ({ color }) => <CircleUserRound color={color} size={24} />,
                    header: () => <Text>Hola mundo</Text>,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 15 : 15,
        backgroundColor: "#7e22ce",
        borderRadius: 40,
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        marginHorizontal: 30,
        marginBottom: 10,
        height: 65,
    },
});
