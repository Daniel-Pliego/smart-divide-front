import { CloseIcon, Icon } from "@/lib/gluestack-ui/ui/icon";
import { Image } from "@/lib/gluestack-ui/ui/image";
import { Modal, ModalBackdrop, ModalCloseButton, ModalContent } from "@/lib/gluestack-ui/ui/modal";
import React, { useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
    imageUrl: string;
}

const { width, height } = Dimensions.get("window");

export const ImagePreviewModal = ({ imageUrl }: Props) => {
    const [open, setOpen] = useState(false);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = Math.max(0.8, Math.min(e.scale, 4));
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withSpring(1);
            }
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            scale.value = scale.value > 1 ? withSpring(1) : withSpring(2);
        });

    return (
        <>
            <Pressable onPress={() => setOpen(true)}>
                <Image
                    className="h-96 w-full rounded-xl shadow-lg"
                    resizeMode="cover"
                    source={{ uri: imageUrl }}
                    alt="Expense evidence"
                />
            </Pressable>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ModalBackdrop />

                <ModalContent className="bg-black w-full h-full border-0">
                    <ModalCloseButton className="absolute top-20 right-6 z-50">
                        <Icon as={CloseIcon} className="text-white w-7 h-7" />
                    </ModalCloseButton>

                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <GestureDetector gesture={Gesture.Simultaneous(doubleTap, pinchGesture)}>
                            <Animated.View style={{ flex: 1 }}>
                                <Animated.Image
                                    source={{ uri: imageUrl }}
                                    resizeMode="contain"
                                    style={[
                                        {
                                            width: width,
                                            height: height,
                                        },
                                        animatedStyle,
                                    ]}
                                />
                            </Animated.View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </ModalContent>
            </Modal>
        </>
    );
};
