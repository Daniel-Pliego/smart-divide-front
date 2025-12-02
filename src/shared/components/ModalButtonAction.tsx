import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { Heading } from "@/lib/gluestack-ui/ui/heading";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@/lib/gluestack-ui/ui/modal";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { useState } from "react";
import { Pressable } from "react-native";

interface ModalButtonActionProps {
    title: string;
    message: string;
    icon: React.ReactElement;
    confirm: () => void;
    actionButton: React.ReactElement
    confirmText: string
}

export function ModalButtonAction({ icon, title, message, confirm, actionButton, confirmText }: ModalButtonActionProps) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Pressable onPress={() => setShowModal(true)}>
                {actionButton}
            </Pressable>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalBackdrop />
                <ModalContent className="items-center">
                    <ModalHeader className="mb-2">
                        {icon}
                    </ModalHeader>
                    <ModalBody className="mb-4">
                        <Heading size="md" className="text-slate-900s text-center">
                            {title}
                        </Heading>
                        <Text className="text-slate-700 text-center">
                            {message}
                        </Text>
                    </ModalBody>
                    <ModalFooter className="w-full mt-1">
                        <Button
                            variant="outline"
                            action="secondary"
                            size="sm"
                            onPress={() => {
                                setShowModal(false);
                            }}
                            className="flex-grow bg-gray-200"
                        >
                            <ButtonText className="text-slate-700">Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={() => {
                                confirm();
                                setShowModal(false);
                            }}
                            size="sm"
                            className="flex-grow bg-purple-700"
                        >
                            <ButtonText>{confirmText}</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
