import { Input, InputField } from "@gluestack/input";
import React from "react";
import { FieldValues } from "react-hook-form";
import { InputWrapperController } from "./InputWrapperController";
import { InputProps } from "./types";

export const InputNumberControlled = <T extends FieldValues>(props: InputProps<T>) => {
    const { error, ...rest } = props;
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onChange }) => (
                <Input
                    className={`${
                        !error ? "border-0" : "border"
                    }  h-14 py-3 px-2 bg-gray-100 rounded-lg shadow-gray-200 elevation-sm`}
                    isDisabled={rest?.readOnly}
                >
                    <InputField
                        className="text-lg"
                        value={value}
                        onChangeText={(value) => {
                            const cleaned = value.replace(/[^\d.]/g, "");
                            const hasDot = cleaned.endsWith(".");
                            const [int = "", dec = ""] = cleaned.split(".");

                            const normalizedInt = int.replace(/^0+(?=\d)/, "") || int;
                            const trimmedDec = dec.slice(0, 2);

                            let output = normalizedInt;
                            if (trimmedDec) output += `.${trimmedDec}`;
                            else if (hasDot) output += ".";

                            onChange(output);
                        }}
                        {...rest}
                    />
                </Input>
            )}
        />
    );
};
