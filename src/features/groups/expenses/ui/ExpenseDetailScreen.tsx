import { getAuthStore } from "@/features/auth/utils";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import {
    ImagePreviewModal,
    ModalButtonAction,
    ScreenLayout,
    UserAvatar
} from "@/shared/components";
import { useAppToast } from "@/shared/hooks";
import { formatDate as sharedFormatDate, toMoney } from "@/shared/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { Trash } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { ExpenseIconKeyType, ICON_BY_EXPENSE_TYPE } from "../../config";
import { AccordionUserBalance } from "../../details/ui/components";
import { useDeleteExpense, useGetExpenseDetail } from "../hooks";

export default function ExpenseDetailScreen() {
    const { groupId, expenseId } = useLocalSearchParams();
    const { expenseDetail } = useGetExpenseDetail(
        groupId as string,
        expenseId as string
    );

    const [userId, setUserId] = useState<string>("");

    const { showToast } = useAppToast();

    const { handleDelete } = useDeleteExpense({
        groupId: groupId as string,
        expenseId: expenseId as string,
        expenseEvidenceUrl: expenseDetail?.evidenceUrl as string,
        showToast
    })

    useEffect(() => {
        const init = async () => {
            const authStore = await getAuthStore();
            setUserId(authStore?.userId || "");
        }
    }, [])

    const expenseType =
        ICON_BY_EXPENSE_TYPE[(expenseDetail?.type || "other") as ExpenseIconKeyType];
    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <ModalButtonAction
                            title="Eliminar gasto"
                            message="¿Está seguro de que desea eliminar este gasto? Esta acción no se podrá deshacer."
                            icon={<Box className="w-[56px] h-[56px] rounded-full bg-red-500/70 items-center justify-center">
                                <Icon as={Trash} className="w-7 h-7 text-white" />
                            </Box>
                            }
                            confirm={handleDelete}
                            actionButton={<Box className="p-2 rounded-full bg-gray-100/30 items-center">
                                <Icon as={Trash} className="w-7 h-7 text-white" />
                            </Box>}
                            confirmText="Eliminar"
                        />
                    )
                }}
            />
            <ScreenLayout
                header={
                    <HStack className="px-5 gap-5 mt-5">
                        <Box
                            className={`p-2 ${expenseType?.color} w-20 h-20 rounded-2xl justify-center items-center`}
                        >
                            <Icon as={expenseType?.icon} className="text-white w-12 h-12" />
                        </Box>
                        {expenseDetail && (
                            <VStack className="gap-1">
                                <Text className="text-xl text-slate-900 font-medium capitalize">
                                    {expenseDetail.description}
                                </Text>
                                <Text className="text-3xl font-medium text-purple-700">
                                    {toMoney(expenseDetail.amount)}
                                </Text>
                                <Text className="text-lg text-slate-700">
                                    creado el {sharedFormatDate(expenseDetail.createdAt)}
                                </Text>
                            </VStack>
                        )}
                    </HStack>
                }
            >
                <Box className="mt-4">
                    {expenseDetail && (
                        <Box>
                            <Text className="text-lg text-slate-500 mb-2">Pagado por</Text>
                            <VStack className="gap-3">
                                {
                                    expenseDetail.paidBy.map(({ participant: payer, amount }) => (
                                        <HStack className="gap-3 w-full items-center justify-between" key={payer.userId + "payer"}>
                                            <HStack className="gap-2 items-center">
                                                <UserAvatar
                                                    photoUrl={payer.photoUrl}
                                                    name={payer.name}
                                                />
                                                <Text className="text-slate-700 text-lg">
                                                    {
                                                        userId === payer.userId ? "Tú" : `${payer.name} ${payer.lastName}`
                                                    }
                                                </Text>
                                            </HStack>

                                            <Text className={`${userId === payer.userId ? "text-slate-500" : "text-teal-700"} text-2xl`}>
                                                {toMoney(amount)}
                                            </Text>
                                        </HStack>
                                    ))
                                }
                            </VStack>

                            <Text className="text-lg text-slate-500 mb-2 mt-6">Dividido entre</Text>
                            <VStack className="gap-3">
                                {
                                    expenseDetail.distribution.map(({ participant, amount }) => (
                                        <HStack className="gap-3 w-full items-center justify-between" key={participant.userId + "distribution"}>
                                            <HStack className="gap-2 items-center">
                                                <UserAvatar
                                                    photoUrl={participant.photoUrl}
                                                    name={participant.name}
                                                />
                                                <Text className="text-slate-700 text-lg">
                                                    {
                                                        userId === participant.userId ? "Tú" : `${participant.name} ${participant.lastName}`
                                                    }
                                                </Text>
                                            </HStack>

                                            <Text className={`${userId === participant.userId ? "text-slate-500" : "text-teal-700"} text-2xl`}>
                                                {toMoney(amount)}
                                            </Text>
                                        </HStack>
                                    ))
                                }
                            </VStack>
                            <Text className="text-lg text-slate-500 mt-6 mb-2">Balance del gasto</Text>
                            <VStack className="gap-3">
                                {expenseDetail?.balances?.map(({ payer, debtors }) => (
                                    <AccordionUserBalance
                                        isDefaultExpanded
                                        key={payer.participant.userId}
                                        summaryStyles="bg-transparent p-0 shadow-transaparent"
                                        contentStyles="bg-transparent p-0 shadow-transparent"
                                        title={
                                            <HStack className="gap-3 w-full items-center">
                                                <UserAvatar
                                                    photoUrl={payer.participant.photoUrl}
                                                    name={payer.participant.name}
                                                />
                                                <Text className="text-slate-700 text-lg">
                                                    {
                                                        userId === payer.participant.userId ? "te deben" : `le deben a ${payer.participant.name} ${payer.participant.lastName}`
                                                    }

                                                </Text>
                                            </HStack>
                                        }
                                        content={
                                            <Box className="pt-5 w-full pl-12">
                                                {debtors.map(({ participant: debtor, amount }) => (
                                                    <HStack className="gap-3 w-full items-center justify-between">
                                                        <HStack className="gap-2 items-center">
                                                            <UserAvatar
                                                                photoUrl={debtor.photoUrl}
                                                                name={debtor.name}
                                                            />
                                                            <Text className="text-slate-700 text-lg">
                                                                {`${debtor.name} ${debtor.lastName}`}{" "}

                                                            </Text>
                                                        </HStack>

                                                        <Text className="text-teal-700 text-2xl">
                                                            {toMoney(amount)}
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </Box>
                                        }
                                    />
                                ))}
                            </VStack>

                            {
                                expenseDetail.evidenceUrl && (
                                    <>
                                        <Text className="text-lg text-slate-500 mb-2 mt-6">
                                            Evidencia
                                        </Text>
                                        <ImagePreviewModal imageUrl={expenseDetail.evidenceUrl} />
                                    </>

                                )
                            }
                        </Box>
                    )}
                </Box>
            </ScreenLayout>
        </>
    );
}
