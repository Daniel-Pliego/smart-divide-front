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

export interface GroupIconType {
    [key: string]: {
        icon: LucideIcon;
        color: string;
    };
}
export interface GroupType {
    label: string;
    value: keyof GroupIconType;
}

export const ICON_BY_GROUP_TYPE = {
    trip: {
        icon: Plane,
        color: "bg-sky-500/70",
    },
    household: {
        icon: Home,
        color: "bg-amber-500/70",
    },
    friends: {
        icon: Users,
        color: "bg-pink-500/70",
    },
    shopping: {
        icon: ShoppingBag,
        color: "bg-emerald-500/70",
    },
    food: {
        icon: Utensils,
        color: "bg-orange-500/70",
    },
    work: {
        icon: Briefcase,
        color: "bg-indigo-500/70",
    },
    couple: {
        icon: Heart,
        color: "bg-rose-500/70",
    },
    party: {
        icon: PartyPopper,
        color: "bg-purple-500/70",
    },
    study: {
        icon: School,
        color: "bg-yellow-500/70",
    },
    other: {
        icon: Wallet,
        color: "bg-neutral-500/70",
    },
} as const;

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
    { label: "General", value: "other" },
] as const;
