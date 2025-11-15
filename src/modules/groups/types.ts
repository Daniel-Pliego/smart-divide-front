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

export type PaymentRecord = {
    id: number;
    fromUser: {
        name: string;
        lastName: string;
    };
    toUser: {
        name: string;
        lastName: string;
    };
    amount: number;
    createdAt: string;
};

export type ExpenseRecord = {
    id: number;
    type: string;
    description: string;
    amount: number;
    createdAt: string;
    payers: {
        id: number;
        userId: string;
        name: string;
        lastName: string;
        amountPaid: number;
    }[];
    userBalance: number;
};

export type GroupDetails = {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    type: keyof GroupIconType;

    userBalance: {
        id: number;
        userId: string;
        name: string;
        balance: number;
    }[];

    payments: PaymentRecord[];

    expenses: ExpenseRecord[];
};

export type GroupFormData = z.infer<typeof GroupFormDataSchema>;
