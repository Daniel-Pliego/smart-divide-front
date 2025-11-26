export type ParticipantInfo = {
    userId: string;
    name: string;
    lastName: string;
    photoUrl: string;
};

export type Payer = {
    participant: ParticipantInfo;
    amountPaid: number;
    amountBorrowed: number
};

export type Debtor = {
    debtor: ParticipantInfo;
    amount: number;
};

export type Balance = {
    payer: Payer
    debtors: Debtor[];
};

export type ExpenseDetails = {
    id: string;
    type: string;
    description: string;
    amount: number;
    createdAt: string;
    evidenceUrl: string;
    balances: Balance[];
};
