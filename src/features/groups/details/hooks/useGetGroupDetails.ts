import { getAuthStore } from "@/features/auth/utils";
import { formatDate, groupBy } from "@/shared/utils";
import { useEffect, useState } from "react";
import { useGetGroupDetailsService } from "../services";

export const useGetGroupDetails = (groupId: string) => {
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const authStore = async () => {
            const authStore = await getAuthStore();
            setUserId(authStore?.userId || "");
        };

        authStore();
    }, []);

    const { data } = useGetGroupDetailsService({
        groupId,
        userId,
    });

    const { userBalance, payments = [], expenses = [], ...groupInfo } = data || {};

    const totalBalance = userBalance?.reduce((acc, curr) => acc + curr.balance, 0);

    const history = [...payments, ...expenses].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const historyGroupedByDate = groupBy(history, (item) => formatDate(item.createdAt));

    return {
        groupDetail: {
            id: "",
            name: "",
            description: "",
            ownerId: "",
            type: "",
            ...groupInfo,
        },
        totalBalance: totalBalance || 0,
        userBalance,
        history: historyGroupedByDate,
        hasTransactions: history.length > 0,
        userId,
    };
};
