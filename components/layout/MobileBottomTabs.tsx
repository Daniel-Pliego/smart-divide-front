import { HStack } from "@/components/ui/hstack";
import { RelativePathString, useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { Icon } from "../ui/icon";

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
        router.push(`./${redirectTo}`);
    };

    return (
        <HStack className="content-center absolute bottom-0 justify-between w-full py-5 px-10 border-t-[1px] border-t-gray-300">
            {tabItems.map(({ label, redirectTo, icon: IconComponent }) => (
                <Pressable
                    key={label}
                    className="flex flex-col items-center"
                    onPress={() => {
                        handlePressTab(redirectTo as RelativePathString);
                    }}
                >
                    <Icon
                        as={IconComponent}
                        className={`w-8 h-8 mb-1 ${
                            currentRoute === redirectTo ? "text-indigo-600" : "text-gray-500"
                        }`}
                    />
                    <Text
                        key={label}
                        className={`text-sm font-semibold ${
                            currentRoute === redirectTo ? "text-indigo-600" : "text-gray-500"
                        }`}
                    >
                        {label}
                    </Text>
                </Pressable>
            ))}
        </HStack>
    );
};
