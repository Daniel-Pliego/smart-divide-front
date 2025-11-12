import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { UserBalance } from "@/modules/groups/components";
import { GROUPS_FILTER_OPTIONS, ICON_BY_GROUP_TYPE } from "@/modules/groups/constants";
import { useGroupsState } from "@/modules/groups/hooks";
import { Filters } from "@/shared/components";
import { toMoney } from "@/shared/utils";
import { Link } from "expo-router";
import { ChevronRight, Plus } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView } from "react-native";

export default function GroupList() {
    const { userBalance, handleFilter, groupListItems, handleSearch } = useGroupsState();
    return (
        <ScrollView className="flex-1 bg-white">
            <Box className="bg-purple-700 pb-7 px-5">
                <Text className="text-3xl text-white">Hola Diana Carolina</Text>
                <Text className="text-base text-white mt-1">¡Bienvenida a Smart Divde!</Text>

                <UserBalance {...userBalance} />
            </Box>

            <Box className="mt-7 mx-5">
                <HStack className="justify-between items-center mb-3">
                    <Text className="text-xl font-semibold text-slate-900">Revisa tus grupos</Text>
                    <Link href="/sections/group/create" asChild>
                        <Button className="rounded-full bg-purple-700 px-2">
                            <ButtonIcon as={Plus} className="w-5 -mr-2" />
                            <ButtonText className="text-sm">Crear grupo</ButtonText>
                        </Button>
                    </Link>
                </HStack>
                <Filters
                    filterOptions={GROUPS_FILTER_OPTIONS}
                    defaultFilter="all"
                    handleFilter={handleFilter}
                    handleSearch={handleSearch}
                />

                <VStack className="gap-5 mt-5">
                    {groupListItems.map(({ id, name, totalCredits, totalDebts, type }) => {
                        const groupIconType =
                            ICON_BY_GROUP_TYPE[type as keyof typeof ICON_BY_GROUP_TYPE];
                        return (
                            <Link href="/" asChild key={id}>
                                <Pressable className=" bg-gray-100 rounded-md p-5 shadow-lg">
                                    <HStack className="justify-between items-center">
                                        <HStack className="items-center gap-5">
                                            <Box
                                                className={`${groupIconType.color} p-2 w-14 h-14 items-center justify-center rounded-lg`}
                                            >
                                                <Icon
                                                    as={groupIconType.icon}
                                                    className="w-[70%] h-[70%] text-white"
                                                />
                                            </Box>
                                            <Box>
                                                <Text className="text-xl font-semibold text-slate-900">
                                                    {name}
                                                </Text>

                                                {totalDebts > 0 && (
                                                    <Text className="text-orange-700">
                                                        Debes {toMoney(totalDebts)}
                                                    </Text>
                                                )}
                                                {totalCredits > 0 && (
                                                    <Text className="text-teal-700">
                                                        Se te debe {toMoney(totalCredits)}
                                                    </Text>
                                                )}

                                                {totalCredits === 0 && totalDebts === 0 && (
                                                    <Text className="text-gray-500 text-base">
                                                        Sin saldos pendientes
                                                    </Text>
                                                )}
                                            </Box>
                                        </HStack>
                                        <Icon
                                            as={ChevronRight}
                                            className="w-8 h-8 text-slate-700"
                                        />
                                    </HStack>
                                </Pressable>
                            </Link>
                        );
                    })}
                </VStack>
            </Box>
        </ScrollView>
    );
}
