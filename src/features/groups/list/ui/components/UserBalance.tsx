import { Box } from "@/lib/gluestack-ui/ui/box";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { toMoney } from "@/shared/utils";
import { HStack } from "@gluestack/hstack";
import { Text } from "react-native";

interface UserBalanceProps {
    totalCredits: number;
    totalDebts: number;
}

export const UserBalance = ({ totalCredits, totalDebts }: UserBalanceProps) => {
    const totalBalance = totalCredits - totalDebts;
    return (
        <HStack className="mt-7 bg-white rounded-xl p-5 items-center justify-between">
            {totalBalance > 0 && (
                <>
                    <Box>
                        <Text className="font-medium text-slate-900">Tu balance general</Text>
                        <Text className="text-4xl text-purple-700">
                            {toMoney(totalBalance)}
                        </Text>
                    </Box>
                    <VStack>
                        <Text className="text-green-700 font-semibold text-right">
                            +{toMoney(totalCredits)}
                        </Text>
                        <Text className="text-orange-700 font-semibold text-right">
                            -{toMoney(totalDebts)}
                        </Text>
                    </VStack>
                </>
            )}

            {totalBalance <= 0 && (
                <>
                    <Text className="font-medium text-slate-900">Sin saldos pendientes</Text>
                </>
            )}
        </HStack>
    );
};
