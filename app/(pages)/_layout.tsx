import { MobileBottomTabs } from "@/components/layout";
import { Stack } from "expo-router";
import { CircleUserRound, Contact, UsersRound } from "lucide-react-native";

const PAGE_OPTIONS = [
    {
        label: "Grupos",
        redirectTo: "group",
        icon: UsersRound,
    },
    {
        label: "Amigos",
        redirectTo: "friend",
        icon: Contact,
    },
    {
        label: "Perfil",
        redirectTo: "user",
        icon: CircleUserRound,
    },
];

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            <MobileBottomTabs tabItems={PAGE_OPTIONS} initialRoute={PAGE_OPTIONS[0].redirectTo} />
        </>
    );
}
