import { Input, InputField } from "@gluestack/input";
import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "./InputWrapperController";
import { InputProps } from "./types";

export const InputTextControlled = <T extends FieldValues>(props: InputProps<T>) => {
    const { error } = props;
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onChange }) => (
                <Input
                    className={`bg-white ${
                        !error ? "border-0" : "border"
                    }  h-auto py-2 px-2 rounded-2xl shadow-gray-200 elevation-sm`}
                >
                    <InputField
                        placeholder="Ej: Viaje a Cancún"
                        className="text-lg"
                        value={value}
                        onChangeText={onChange}
                    />
                </Input>
            )}
        />
    );
};
