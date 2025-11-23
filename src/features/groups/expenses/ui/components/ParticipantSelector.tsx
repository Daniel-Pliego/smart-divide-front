import { Box } from "@/lib/gluestack-ui/ui/box";
import { Button, ButtonIcon } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { FormError, InputNumberControlled, SelectControlled } from "@/shared/components";
import { SelectOptions } from "@/shared/components/form/types";
import { Plus, Trash } from "lucide-react-native";
import React, { Fragment } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { Text } from "react-native";
import { ExpenseForm, ParticipanErrorField } from "../../types";

interface ParticipantSelectorProps {
    control: Control<ExpenseForm>;
    options: SelectOptions[];
    label: string;
    name: "participants" | "payers";
    divisionType: ExpenseForm["divisionType"];
    error: ParticipanErrorField;
}

export const ParticipantSelector = ({
    control,
    options,
    label,
    name,
    divisionType,
    error,
}: ParticipantSelectorProps) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    const items = useWatch({ control, name });

    const availableOptions = options.filter(
        (option) => !items.some((p) => p.userId === option.value)
    );

    return (
        <Box>
            <Text className="text-slate-900 text-lg font-semibold mb-2">{label}</Text>

            <VStack className="gap-3">
                {fields.map((_, index) => {
                    const selected = items[index]?.userId;
                    const currentOption = options.find((o) => o.value === selected);

                    const selectOptions = currentOption
                        ? [...availableOptions, currentOption]
                        : availableOptions;

                    return (
                        <Fragment key={index}>
                            <HStack key={index} className="gap-3 items-start">
                                <Button
                                    className={`rounded-lg py-4 px-2 h-auto ${
                                        items.length > 1 ? "bg-red-200" : "bg-gray-300"
                                    }`}
                                    onPress={() => remove(index)}
                                    disabled={items.length === 1}
                                >
                                    <ButtonIcon as={Trash} color="red" />
                                </Button>
                                <Box className="flex-1">
                                    <SelectControlled
                                        control={control}
                                        name={`${name}.${index}.userId`}
                                        selectOptions={selectOptions}
                                        placeholder="Seleccionar"
                                    />
                                </Box>

                                <Box className="flex-1 max-w-28">
                                    <InputNumberControlled
                                        control={control}
                                        name={`${name}.${index}.amountPaid`}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        readOnly={
                                            name === "participants" && divisionType === "equal"
                                        }
                                    />
                                </Box>
                            </HStack>

                            <FormError
                                show={!!(error as any)?.[index]?.userId}
                                message={(error as any)?.[index]?.userId?.message}
                            />
                            <FormError
                                show={!!(error as any)?.[index]?.amountPaid}
                                message={(error as any)?.[index]?.amountPaid?.message}
                            />
                        </Fragment>
                    );
                })}
            </VStack>

            <FormError
                show={!!(error as any)?._sum?.message}
                message={(error as any)?._sum?.message}
            />

            {items.length !== options.length && (
                <Button
                    className="rounded-lg bg-purple-100 mt-3"
                    onPress={() =>
                        append({
                            userId: "",
                            amountPaid: "0",
                        })
                    }
                >
                    <ButtonIcon as={Plus} color="purple" />
                </Button>
            )}
        </Box>
    );
};
