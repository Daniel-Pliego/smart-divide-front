import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "../InputWrapperController";
import { InputProps } from "../types";
import { FileInput } from "./FileInput";

export const FileInputControlled = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onChange }) => (
                <FileInput value={value} onChange={onChange} />
            )}
        />
    );
};
