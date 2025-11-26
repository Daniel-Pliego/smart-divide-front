import { useGetExpenseDetailsService } from "../services/useGetExpenseDetailsService";

export const useGetExpenseDetail = (groupId: string, expenseId: string) => {
    const { data, isLoading, error, isError } = useGetExpenseDetailsService(
        groupId,
        expenseId,
    );

    return {
        expenseDetail: data,
        isLoading,
        error: error ? (error as any)?.message : null,
        isError,
    };
};
