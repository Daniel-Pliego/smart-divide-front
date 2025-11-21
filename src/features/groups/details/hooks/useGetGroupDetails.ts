import { formatDate, groupBy } from "@/shared/utils";
import { useGetGroupDetailsService } from "../services";

export const useGetGroupDetails = (groupId: string) => {
    const { data, isLoading, isError } = useGetGroupDetailsService({
        groupId: groupId,
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
        totalBalance,
        userBalance,
        history: historyGroupedByDate,
        hasTransactions: history.length > 0,
        isLoading,
        isError,
    };
};
