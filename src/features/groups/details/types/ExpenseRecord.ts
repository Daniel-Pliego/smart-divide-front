export type ExpenseRecord = {
    id: number;
    type: string;
    description: string;
    amount: number;
    createdAt: string;
    payers: {
        userId: string;
        name: string;
        lastName: string;
        amountPaid: number;
    }[];
    userBalance: number;
};
