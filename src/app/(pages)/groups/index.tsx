import { UserBalance } from "@/modules/groups/components";
import { GROUPS_FILTER_OPTIONS, ICON_BY_GROUP_TYPE } from "@/modules/groups/constants";
import { useGroupsState } from "@/modules/groups/hooks";
import { Filters } from "@/shared/components";
import { toMoney } from "@/shared/utils";
import { Box } from "@gluestack/box";
import { Grid, GridItem } from "@gluestack/grid";
import { HStack } from "@gluestack/hstack";
import { Icon } from "@gluestack/icon";
import { VStack } from "@gluestack/vstack";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

export const GroupsPage = () => {
    const { userBalance, handleFilter, groupListItems, handleSearch } = useGroupsState();
    const router = useRouter();

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}
        >
            <Box className="mt-10 mx-6 flex-1">
                <VStack className="mb-8">
                    <Text className="text-3xl text-indigo-800 mb-2 font-bold">
                        Hola Ciudadano Promedio
                    </Text>
                    <Text className="text-base font-medium text-gray-950">
                        ¡Bienvenida a smart divide!
                    </Text>
                </VStack>

                <UserBalance {...userBalance} />

                <HStack className="mb-3 mt-8 justify-between items-center">
                    <Text className="text-xl font-semibold text-gray-950">Revisa tus grupos</Text>

                    <Pressable onPress={() => router.push("/(pages)/groups/create")}>
                        <Text className="text-indigo-600 font-semibold">+ Crear grupo</Text>
                    </Pressable>
                </HStack>

                <Filters
                    handleSearch={handleSearch}
                    filterOptions={GROUPS_FILTER_OPTIONS}
                    handleFilter={handleFilter}
                    defaultFilter={GROUPS_FILTER_OPTIONS[0].value}
                />

                <Grid
                    className="gap-4 mt-6"
                    _extra={{
                        className: "grid-cols-10",
                    }}
                >
                    {groupListItems.map(({ id, name, type, totalCredits, totalDebts }, index) => {
                        const isLastOddItem =
                            groupListItems.length % 2 !== 0 && groupListItems.length - 1 === index;
                        return (
                            <GridItem
                                _extra={{
                                    className: isLastOddItem ? "col-span-10" : "col-span-5",
                                }}
                                key={id}
                                className="bg-white rounded-xl p-4 gap-4 items-center shadow-gray-200 elevation-sm"
                            >
                                <Pressable onPress={() => router.push(`/(pages)/group/${id}`)}>
                                    <Box className="bg-indigo-500 p-2 w-16 h-16 items-center justify-center rounded-full">
                                        <Icon
                                            as={ICON_BY_GROUP_TYPE[type]}
                                            className="w-[50%] h-[50%] text-white"
                                        />
                                    </Box>

                                    <Box>
                                        <Text className="text-xl font-semibold text-indigo-800 self-center">
                                            {name}
                                        </Text>

                                        {totalDebts > 0 && (
                                            <Text className="text-gray-600 text-base mt-0.5">
                                                Debes{" "}
                                                <Text className="text-orange-600 font-semibold">
                                                    {toMoney(totalDebts)}
                                                </Text>
                                            </Text>
                                        )}
                                        {totalCredits > 0 && (
                                            <Text className="text-gray-600 text-base mt-0.5">
                                                Se te debe{" "}
                                                <Text className="text-teal-600 font-semibold">
                                                    {toMoney(totalCredits)}
                                                </Text>
                                            </Text>
                                        )}

                                        {totalCredits === 0 && totalDebts === 0 && (
                                            <Text className="text-gray-500 text-base mt-0.5">
                                                Sin saldos pendientes
                                            </Text>
                                        )}
                                    </Box>
                                </Pressable>
                            </GridItem>
                        );
                    })}
                </Grid>
            </Box>
        </ScrollView>
    );
};

export default GroupsPage;
