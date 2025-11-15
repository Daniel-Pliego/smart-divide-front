import { Box } from "@/lib/gluestack-ui/ui/box";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { GROUP_TYPES, ICON_BY_GROUP_TYPE } from "@/modules/groups/constants";
import { GroupFormDataSchema } from "@/modules/groups/schemas";
import { GroupFormData } from "@/modules/groups/types";
import {
    InputTextControlled,
    SelectControlled,
    TextAreaControlled,
} from "@/shared/components/form";
import { Button, ButtonText } from "@gluestack/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface GroupFormProps {
    mode: "create" | "edit" | string;
    defaultValues?: GroupFormData;
    onSubmit: (group: GroupFormData) => void;
}

export const GroupForm = ({ mode, defaultValues, onSubmit }: GroupFormProps) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<GroupFormData>({
        resolver: zodResolver(GroupFormDataSchema),
        mode: "onChange",
        defaultValues: {
            type: "other",
            name: defaultValues?.name || "",
            description: defaultValues?.description || "",
        },
    });

    const groupTypeSelected = watch("type");
    const selectedGroupIconType =
        ICON_BY_GROUP_TYPE[groupTypeSelected as keyof typeof ICON_BY_GROUP_TYPE];

    return (
        <VStack className="gap-5 px-5 mt-7">
            <Box
                className={`p-2 ${selectedGroupIconType.color} w-24 h-24 self-center items-center justify-center rounded-2xl`}
            >
                <Icon as={selectedGroupIconType?.icon} className="text-white w-12 h-12"/>
            </Box>

            <InputTextControlled control={control} error={errors.name} name="name" label="Nombre" />

            <SelectControlled
                control={control}
                error={errors.type}
                name="type"
                selectOptions={GROUP_TYPES}
                label="Tipo de grupo"
            />

            <TextAreaControlled
                control={control}
                error={errors.description}
                name="description"
                label="Descripción"
            />

            <Button
                className="bg-purple-700 py-3 h-auto rounded-lg mt-7"
                onPress={handleSubmit(onSubmit)}
                isDisabled={isSubmitting}
            >
                <ButtonText className="text-white text-lg font-semibold">
                    {mode === "create" ? "Guardar" : "Actualizar"}
                </ButtonText>
            </Button>
        </VStack>
    );
};

export default GroupForm;
