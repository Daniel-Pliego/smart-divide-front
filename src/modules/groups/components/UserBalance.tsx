import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { toMoney } from "@/shared/utils";
import { Box } from "@gluestack/box";
import { HStack } from "@gluestack/hstack";
import { Text } from "react-native";

interface UserBalanceProps {
    totalCredits: number;
    totalDebts: number;
}

export const UserBalance = ({ totalCredits, totalDebts }: UserBalanceProps) => {
    return (
        <HStack className="mt-7 bg-white rounded-xl p-5 items-center justify-between">
            <Box>
                <Text className="font-medium text-slate-900">Tu balance general</Text>
                <Text className="text-4xl text-purple-700">
                    {toMoney(totalCredits - totalDebts)}
                </Text>
            </Box>
            <VStack>
                <Text className="text-green-700 font-semibold">+{toMoney(totalCredits)}</Text>
                <Text className="text-orange-700 font-semibold">-{toMoney(totalDebts)}</Text>
            </VStack>
        </HStack>
    );
};
