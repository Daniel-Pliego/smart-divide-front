import { ChevronDownIcon } from "@/components/ui/icon";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "./InputWrapperController";
import { SelectProps } from "./types";

export const SelectControlled = <T extends FieldValues>(props: SelectProps<T>) => {
    const { error, selectOptions, ...rest } = props;
    return (
        <InputWrapperController
            {...rest}
            error={error}
            InputComponent={({ value, onChange }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                    <SelectTrigger
                        className={`bg-white rounded-2xl shadow-gray-200 elevation-sm h-auto px-2 py-3 justify-between ${
                            error ? "border-red-500" : "border-0"
                        }`}
                    >
                        <SelectInput
                            placeholder="Selecciona un tipo"
                            className="text-lg text-gray-950"
                        />
                        <SelectIcon as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>

                            {selectOptions.map(({ label, value }) => (
                                <SelectItem key={value} label={label} value={value as string} />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            )}
        />
    );
};
