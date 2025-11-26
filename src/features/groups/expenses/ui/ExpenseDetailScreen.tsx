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
import React from "react";
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

    const { showToast } = useAppToast();

    const { handleDelete } = useDeleteExpense({
        groupId: groupId as string,
        expenseId: expenseId as string,
        expenseEvidenceUrl: expenseDetail?.evidenceUrl as string,
        showToast
    })

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
                            actionButton={<Icon as={Trash} className="w-7 h-7 text-white" />}
                            confirmText="Eliminar"
                        />
                    ),
                }}
            />
            <ScreenLayout
                header={
                    <>
                        <Box className="bg-purple-700 h-16 relative">
                            <Box className="bg-white p-[2px] rounded-2xl absolute left-5 -bottom-9">
                                <Box
                                    className={`p-2 ${expenseType?.color} w-20 h-20 rounded-2xl justify-center items-center border-2 border-white`}
                                >
                                    <Icon as={expenseType?.icon} className="text-white w-12 h-12" />
                                </Box>
                            </Box>
                        </Box>
                        {expenseDetail && (
                            <Box className="mt-10 px-5">
                                <VStack className="gap-1">
                                    <Text className="text-xl text-slate-900 font-medium capitalize">
                                        {expenseDetail.description}
                                    </Text>
                                    <Text className="text-3xl font-medium text-purple-700">
                                        {toMoney(expenseDetail.amount)}
                                    </Text>
                                    <Text className="text-lg text-slate-700">
                                        {sharedFormatDate(expenseDetail.createdAt)}
                                    </Text>
                                </VStack>
                            </Box>
                        )}
                    </>
                }
            >
                <Box className="mt-4">
                    {!expenseDetail && (
                        <Text className="text-lg text-slate-900">No hay detalles del gasto</Text>
                    )}

                    {expenseDetail && (
                        <>
                            <VStack className="gap-3">
                                <Text className="text-lg text-slate-700 font-semibold">Saldos</Text>
                                {expenseDetail?.balances?.map(({ payer, debtors }) => (
                                    <AccordionUserBalance
                                        isDefaultExpanded
                                        key={payer.participant.userId}
                                        title={
                                            <HStack className="gap-3 w-full items-center">
                                                <UserAvatar
                                                    photoUrl={payer.participant.photoUrl}
                                                    name={payer.participant.name}
                                                />
                                                <Box>
                                                    <Text className="text-slate-900 text-lg">
                                                        {`${payer.participant.name} ${payer.participant.lastName}`}{" "}
                                                        pagó{" "}
                                                        <Text className="text-purple-700 font-">
                                                            {toMoney(payer.amountPaid)}
                                                        </Text>
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        }
                                        content={
                                            <Box className="pt-2 border-t border-gray-300 w-full">
                                                {debtors.map(({ debtor, amount }) => (
                                                    <HStack
                                                        key={debtor.userId}
                                                        className="gap-3 items-center"
                                                    >
                                                        <UserAvatar
                                                            photoUrl={debtor.photoUrl}
                                                            name={debtor.name}
                                                        />
                                                        <Text className="text-lg text-slate-900">
                                                            {`${debtor.name} ${debtor.lastName}`} te
                                                            debe{" "}
                                                            <Text className="text-teal-700">
                                                                {toMoney(amount)}
                                                            </Text>
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
                                    <VStack className="gap-3">
                                        <Text className="text-lg text-slate-700 font-semibold m-2 mt-5">
                                            Evidencia
                                        </Text>

                                        <ImagePreviewModal imageUrl={expenseDetail.evidenceUrl} />
                                    </VStack>

                                )
                            }
                        </>
                    )}
                </Box>
            </ScreenLayout>
        </>
    );
}

/**
 * 
 * 
 *    {expenseDetail && (
                        <VStack className="gap-4">
                            <HStack className="justify-between items-start">
                                <VStack>
                                    <GText className="text-2xl font-semibold capitalize">
                                        {expenseDetail.description}
                                    </GText>
                                    <GText className="text-lg text-slate-700">
                                        {sharedFormatDate(expenseDetail.createdAt)}
                                    </GText>
                                </VStack>

                                <VStack className="items-end">
                                    <GText className="text-2xl font-bold">
                                        {toMoney(expenseDetail.amount)}
                                    </GText>
                                </VStack>
                            </HStack>

                            <Box>
                                <GText className="text-xl font-semibold mb-2">Pagado por</GText>
                                <VStack className="gap-3">
                                    {(() => {
                                        const detail = expenseDetail as unknown as ExpenseDetails;
                                        return detail.payers.map((p: any) => (
                                            <HStack
                                                key={p.participant.userId}
                                                className="items-center justify-between"
                                            >
                                                <HStack className="items-center gap-3">
                                                    <Avatar size="md">
                                                        {p.participant.photoUrl ? (
                                                            <AvatarImage
                                                                source={{
                                                                    uri: p.participant.photoUrl,
                                                                }}
                                                            />
                                                        ) : (
                                                            <AvatarFallbackText>
                                                                {p.participant.name?.[0] ?? "U"}
                                                            </AvatarFallbackText>
                                                        )}
                                                    </Avatar>
                                                    <VStack>
                                                        <GText className="font-medium">{`${p.participant.name} ${p.participant.lastName}`}</GText>
                                                        <GText className="text-slate-600">
                                                            Pagó {toMoney(p.amountPaid)}
                                                        </GText>
                                                    </VStack>
                                                </HStack>
                                            </HStack>
                                        ));
                                    })()}
                                </VStack>
                            </Box>

                            <Box>
                                <GText className="text-xl font-semibold mb-2">Balances</GText>
                                <VStack className="gap-4">
                                    {(() => {
                                        const detail = expenseDetail as unknown as ExpenseDetails;
                                        return detail.balances.map((b: any) => (
                                            <Box
                                                key={b.payer.userId}
                                                className="p-3 bg-gray-50 rounded-lg"
                                            >
                                                <HStack className="items-center gap-3 mb-2">
                                                    <Avatar size="sm">
                                                        {b.payer.photoUrl ? (
                                                            <AvatarImage
                                                                source={{ uri: b.payer.photoUrl }}
                                                            />
                                                        ) : (
                                                            <AvatarFallbackText>
                                                                {b.payer.name?.[0] ?? "U"}
                                                            </AvatarFallbackText>
                                                        )}
                                                    </Avatar>
                                                    <GText className="font-medium">{`${b.payer.name} ${b.payer.lastName}`}</GText>
                                                </HStack>

                                                <VStack className="gap-2">
                                                    {b.debtors.map((d: any) => (
                                                        <HStack
                                                            key={d.debtor.userId}
                                                            className="items-center justify-between"
                                                        >
                                                            <HStack className="items-center gap-3">
                                                                <Avatar size="sm">
                                                                    {d.debtor.photoUrl ? (
                                                                        <AvatarImage
                                                                            source={{
                                                                                uri: d.debtor
                                                                                    .photoUrl,
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <AvatarFallbackText>
                                                                            {d.debtor.name?.[0] ??
                                                                                "U"}
                                                                        </AvatarFallbackText>
                                                                    )}
                                                                </Avatar>
                                                                <GText>{`${d.debtor.name} ${d.debtor.lastName}`}</GText>
                                                            </HStack>
                                                            <GText className="text-slate-700">
                                                                Debe {toMoney(d.amount)}
                                                            </GText>
                                                        </HStack>
                                                    ))}
                                                </VStack>
                                            </Box>
                                        ));
                                    })()}
                                </VStack>
                            </Box>
                        </VStack>
                    )}
 */
