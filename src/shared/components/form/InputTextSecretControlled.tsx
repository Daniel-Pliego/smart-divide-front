import { Input, InputField } from "@gluestack/input";
import { Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Pressable } from "react-native";
import { InputWrapperController } from "./InputWrapperController";
import { InputProps } from "./types";

export const InputTextSecretControlled = <T extends FieldValues>(props: InputProps<T>) => {
    const { error, ...rest } = props;
    const [isSecret, setIsSecret] = useState(true);
    return (
        <InputWrapperController
            {...props}
            InputComponent={({ value, onChange }) => (
                <Input
                    className={`${
                        !error ? "border-0" : "border"
                    }  h-14 py-3 px-2 bg-gray-100 rounded-lg shadow-gray-200 elevation-sm`}
                >
                    <InputField
                        className="text-lg"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={isSecret}
                        {...rest}
                    />
                    <Pressable onPress={() => setIsSecret(!isSecret)} className="p-2">
                        {isSecret ? (
                            <Eye size={20} color="gray" />
                        ) : (
                            <EyeClosed size={20} color="gray" />
                        )}
                    </Pressable>
                </Input>
            )}
        />
    );
};
