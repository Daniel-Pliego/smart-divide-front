import { QueryClient } from "@tanstack/react-query";

export interface NotificationData {
    type: string;
    groupId?: string;
    expenseId?: string;
    paymentId?: string;
    actorId?: string;
    [key: string]: any;
}

type NotificationHandler = (queryClient: QueryClient, data: NotificationData) => void;

const handleExpenseUpdate: NotificationHandler = (queryClient, data) => {
    if (data.groupId) {
        queryClient.invalidateQueries({ queryKey: ["group-detail", data.groupId] });
        queryClient.invalidateQueries({ queryKey: ["debts", data.groupId] });
    }
    queryClient.invalidateQueries({ queryKey: ["group-list"] });
};

const handleMemberAdded: NotificationHandler = (queryClient, data) => {
    if (data.groupId) {
        queryClient.invalidateQueries({ queryKey: ["group-detail", data.groupId] });
        queryClient.invalidateQueries({ queryKey: ["group-members", data.groupId] });
    }
    queryClient.invalidateQueries({ queryKey: ["group-list"] });
};

const handlePaymentReceived: NotificationHandler = (queryClient, data) => {
    if (data.groupId) {
        queryClient.invalidateQueries({ queryKey: ["group-detail", data.groupId] });
        queryClient.invalidateQueries({ queryKey: ["debts", data.groupId] });
    }
    queryClient.invalidateQueries({ queryKey: ["group-list"] });
};

const handleFriendshipRequest: NotificationHandler = (queryClient, data) => {
    // queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
};

export const notificationHandlers: Record<string, NotificationHandler> = {
    EXPENSE_CREATED: handleExpenseUpdate,
    EXPENSE_DELETED: handleExpenseUpdate,
    MEMBER_ADDED: handleMemberAdded,
    PAYMENT_RECEIVED: handlePaymentReceived,
    FRIENDSHIP_REQUEST: handleFriendshipRequest,
};

export const processNotification = (queryClient: QueryClient, data: NotificationData) => {
    const handler = notificationHandlers[data.type];
    if (handler) {
        handler(queryClient, data);
    }
};
