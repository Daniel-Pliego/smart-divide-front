import {
    Briefcase,
    Bus,
    Car,
    Dumbbell,
    Gift,
    HeartPulse,
    Home,
    PartyPopper,
    PiggyBank,
    Shirt,
    ShoppingBag,
    Sparkles,
    Tv,
    Utensils,
    Wallet
} from "lucide-react-native";

export const ICON_BY_EXPENSE_TYPE = {
    food: {
        icon: Utensils,
        color: "bg-orange-500/70",
    },
    groceries: {
        icon: ShoppingBag,
        color: "bg-green-500/70",
    },
    rent: {
        icon: Home,
        color: "bg-amber-600/70",
    },
    transportation: {
        icon: Bus,
        color: "bg-sky-600/70",
    },
    car: {
        icon: Car,
        color: "bg-indigo-600/70",
    },
    entertainment: {
        icon: PartyPopper,
        color: "bg-purple-500/70",
    },
    health: {
        icon: HeartPulse,
        color: "bg-red-500/70",
    },
    gifts: {
        icon: Gift,
        color: "bg-pink-500/70",
    },
    subscriptions: {
        icon: Tv,
        color: "bg-blue-500/70",
    },
    savings: {
        icon: PiggyBank,
        color: "bg-lime-600/70",
    },
    clothing: {
        icon: Shirt,
        color: "bg-rose-600/70",
    },
    work: {
        icon: Briefcase,
        color: "bg-indigo-500/70",
    },
    personalCare: {
        icon: Sparkles,
        color: "bg-fuchsia-500/70",
    },
    fitness: {
        icon: Dumbbell,
        color: "bg-emerald-600/70",
    },
    other: {
        icon: Wallet,
        color: "bg-neutral-500/70",
    },
} as const;

export type ExpenseIconKeyType = keyof typeof ICON_BY_EXPENSE_TYPE;

export interface ExpenseType {
    label: string;
    value: ExpenseIconKeyType;
}

export const EXPENSE_TYPES: ExpenseType[] = [
    { label: "Comida", value: "food" },
    { label: "Supermercado", value: "groceries" },
    { label: "Renta / Hogar", value: "rent" },
    { label: "Transporte", value: "transportation" },
    { label: "Carro", value: "car" },
    { label: "Entretenimiento", value: "entertainment" },
    { label: "Salud", value: "health" },
    { label: "Regalos", value: "gifts" },
    { label: "Suscripciones", value: "subscriptions" },
    { label: "Ahorro", value: "savings" },
    { label: "Ropa", value: "clothing" },
    { label: "Trabajo", value: "work" },
    { label: "Cuidado personal", value: "personalCare" },
    { label: "Fitness", value: "fitness" },
    { label: "Otro", value: "other" },
] as const;
