import * as z from "zod";
import { GroupFormDataSchema } from "./schemas";
export type GroupListItem = {
    id: string;
    name: string;
    type: string;
    totalDebts: number;
    totalCredits: number;
};

export type GroupFormData = z.infer<typeof GroupFormDataSchema>;
