import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { InputTextControlled, InputTextSecretControlled } from "@/shared/components";
import { useAppToast } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useSignInState } from "../hooks";
import { UserSignIn, UserSignInSchema } from "../types/UserSignIn";

export default function SignInScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSignIn>({
        resolver: zodResolver(UserSignInSchema),
        mode: "onChange",
    });

    const { showToast } = useAppToast();

    const { handleSubmit: onSubmit } = useSignInState({ showToast });

    return (
        <View className="flex-1 justify-center items-center">
            <VStack className="w-10/12 gap-5">
                <Box>
                    <Text className="text-4xl text-purple-700 font-bold text-center uppercase">
                        Smart Divide
                    </Text>
                    <Text className="text-2xl text-slate-600 font-semibold text-center mt-2">
                        Inicio de Sesión
                    </Text>
                </Box>

                <InputTextControlled
                    control={control}
                    name="email"
                    label="Correo"
                    placeholder="jhondoe@gmail.com"
                    error={errors.email}
                    keyboardType="email-address"
                />

                <InputTextSecretControlled
                    control={control}
                    name="password"
                    label="Contraseña"
                    error={errors.password}
                    placeholder="************"
                />

                <Button className="bg-purple-700 h-12 rounded-lg" onPress={handleSubmit(onSubmit)}>
                    <ButtonText className="text-lg">Iniciar Sesión</ButtonText>
                </Button>

                <Box>
                    <Text className="text-center text-slate-700">¿No tienes una cuenta? </Text>
                    <Link href="/auth/signUp" className="text-purple-700 font-semibold text-center">
                        <Text>¡Registrate aquí!</Text>
                    </Link>
                </Box>
            </VStack>
        </View>
    );
}
