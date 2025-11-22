import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
} from "@/lib/gluestack-ui/ui/actionsheet";
import { Button, ButtonIcon } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { Camera, ImagePlus, Images, SquareX, Trash } from "lucide-react-native";
import React from "react";
import { Image, Pressable } from "react-native";
import { useFileInputControlledState } from "./state";

export const FileInput = ({ value, onChange }: { value: any; onChange: (file: any) => void }) => {
    const { setOpen, openCamera, openGallery, open } = useFileInputControlledState({ onChange });

    return (
        <>
            <HStack
                className={`bg-gray-100 shadow-gray-100 elevation-sm rounded-lg py-3 ${
                    value?.uri ? "px-3" : "px-5"
                } w-full h-auto justify-between items-center`}
            >
                {!value?.uri && (
                    <Pressable
                        onPress={() => setOpen(true)}
                        className="flex flex-row w-full justify-between items-center"
                    >
                        <Text className="text-lg text-gray-500">Agregar evidencia</Text>
                        <Icon as={ImagePlus} className="text-gray-900 w-7 h-7" />
                    </Pressable>
                )}
                {value?.uri && (
                    <>
                        <Image
                            source={{ uri: value.uri }}
                            style={{ width: "100%", height: 120, borderRadius: 8 }}
                        />
                        <Button
                            className="aspect-square bg-red-500 rounded-full absolute top-2 right-2"
                            onPress={() => onChange(undefined)}
                        >
                            <ButtonIcon as={Trash} />
                        </Button>
                    </>
                )}
            </HStack>

            <Actionsheet isOpen={open} onClose={() => setOpen(false)}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>

                    <Text className="text-lg font-semibold text-slate-900">
                        Seleccionar evidencia
                    </Text>
                    <HStack className="p-4 pb-10 gap-5">
                        <Pressable
                            onPress={openCamera}
                            className="flex flex-col justify-center items-center p-3 bg-gray-100 rounded-lg shadow-lg"
                        >
                            <Icon as={Camera} className="text-violet-500 w-8 h-8" />
                            <Text className="text-slate-900 mt-1">Cámara</Text>
                        </Pressable>

                        <Pressable
                            onPress={openGallery}
                            className="flex flex-col justify-center items-center p-3 bg-gray-100 rounded-lg shadow-lg"
                        >
                            <Icon as={Images} className="text-violet-500 w-8 h-8" />
                            <Text className="text-slate-900 mt-1">Galería</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOpen(false)}
                            className="flex flex-col justify-center items-center p-3 bg-gray-100 rounded-lg shadow-lg"
                        >
                            <Icon as={SquareX} className="text-red-500 w-8 h-8" />
                            <Text className="text-slate-900 mt-1">Cancelar</Text>
                        </Pressable>
                    </HStack>
                </ActionsheetContent>
            </Actionsheet>
        </>
    );
};
