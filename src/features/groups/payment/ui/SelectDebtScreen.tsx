import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { ScreenLayout, UserAvatar } from "@/shared/components";
import { toMoney } from "@/shared/utils";
import { Link, RelativePathString, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import useGetDebts from "../hooks/useGetDebts";

export function SelectPaymentScreen() {
    const { groupId } = useLocalSearchParams();
    const { debts } = useGetDebts(groupId as string);
    return (
        <ScreenLayout>

            <VStack className="gap-5 mt-8">
                {debts.map((debt, index) => (
                    <Link key={index} asChild href={{
                        pathname: `/sections/group/${groupId}/payment/create` as RelativePathString,
                        params: {
                            creditorId: debt.creditor.userId,
                            debtorId: debt.debtor.userId,
                            amount: debt.amount,
                            creditorName: debt.creditor.name,
                            creditorPhoto: debt.creditor.photoUrl,
                            debtorName: debt.debtor.name,
                            debtorPhoto: debt.debtor.photoUrl
                        }
                    }}>

                        <Pressable>
                            <HStack className="justify-between items-center">
                                <HStack className="gap-5 items-center">
                                    <UserAvatar
                                        size="md"
                                        photoUrl={debt.creditor.photoUrl}
                                        name={debt.creditor.name}
                                    />
                                    <Text className="text-slate-700 text-lg">{debt.creditor.name} {debt.creditor.lastName}</Text>
                                </HStack>

                                <Box>
                                    <Text className="text-teal-700 text-right font-medium">le debes</Text>
                                    <Text className="text-teal-700 text-right font-medium">{toMoney(debt.amount)}</Text>
                                </Box>

                            </HStack>
                        </Pressable>
                    </Link>
                ))}
            </VStack>


        </ScreenLayout>
    )
}
