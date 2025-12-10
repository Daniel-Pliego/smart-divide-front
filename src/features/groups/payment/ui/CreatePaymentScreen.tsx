import { Box } from '@/lib/gluestack-ui/ui/box'
import { Button, ButtonText } from '@/lib/gluestack-ui/ui/button'
import { HStack } from '@/lib/gluestack-ui/ui/hstack'
import { Icon } from '@/lib/gluestack-ui/ui/icon'
import { VStack } from '@/lib/gluestack-ui/ui/vstack'
import { InputNumberControlled, UserAvatar } from '@/shared/components'
import { toMoney } from '@/shared/utils'
import { HandCoins, MoveRight } from 'lucide-react-native'
import React from 'react'
import { Text } from 'react-native'
import useCreatePayment from '../hooks/useCreatePayment'
import { useCreatePaymentSheet } from '../hooks/useCreatePaymentSheet'

export const CreatePaymentScreen = () => {
    const { debtToPay, control, formState, groupId, handleSubmit, onSubmit, isSubmitting } = useCreatePayment();
    const { handlePayment, isPending } = useCreatePaymentSheet();

    if (!debtToPay) {
        return null;
    }

    return (
        <VStack className="mt-20 items-center justify-center gap-5">
            <HStack className="gap-3 items-center justify-center">
                <UserAvatar size="lg" photoUrl={debtToPay?.debtor?.photoUrl} name={debtToPay?.debtor.name} />
                <Icon as={MoveRight} className="text-slate-900 w-10 h-10" />
                <UserAvatar size="lg" photoUrl={debtToPay?.creditor?.photoUrl} name={debtToPay?.creditor.name} />
            </HStack>

            <Box>
                <Text className="text-slate-700 text-lg text-center">Pagaras a {debtToPay.creditor.name} {debtToPay.creditor.lastName}</Text>
                <Text className="text-slate-500 text-lg text-center">tu deuda total es de {toMoney(debtToPay.amount)}</Text>
            </Box>

            <HStack className="w-1/2 gap-3 mx-auto items-start justify-center">
                <Box className="p-2 shadow-lg rounded-lg bg-white w-14">
                    <Icon as={HandCoins} className="text-slate-700 w-10 h-10" />
                </Box>
                <Box className="w-full">
                    <InputNumberControlled
                        control={control}
                        error={formState.errors.amount}
                        name="amount"
                        keyboardType="numeric"
                        placeholder="0.00"
                    />
                </Box>
            </HStack>

            <Box className="w-full items-center justify-center mt-5 gap-3">
                <Button onPress={handleSubmit(onSubmit)} size="lg" className="w-2/3 bg-purple-700 rounded-md" disabled={isSubmitting}>
                    <ButtonText className="text-xl">Registrar pago</ButtonText>
                </Button>

                <Button disabled={isPending} variant='outline' onPress={handleSubmit((data) => handlePayment({ fromUser: debtToPay.debtor.userId, toUser: debtToPay.creditor.userId, amount: Number(data.amount), groupId }))} size="lg" className="w-2/3 rounded-md border border-purple-700 py-1 h-auto">
                    <ButtonText className="text-xl text-slate-700 text-center">Registrar pago con tarjeta</ButtonText>
                </Button>
            </Box>
        </VStack>
    )
}
