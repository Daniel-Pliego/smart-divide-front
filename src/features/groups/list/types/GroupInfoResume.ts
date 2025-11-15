import { GroupIconType } from "@/features/groups/config";

export type GroupInfoResume = {
    id: string;
    name: string;
    type: keyof GroupIconType;
    totalDebts: number;
    totalCredits: number;
};