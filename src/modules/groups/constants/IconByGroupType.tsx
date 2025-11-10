import {
    Briefcase,
    Heart,
    Home,
    LucideIcon,
    PartyPopper,
    Plane,
    School,
    ShoppingBag,
    Users,
    Utensils,
    Wallet,
} from "lucide-react-native";

interface GroupIconType {
    [key: string]: LucideIcon;
}

interface GroupType {
    label: string;
    value: keyof GroupIconType;
}

export const ICON_BY_GROUP_TYPE: GroupIconType = {
    trip: Plane,
    household: Home,
    friends: Users,
    shopping: ShoppingBag,
    food: Utensils,
    work: Briefcase,
    couple: Heart,
    party: PartyPopper,
    study: School,
    other: Wallet,
};

export const GROUP_TYPES: GroupType[] = [
    { label: "Viaje", value: "trip" },
    { label: "Hogar", value: "household" },
    { label: "Amigos", value: "friends" },
    { label: "Compras", value: "shopping" },
    { label: "Comida", value: "food" },
    { label: "Trabajo", value: "work" },
    { label: "Pareja", value: "couple" },
    { label: "Fiesta", value: "party" },
    { label: "Estudio", value: "study" },
    { label: "Otro", value: "other" },
] as const;
