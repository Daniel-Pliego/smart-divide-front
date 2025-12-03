import { useGetDebtsService } from "../service";

export default function useGetDebts(groupId: string) {
    const { data, error, isLoading } = useGetDebtsService(groupId);

    return {
        debts: data?.balances ?? [],
        error,
        isLoading,
    };
}
