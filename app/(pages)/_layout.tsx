import { MobileBottomTabs } from "@/src/shared/layout";
import { Stack } from "expo-router";
import { CircleUserRound, Contact, UsersRound } from "lucide-react-native";

const PAGE_OPTIONS = [
    {
        label: "Grupos",
        redirectTo: "(pages)/group",
        icon: UsersRound,
    },
    {
        label: "Amigos",
        redirectTo: "(pages)/friend",
        icon: Contact,
    },
    {
        label: "Perfil",
        redirectTo: "(pages)/user",
        icon: CircleUserRound,
    },
];

export default function RootLayout() {
    return (
        <>
            <Stack
                screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#f2f2f2" } }}
            />
            <MobileBottomTabs tabItems={PAGE_OPTIONS} initialRoute={PAGE_OPTIONS[0].redirectTo} />
        </>
    );
}
