import { HStack } from "@gluestack/hstack";
import { Icon } from "@gluestack/icon";
import { RelativePathString, useRouter } from "expo-router";
import { type LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";

interface MobileBottomTabsProps {
    tabItems: {
        label: string;
        redirectTo: string;
        icon: LucideIcon;
    }[];
    initialRoute: string;
}

export const MobileBottomTabs = ({ tabItems, initialRoute }: MobileBottomTabsProps) => {
    const router = useRouter();
    const [currentRoute, setCurrentRoute] = useState<string>(initialRoute);

    const handlePressTab = (redirectTo: RelativePathString) => {
        setCurrentRoute(redirectTo as string);
        router.push(`/${redirectTo}` as RelativePathString);
    };

    return (
        <HStack
            className="content-center absolute bottom-0 justify-between w-full py-2 pb-3 px-12 bg-white rounded-full"
        >
            {tabItems.map(({ label, redirectTo, icon: IconComponent }) => (
                <Pressable
                    key={label}
                    className={`flex flex-col items-center py-1 px-3`}
                    onPress={() => {
                        handlePressTab(redirectTo as RelativePathString);
                    }}
                >
                    <Icon
                        as={() => (
                            <IconComponent
                                strokeWidth={1.7}
                                color={currentRoute === redirectTo ? "#3730a3" : "#030712"}
                                width={35}
                            />
                        )}
                    />

                    <Text
                        key={label}
                        className={`text-base ${
                            currentRoute === redirectTo ? "text-indigo-800" : "text-gray-950"
                        }`}
                    >
                        {label}
                    </Text>
                </Pressable>
            ))}
        </HStack>
    );
};
