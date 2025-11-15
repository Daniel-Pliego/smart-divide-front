import { ExpenseIconKeyType, ICON_BY_EXPENSE_TYPE } from "@/features/groups/config";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { toMoney } from "@/shared/utils";
import React from "react";
import { Text } from "react-native";
import { ExpenseRecord } from "../../types";

export const ExpenseItem = ({ expense }: { expense: ExpenseRecord }) => {
    const expenseIconType = ICON_BY_EXPENSE_TYPE[expense.type as ExpenseIconKeyType];

    return (
        <HStack key={expense.id + "expense"} className="gap-3 bg-gray-100 rounded-md p-5 shadow-lg">
            <HStack className="gap-3 flex-1">
                <Box
                    className={`p-2 mt-1 w-12 h-12 items-center justify-center rounded-xl ${expenseIconType.color}`}
                >
                    <Icon as={expenseIconType.icon} className="text-white w-[70%] h-[70%]" />
                </Box>

                <Box className="flex-1">
                    <Text className="text-lg line-clamp-2 leading-tight font-medium text-wrap text-slate-900">
                        {expense.description}
                    </Text>
                    {expense.payers.map((payer) => (
                        <Text key={payer.id} className="text-slate-700">
                            {payer.name} pagó {toMoney(payer.amountPaid)}
                        </Text>
                    ))}
                </Box>
            </HStack>

            <Box>
                {expense.userBalance < 0 && (
                    <>
                        <Text className="text-right text-orange-700 leading-none font-medium">
                            Debes
                        </Text>
                        <Text className="text-right text-orange-700 text-lg">
                            {toMoney(expense.userBalance)}
                        </Text>
                    </>
                )}
                {expense.userBalance > 0 && (
                    <>
                        <Text className="text-right text-teal-700 leading-none">Te deben</Text>
                        <Text className="text-right text-teal-700">
                            {toMoney(expense.userBalance)}
                        </Text>
                    </>
                )}
            </Box>
        </HStack>
    );
};
