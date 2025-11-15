import { ICON_BY_GROUP_TYPE } from "@/features/groups/config";
import { GroupInfoResume } from "@/features/groups/list/types";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { toMoney } from "@/shared/utils";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

interface Props {
    groupInfoResume: GroupInfoResume;
}

export const GroupCard = ({ groupInfoResume }: Props) => {
    const { id, name, type, totalDebts, totalCredits } = groupInfoResume;

    const groupIconType = ICON_BY_GROUP_TYPE[type as keyof typeof ICON_BY_GROUP_TYPE];

    return (
        <Link href={`/(tabs)/group/${id}`} asChild>
            <Pressable className="bg-gray-100 rounded-md p-5 shadow-lg">
                <HStack className="justify-between items-center">
                    <HStack className="items-center gap-5">
                        <Box
                            className={`${groupIconType.color} p-2 w-14 h-14 items-center justify-center rounded-lg`}
                        >
                            <Icon as={groupIconType.icon} className="w-[70%] h-[70%] text-white" />
                        </Box>

                        <Box>
                            <Text className="text-xl font-semibold text-slate-900">{name}</Text>

                            {totalDebts > 0 && (
                                <Text className="text-orange-700">Debes {toMoney(totalDebts)}</Text>
                            )}

                            {totalCredits > 0 && (
                                <Text className="text-teal-700">
                                    Se te debe {toMoney(totalCredits)}
                                </Text>
                            )}

                            {totalDebts === 0 && totalCredits === 0 && (
                                <Text className="text-gray-500 text-base">
                                    Sin saldos pendientes
                                </Text>
                            )}
                        </Box>
                    </HStack>

                    <Icon as={ChevronRight} className="w-8 h-8 text-slate-700" />
                </HStack>
            </Pressable>
        </Link>
    );
};
