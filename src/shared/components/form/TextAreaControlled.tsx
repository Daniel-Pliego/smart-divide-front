import { Textarea, TextareaInput } from "@/components/ui/textarea";
import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "./InputWrapperController";
import { InputProps } from "./types";

export const TextAreaControlled = <T extends FieldValues>(props: InputProps<T>) => {
    const { error } = props;
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onBlur, onChange }) => (
                <Textarea
                    className={`bg-white ${
                        !error ? "border-0" : "border"
                    } p-2 300 rounded-2xl shadow-gray-200 shadow-sm`}
                    onBlur={onBlur}
                >
                    <TextareaInput
                        placeholder="Ej: Viaje a Cancún"
                        className="text-lg h-32"
                        value={value}
                        onChangeText={onChange}
                        multiline
                        numberOfLines={6}
                    />
                </Textarea>
            )}
        />
    );
};
