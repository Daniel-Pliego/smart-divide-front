import { FilterOption } from "@/shared/components/Filters";

export type GroupFilterType = "all" | "totalDebts" | "totalCredits";

export const GROUPS_FILTER_OPTIONS: FilterOption<GroupFilterType>[] = [
    {
        label: "Todos",
        value: "all",
    },
    {
        label: "Por pagar",
        value: "totalDebts",
    },
    {
        label: "Por cobrar",
        value: "totalCredits",
    },
];
