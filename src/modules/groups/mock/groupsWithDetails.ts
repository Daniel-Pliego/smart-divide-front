export const GROUP_DETAILS = {
    id: "groupId_001",
    name: "Viaje a cancun",
    description: "Viaje a cancun de 3 días y 2 noches por graduación",
    ownerId: "userId_001",
    type: "other",

    userBalance: [
        {
            id: 1,
            userId: "userId_001",
            name: "Juan",
            balance: 300,
        },
        {
            id: 2,
            userId: "userId_002",
            name: "Pedro",
            balance: -200,
        },
    ],

    payments: [
        {
            id: 1,
            fromUser: {
                name: "Juan",
                lastName: "Perez",
            },
            toUser: {
                name: "Pedro",
                lastName: "Perez",
            },
            amount: 2000,
            createdAt: "2025-03-16",
        },
    ],

    expenses: [
        {
            id: 1,
            type: "food",
            description: "Hamburguesas en Angry Angus",
            amount: 3000,
            createdAt: "2025-03-16",
            payers: [
                {
                    id: 1,
                    userId: "userId_002",
                    name: "Juan",
                    lastName: "Perez",
                    amountPaid: 2000,
                },
                {
                    id: 2,
                    userId: "userId_003",
                    name: "Pedro",
                    lastName: "Perez",
                    amountPaid: 1000,
                },
            ],
            userBalance: -200,
        },
        {
            id: 2,
            type: "food",
            description: "Hamburguesas en Angry Angus",
            amount: 3000,
            createdAt: "2025-03-16",
            payers: [
                {
                    id: 1,
                    userId: "userId_002",
                    name: "Juan",
                    lastName: "Perez",
                    amountPaid: 2000,
                },
                {
                    id: 2,
                    userId: "userId_003",
                    name: "Pedro",
                    lastName: "Perez",
                    amountPaid: 1000,
                },
            ],
            userBalance: -200,
        },
        {
            id: 3,
            type: "fitness",
            description: "Proteína en Angry Angus",
            amount: 3000,
            createdAt: "2025-03-17",
            payers: [
                {
                    id: 1,
                    userId: "userId_002",
                    name: "Juan",
                    lastName: "Perez",
                    amountPaid: 2000,
                },
                {
                    id: 2,
                    userId: "userId_003",
                    name: "Pedro",
                    lastName: "Perez",
                    amountPaid: 1000,
                },
            ],
            userBalance: -200,
        },
        {
            id: 4,
            type: "fitness",
            description: "Proteína en Angry Angus",
            amount: 3000,
            createdAt: "2025-03-17",
            payers: [
                {
                    id: 1,
                    userId: "userId_002",
                    name: "Juan",
                    lastName: "Perez",
                    amountPaid: 2000,
                },
                {
                    id: 2,
                    userId: "userId_003",
                    name: "Pedro",
                    lastName: "Perez",
                    amountPaid: 1000,
                },
            ],
            userBalance: -200,
        },
        {
            id: 5,
            type: "fitness",
            description: "Proteína en Angry Angus",
            amount: 3000,
            createdAt: "2025-03-17",
            payers: [
                {
                    id: 1,
                    userId: "userId_002",
                    name: "Juan",
                    lastName: "Perez",
                    amountPaid: 2000,
                },
                {
                    id: 2,
                    userId: "userId_003",
                    name: "Pedro",
                    lastName: "Perez",
                    amountPaid: 1000,
                },
            ],
            userBalance: -200,
        },
    ],
};
