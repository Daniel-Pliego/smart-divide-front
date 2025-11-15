import { GroupIconType } from "../../config";
import { ExpenseRecord } from "./ExpenseRecord";
import { PaymentRecord } from "./PaymentRecord";

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
