import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "lucide-react-native";
import React from "react";
import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";

interface InputWrapperControllerProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
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
                    <FormControlLabel>
                        <FormControlLabelText className="text-indigo-950 text-lg font-semibold mb-1">
                            {label}
                        </FormControlLabelText>
                    </FormControlLabel>

                    {InputComponent(field)}

                    <FormControlError className="mt-1">
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-700 w-4 h-4"
                        />
                        <FormControlErrorText className="text-red-700 text-base">
                            {error?.message ?? ""}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
            )}
        />
    );
};
