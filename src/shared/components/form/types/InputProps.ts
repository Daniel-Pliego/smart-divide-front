import { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";

export interface InputProps<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: FieldError;
}

export interface SelectProps<T extends FieldValues> extends InputProps<T> {
    selectOptions: SelectOptions[];
}

export interface SelectOptions {
    label: string;
    value: string | number;
}