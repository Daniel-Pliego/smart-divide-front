import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { FormError, InputTextControlled, InputTextSecretControlled } from "@/shared/components";
import { FormLayout } from "@/shared/components/layout/FormLayout";
import { useAppToast } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { useSignUpState } from "../hooks";
import { UserSignUpForm, userSignUpFormSchema } from "../types/UserSignUp";

export default function SignUpScreen() {
    const [misMatches, setMisMatches] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserSignUpForm>({
        resolver: zodResolver(userSignUpFormSchema),
        mode: "onChange",
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        if (password !== confirmPassword && confirmPassword) {
            setMisMatches(true);
        } else {
            setMisMatches(false);
        }
    }, [password, confirmPassword]);

    const { showToast } = useAppToast();

    const { handleSubmit: handleSignUpSubmit } = useSignUpState({ showToast });

    return (
        <FormLayout boxClassName="flex-1 justify-center items-center">
            <VStack className="w-10/12 gap-5">
                <Box>
                    <Text className="text-4xl text-purple-700 font-bold text-center uppercase">
                        Smart Divide
                    </Text>
                    <Text className="text-2xl text-slate-600 font-semibold text-center mt-2">
                        Registra tu cuenta
                    </Text>
                </Box>

                <InputTextControlled
                    control={control}
                    name="name"
                    label="Nombre"
                    placeholder="Jhon"
                    error={errors.name}
                />

                <InputTextControlled
                    control={control}
                    name="lastName"
                    label="Apellido(s)"
                    placeholder="Doe Smith"
                    error={errors.lastName}
                />

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

                <Box>
                    <InputTextSecretControlled
                        control={control}
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        error={errors.confirmPassword}
                        placeholder="************"
                    />
                    <FormError show={misMatches} message="Las contraseñas deben de ser iguales" />
                </Box>

                <Button
                    className="bg-purple-700 h-12 rounded-lg mt-4"
                    onPress={handleSubmit(handleSignUpSubmit)}
                >
                    <ButtonText className="text-lg">Crear cuenta</ButtonText>
                </Button>

                <Box>
                    <Text className="text-center text-slate-700">¿Ya tienes una cuenta? </Text>
                    <Link href="/auth/signIn" className="text-purple-700 font-semibold text-center">
                        <Text>¡Inicia sesión!</Text>
                    </Link>
                </Box>
            </VStack>
        </FormLayout>
    );
}
