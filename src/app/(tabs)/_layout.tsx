import { Tabs } from "expo-router";
import { CircleUserRound, ContactRound, UsersRound } from "lucide-react-native";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#7e22ce",
                tabBarInactiveTintColor: "#6b7280",
                tabBarItemStyle: {
                    paddingVertical: 5,
                },
            }}
        >
            <Tabs.Screen
                name="(group)"
                options={{
                    title: "Grupos",
                    tabBarIcon: ({ color }) => <UsersRound color={color} size={24} />,
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
                name="account"
                options={{
                    headerShown: true,
                    title: "Perfil",
                    headerShadowVisible: false,
                    tabBarIcon: ({ color }) => <CircleUserRound color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        height: 65,
    },
});
