import { Control, FieldError, FieldValues, Path } from "react-hook-form";

export interface InputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    error?: FieldError;
    isRequired?: boolean;
}

export interface SelectProps<T extends FieldValues> extends InputProps<T> {
    selectOptions: SelectOptions[];
}

export interface SelectOptions {
    label: string;
    value: string | number;
}
