import { ExpenseIconKeyType, ICON_BY_EXPENSE_TYPE } from "@/features/groups/config";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { toMoney } from "@/shared/utils";
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { ExpenseRecord } from "../../types";

export const ExpenseItem = ({ expense, userId, groupId}: { expense: ExpenseRecord; userId: string, groupId: string}) => {
    const expenseIconType = ICON_BY_EXPENSE_TYPE[expense.type as ExpenseIconKeyType];

    return (
        <Link href={`/sections/group/${groupId}/expense/${expense.id}`}>
            <HStack className="gap-3 bg-gray-100 rounded-md p-5 shadow-lg">
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
                            <Text key={payer.userId} className="text-slate-700">
                                {payer.userId === userId ? "Pagaste" : `${payer.name} pagó`}{" "}
                                <Text className="text-teal-700 font-medium">
                                    {toMoney(payer.amountPaid)}
                                </Text>
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
                            <Text className="text-right text-orange-700 text-lg font-medium">
                                {toMoney(Math.abs(expense.userBalance))}
                            </Text>
                        </>
                    )}
                    {expense.userBalance > 0 && (
                        <>
                            <Text className="text-right text-teal-700 leading-none font-medium">
                                Te deben
                            </Text>
                            <Text className="text-right text-teal-700 font-medium">
                                {toMoney(expense.userBalance)}
                            </Text>
                        </>
                    )}
                </Box>
            </HStack>
        </Link>
    );
};
