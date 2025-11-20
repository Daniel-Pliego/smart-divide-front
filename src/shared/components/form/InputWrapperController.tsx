import {
    FormControl,
    FormControlLabel,
    FormControlLabelText
} from "@gluestack/form-control";
import React from "react";
import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";
import { FormError } from "./FormError";

interface InputWrapperControllerProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: FieldError;
    isRequired?: boolean;
    InputComponent: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

export const InputWrapperController = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    InputComponent,
    isRequired,
}: InputWrapperControllerProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormControl isInvalid={!!error} isRequired={isRequired}>
                    {label && (
                        <FormControlLabel>
                            <FormControlLabelText className="text-slate-900 text-lg font-semibold">
                                {label}
                            </FormControlLabelText>
                        </FormControlLabel>
                    )}

                    {InputComponent(field)}

                    <FormError show={!!error} message={error?.message} />
                </FormControl>
            )}
        />
    );
};
