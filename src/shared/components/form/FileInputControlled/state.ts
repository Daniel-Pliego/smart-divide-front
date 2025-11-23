import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

const imageConfig: ImagePicker.ImagePickerOptions = {
    quality: 0.8,
    allowsEditing: true,
    mediaTypes: ["images"],
};

export const useFileInputControlledState = ({ onChange }: { onChange: (value: any) => void }) => {
    const [open, setOpen] = useState(false);

    const handleCancel = (res: ImagePicker.ImagePickerResult) => {
        if (!res.canceled) onChange(res.assets[0]);
        setOpen(false);
    };

    const handleAccess = async (
        requestPermissionsFunction: Function,
        launchHandlerFunction: Function
    ) => {
        const perm = await requestPermissionsFunction();
        if (!perm.granted) return alert("Permiso denegado");
        const res = await launchHandlerFunction(imageConfig);
        handleCancel(res);
    };

    const openGallery = async () => {
        await handleAccess(
            ImagePicker.requestMediaLibraryPermissionsAsync,
            ImagePicker.launchImageLibraryAsync
        );
    };

    const openCamera = async () => {
        await handleAccess(ImagePicker.requestCameraPermissionsAsync, ImagePicker.launchCameraAsync);
    };

    return {
        openCamera,
        openGallery,
        setOpen,
        open,
    };
};
