import * as z from "zod";
import { GroupIconType } from "./constants";
import { GroupFormDataSchema } from "./schemas";

export type GroupListItem = {
    id: string;
    name: string;
    type: keyof GroupIconType;
    totalDebts: number;
    totalCredits: number;
};

export type GroupFormData = z.infer<typeof GroupFormDataSchema>;
