import { Textarea, TextareaInput } from "@gluestack/textarea";
import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "./InputWrapperController";
import { InputProps } from "./types";

export const TextAreaControlled = <T extends FieldValues>(props: InputProps<T>) => {
    const { error, ...rest } = props;
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onBlur, onChange }) => (
                <Textarea
                    className={`${
                        !error ? "border-0" : "border"
                    } p-2 300 bg-gray-100 rounded-lg shadow-gray-200 elevation-sm`}
                    onBlur={onBlur}
                >
                    <TextareaInput
                        className="text-lg h-32"
                        value={value}
                        onChangeText={onChange}
                        multiline
                        numberOfLines={6}
                        {...rest}
                    />
                </Textarea>
            )}
        />
    );
};
