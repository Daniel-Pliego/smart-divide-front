
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

