import { ICON_BY_GROUP_TYPE } from "@/features/groups/config";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { Fab, FabIcon, FabLabel } from "@/lib/gluestack-ui/ui/fab";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { AddIcon, Icon } from "@/lib/gluestack-ui/ui/icon";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { EmptyState, ScreenLayout } from "@/shared/components";
import { toMoney } from "@/shared/utils";
import WithouExpenses from "@assets/without-expenses.svg";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import { useGetGroupDetails } from "../hooks";
import { AccordionUserBalance, HistoryList } from "./components";

export default function GroupDetailsScreen() {
    const { groupId } = useLocalSearchParams();
    const { groupDetail, totalBalance, userBalance, history, hasTransactions, userId } =
        useGetGroupDetails(groupId as string);

    const groupIconType = ICON_BY_GROUP_TYPE[groupDetail.type as keyof typeof ICON_BY_GROUP_TYPE];

    return (
        <>
            <ScreenLayout
                header={
                    <>
                        <Box className="bg-purple-700 h-16 relative">
                            <Box className="bg-white p-[2px] rounded-2xl absolute left-5 -bottom-9">
                                <Box
                                    className={`p-2 ${groupIconType?.color} w-20 h-20 rounded-2xl justify-center items-center border-2 border-white`}
                                >
                                    <Icon
                                        as={groupIconType?.icon}
                                        className="text-white w-12 h-12"
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="mt-10 px-5">
                            <Text className="text-2xl font-semibold text-slate-900">
                                {groupDetail?.name}
                            </Text>
                            {groupDetail?.description && (
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    className="text-slate-700"
                                >
                                    {groupDetail?.description}
                                </Text>
                            )}

                            <Box className="mt-5">
                                <AccordionUserBalance
                                    title={
                                        <HStack className="gap-0">
                                            <Text className="text-xl font-medium">
                                                Revisa tu balance{" "}
                                            </Text>
                                            <Text className={`text-xl font-medium text-purple-700`}>
                                                {totalBalance > 0 ? "+" : ""}
                                                {toMoney(totalBalance)}
                                            </Text>
                                        </HStack>
                                    }
                                    content={
                                        <VStack>
                                            {totalBalance === 0 && (
                                                <Text className="text-slate-700">
                                                    No cuentas con saldos pendientes
                                                </Text>
                                            )}
                                            {totalBalance !== 0 &&
                                                userBalance?.map(({ userId, name, balance }) => (
                                                    <Box key={userId + "balance"}>
                                                        {balance > 0 && (
                                                            <Text>
                                                                {name} te debe{" "}
                                                                <Text className="font-medium text-teal-700">
                                                                    {toMoney(balance)}
                                                                </Text>
                                                            </Text>
                                                        )}
                                                        {balance < 0 && (
                                                            <Text>
                                                                A {name} le debes{" "}
                                                                <Text className="font-medium text-orange-700">
                                                                    {toMoney(Math.abs(balance))}
                                                                </Text>
                                                            </Text>
                                                        )}
                                                    </Box>
                                                ))}
                                        </VStack>
                                    }
                                />
                            </Box>
                        </Box>
                    </>
                }
            >
                <HStack className="gap-4 mt-4">
                    <Link href="/" asChild>
                        <Pressable
                            disabled={!totalBalance}
                            className="p-2 bg-purple-700 rounded-md shadow-lg disabled:bg-gray-400"
                        >
                            <Text className="text-white font-medium">Liquidar deuda</Text>
                        </Pressable>
                    </Link>
                    <Link href="/">
                        <Pressable className="p-2 bg-purple-700 rounded-md shadow-lg">
                            <Text className="text-white font-medium">Saldos</Text>
                        </Pressable>
                    </Link>
                </HStack>

                <EmptyState
                    show={!hasTransactions}
                    url={`/sections/group/${groupId}/expense`}
                    buttonText="Registra tus gastos"
                    title="¡Aún no registras tus gastos!"
                    image={<WithouExpenses width={300} height={300} />}
                />

                {Object.entries(history).map(([date, items]) => (
                    <HistoryList
                        key={date}
                        date={date}
                        items={items}
                        userId={userId}
                        groupId={groupId as string}
                    />
                ))}
            </ScreenLayout>
            {hasTransactions && (
                <Link href={`/sections/group/${groupId}/expense`} asChild>
                    <Fab
                        placement="bottom right"
                        isHovered={false}
                        isDisabled={false}
                        isPressed={false}
                        className="absolute bottom-5 right-5 bg-purple-700"
                    >
                        <FabIcon as={AddIcon} size="xl" />
                        <FabLabel className="font-medium">Agregar gasto</FabLabel>
                    </Fab>
                </Link>
            )}
        </>
    );
}
