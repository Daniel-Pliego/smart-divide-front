import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "react-native";
import { toMoney } from "../../../shared/utils";

interface UserBalanceProps {
    totalCredits: number;
    totalDebts: number;
}

export const UserBalance = ({ totalCredits, totalDebts }: UserBalanceProps) => {
    return (
        <>
            <Text className="text-xl font-semibold text-gray-950 mb-3">Tu balance</Text>
            <HStack className="gap-4 items-center">
                <Box className="bg-white p-5 rounded-3xl flex-1 flex-shrink-0 shadow-gray-200 elevation-sm">
                    <Text className="text-base text-gray-800 mb-1">Por pagar</Text>
                    <Text className="text-3xl text-indigo-800">{toMoney(totalDebts)}</Text>
                </Box>
                <Box className="bg-white p-5 rounded-3xl flex-1 flex-shrink-0 shadow-gray-200 elevation-sm">
                    <Text className="text-base text-gray-800 mb-1">Por cobrar</Text>
                    <Text className="text-3xl text-indigo-800">{toMoney(totalCredits)}</Text>
                </Box>
            </HStack>
        </>
    );
};
