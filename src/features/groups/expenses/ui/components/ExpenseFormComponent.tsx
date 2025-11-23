import { EXPENSE_TYPES, ICON_BY_EXPENSE_TYPE } from "@/features/groups/config";
import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import {
    FileInputControlled,
    InputNumberControlled,
    InputTextControlled,
    SelectControlled,
} from "@/shared/components";
import { SelectOptions } from "@/shared/components/form/types";
import { FormLayout } from "@/shared/components/layout/FormLayout";
import React from "react";
import { FieldErrorsImpl } from "react-hook-form";

import { useExpenseForm } from "../../hooks";
import { ExpenseForm, ExpenseParticipant } from "../../types";
import { ParticipantSelector } from "./ParticipantSelector";

interface ExpenseFormProps {
    onSubmit: (data: ExpenseForm) => void;
    groupMembers: SelectOptions[];
    isSubmitting: boolean;
}

export const ExpenseFormComponent = ({ onSubmit, groupMembers, isSubmitting }: ExpenseFormProps) => {
    const { control, handleSubmit, errors, expenseType, divisionType } = useExpenseForm();

    const selectedExpenseType =
        ICON_BY_EXPENSE_TYPE[expenseType as keyof typeof ICON_BY_EXPENSE_TYPE];

    return (
        <FormLayout extraScrollHeight={120}>
            <VStack className="gap-5">
                <Box
                    className={`p-2 ${selectedExpenseType.color} w-24 h-24 self-center items-center justify-center rounded-2xl`}
                >
                    <Icon as={selectedExpenseType?.icon} className="text-white w-12 h-12" />
                </Box>

                <HStack className="gap-5">
                    <Box className="flex-1">
                        <SelectControlled
                            control={control}
                            error={errors.type}
                            name="type"
                            selectOptions={EXPENSE_TYPES}
                            label="Tipo de gasto"
                        />
                    </Box>

                    <Box className="flex-1">
                        <InputNumberControlled
                            control={control}
                            error={errors.amount}
                            name="amount"
                            label="Cantidad a pagar"
                            keyboardType="numeric"
                        />
                    </Box>
                </HStack>

                <InputTextControlled
                    control={control}
                    error={errors.description}
                    name="description"
                    label="Descripción"
                    placeholder="Cuenta de restaurante"
                />

                <FileInputControlled
                    control={control}
                    name="evidence"
                    label="Evidencia del gasto"
                />

                <ParticipantSelector
                    control={control}
                    label="Pagador por"
                    options={groupMembers}
                    name="payers"
                    divisionType={divisionType}
                    error={errors.payers as FieldErrorsImpl<ExpenseParticipant>[]}
                />

                <SelectControlled
                    control={control}
                    error={errors.divisionType}
                    name="divisionType"
                    selectOptions={[
                        {
                            label: "Partes iguales",
                            value: "equal",
                        },
                        {
                            label: "Partes desiguales",
                            value: "custom",
                        },
                    ]}
                    label="Dividir en"
                    placeholder="Selecciona el tipo"
                />

                <ParticipantSelector
                    control={control}
                    label="Dividido entre"
                    options={groupMembers}
                    name="participants"
                    divisionType={divisionType}
                    error={errors.participants as FieldErrorsImpl<ExpenseParticipant>[]}
                />
            </VStack>
            <Button
                className="bg-purple-700 py-3 h-auto rounded-lg mt-7"
                onPress={handleSubmit(onSubmit)}
                isDisabled={isSubmitting}
            >
                <ButtonText className="text-white text-lg font-semibold">Guardar</ButtonText>
            </Button>
        </FormLayout>
    );
};
