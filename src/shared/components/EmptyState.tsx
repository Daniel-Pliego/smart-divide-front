import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

interface EmptyStateProps {
    title: string;
    buttonText?: string;
    url?: any;
    image: React.ReactElement;
    show: boolean;
}

export const EmptyState = ({ title, buttonText, url, image, show }: EmptyStateProps) => {
    if (!show) {
        return null;
    }

    return (
        <VStack className="items-center justify-center mt-10">
            <Text className="text-2xl text-purple-700 font-semibold text-center mb-8">{title}</Text>
            {image}
            {
                url && (
                    <Link href={url} asChild className="mt-10">
                        <Button className="border-purple-700" size="lg" variant="outline">
                            <ButtonText className="text-purple-700">{buttonText}</ButtonText>
                        </Button>
                    </Link>)
            }
        </VStack>
    );
};
