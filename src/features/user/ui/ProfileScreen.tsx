import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { ScreenLayout, UserAvatar } from "@/shared/components";
import * as Clipboard from "expo-clipboard";
import { BadgeCheck, BadgeX, Copy } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import useCreateCustomerSheet from "../hooks/useCreateCustomerSheet";
import { useGetUserDetails } from "../hooks/useGetUserDetails";
import { useVerifyAccount } from "../hooks/useVerifyAccount";

export default function ProfileScreen() {

    const { initVerification } = useVerifyAccount();
    const { handleShowCustomerSheet } = useCreateCustomerSheet();
    const { user, isLoading } = useGetUserDetails()
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        }
    }, [copied])

    return (
        <ScreenLayout>

            <VStack className="justify-center items-center w-full mt-5">
                <UserAvatar size="xl" photoUrl={user?.photoUrl!} name={user?.name!} />
                <Text className="text-slate-700 text-2xl mt-2 font-medium">{user?.name} {user?.lastName}</Text>
                <HStack className="items-center gap-1">

                    {
                        user?.isVerified ?
                            <Text className="text-blue-500"> Cuenta verificada</Text> : <Text className="text-slate-500">Cuenta sin verificar</Text>
                    }
                    {user?.isVerified ? <BadgeCheck size={15} color="#3b82f6" /> : <BadgeX size={15} color="#64748b" />}
                </HStack>

            </VStack>
            <Text className="text-slate-500 text-lg mt-5">Correo</Text>
            <Text className="text-slate-700 text-xl">{user?.email}</Text>

            <Text className="text-slate-500 mt-3 text-lg">
                Identificador
            </Text>

            <HStack className="gap-5">
                <Text className="text-slate-700 text-xl">{user?.id.slice(0, 5)}...{user?.id.slice(-5)}</Text>
                {
                    !copied ?
                        <Pressable onPress={() => {
                            Clipboard.setStringAsync(user?.id!);
                            setCopied(true);
                        }}>
                            <Copy size={18} />
                        </Pressable> : <Text className="text-slate-700">copiado</Text>
                }
            </HStack>


            <Text className="text-slate-500 text-lg mt-5">Administrar datos bancarios</Text>

            <HStack className="flex-1 gap-3 mt-2">

                <Box className="w-1/2">
                    <Button onPress={initVerification} className="bg-violet-700 h-16">
                        <ButtonText className="text-lg text-center font-normal">
                            {user?.isVerified ? "Revisa los datos de tu cuenta" : "Verifica tu cuenta"}
                        </ButtonText>
                    </Button>
                    {
                        !user?.isVerified ?
                            <Text className="text-slate-700 text-sm mt-1">Verifica tu cuenta para poder recibir pagos</Text>
                            : null
                    }
                </Box>


                <Button onPress={handleShowCustomerSheet} className="w-1/2 h-16">
                    <ButtonText className="text-center text-lg font-normal">
                        Administra tus métodos de pago
                    </ButtonText>
                </Button>
            </HStack>




        </ScreenLayout>
    )
}
