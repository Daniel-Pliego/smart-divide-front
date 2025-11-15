import { Box } from "@/lib/gluestack-ui/ui/box";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { ScreenLayout } from "@/shared/components";
import React from "react";
import { useGetGroupList } from "../hooks";
import { GroupCard, GroupFilterSection, UserBalance } from "./components";

export default function GroupListScreen() {
    const { userBalance, handleFilter, groupListItems, handleSearch } = useGetGroupList();
    return (
        <ScreenLayout
            header={
                <Box className="bg-purple-700 pb-7 px-5">
                    <Text className="text-3xl text-white">Hola Diana Carolina</Text>
                    <Text className="text-base text-white mt-1">¡Bienvenida a Smart Divde!</Text>

                    <UserBalance {...userBalance} />
                </Box>
            }
        >
            <Box className="mt-7">
                <GroupFilterSection handleFilter={handleFilter} handleSearch={handleSearch} />

                <VStack className="gap-5 mt-5">
                    {groupListItems.map((groupInfo) => (
                        <GroupCard key={groupInfo.id} groupInfoResume={groupInfo} />
                    ))}
                </VStack>
            </Box>
        </ScreenLayout>
    );
}
