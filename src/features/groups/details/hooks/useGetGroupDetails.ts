import { formatDate, groupBy } from "@/shared/utils";
import { useGetGroupDetailsService } from "../services";

export const useGetGroupDetails = (groupId: string) => {
    const { userBalance, payments, expenses, ...data } = useGetGroupDetailsService({
        userId: "",
        groupId: groupId,
    });

    const totalBalance = userBalance.reduce((acc, curr) => acc + curr.balance, 0);

    const history = [...payments, ...expenses].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const historyGroupedByDate = groupBy(history, (item) => formatDate(item.createdAt));

    return {
        groupDetail: data,
        totalBalance,
        userBalance,
        history: historyGroupedByDate,
    };
};
