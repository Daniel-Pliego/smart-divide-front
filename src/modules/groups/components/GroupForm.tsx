import { GROUP_TYPES, ICON_BY_GROUP_TYPE } from "@/modules/groups/constants";
import { GroupFormDataSchema } from "@/modules/groups/schemas";
import { GroupFormData } from "@/modules/groups/types";
import {
  InputTextControlled,
  SelectControlled,
  TextAreaControlled,
} from "@/shared/components/form";
import { Box } from "@gluestack/box";
import { Button, ButtonText } from "@gluestack/button";
import { HStack } from "@gluestack/hstack";
import { Icon } from "@gluestack/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text } from "react-native";

export interface GroupFormProps {
    mode: "create" | "edit" | string;
    defaultValues?: GroupFormData;
    onSubmit: (group: GroupFormData) => void;
    router: Router;
}

export const GroupForm = ({ mode, defaultValues, onSubmit, router }: GroupFormProps) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm<GroupFormData>({
        resolver: zodResolver(GroupFormDataSchema),
        mode: "onChange",
        defaultValues: {
            type: "other",
            ...defaultValues,
        },
    });

    const groupTypeSelected = watch("type");

    return (
        <>
            <HStack className="justify-between items-center mb-10 bg-white p-5">
                <Text className="text-gray-950 text-2xl font-semibold">
                    {mode === "create" ? "¡Crea tu grupo!" : "¡Actualiza tu grupo!"}
                </Text>
                <Pressable onPress={() => router.back()}>
                    <Text className="text-indigo-700 text-lg font-medium">Cancelar</Text>
                </Pressable>
            </HStack>

            <Box className="px-5">
                <HStack className="justify-between items-center gap-5">
                    <Box className="p-5 bg-indigo-600 items-center justify-center rounded-full w-auto">
                        <Icon
                            as={
                                ICON_BY_GROUP_TYPE[
                                    groupTypeSelected as keyof typeof ICON_BY_GROUP_TYPE
                                ]
                            }
                            className="w-10 h-10 text-white"
                        />
                    </Box>
                    <Box className="flex-1">
                        <SelectControlled
                            control={control}
                            error={errors.type}
                            name="type"
                            selectOptions={GROUP_TYPES}
                            label="Tipo de grupo"
                        />
                    </Box>
                </HStack>
                <Box className="mt-6">
                    <InputTextControlled
                        control={control}
                        error={errors.name}
                        name="name"
                        label="Nombre"
                    />
                </Box>
                <Box className="mt-6">
                    <TextAreaControlled
                        control={control}
                        error={errors.description}
                        name="description"
                        label="Descripción"
                    />
                </Box>

                <Box className="mt-10">
                    <Button
                        className="bg-indigo-600 py-3 h-auto rounded-2xl"
                        onPress={handleSubmit(onSubmit)}
                        isDisabled={!isValid || isSubmitting}
                    >
                        <ButtonText className="text-white text-lg font-semibold">
                            {mode === "create" ? "Guardar" : "Actualizar"}
                        </ButtonText>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default GroupForm;
