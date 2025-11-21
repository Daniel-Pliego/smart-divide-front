import { Box } from "@/lib/gluestack-ui/ui/box";
import { Fab, FabIcon, FabLabel } from "@/lib/gluestack-ui/ui/fab";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { AddIcon } from "@/lib/gluestack-ui/ui/icon";
import { Text } from "@/lib/gluestack-ui/ui/text";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { EmptyState, ScreenLayout } from "@/shared/components";
import WithoutGroups from "@assets/without-groups.svg";
import { Link } from "expo-router";
import { useGetGroupList } from "../hooks";
import { GroupCard, GroupFilterSection, UserBalance } from "./components";
export default function GroupListScreen() {
    const { userBalance, handleFilter, groupListItems, handleSearch, hasGroups } =
        useGetGroupList();

    return (
        <>
            <ScreenLayout
                header={
                    <Box className="bg-purple-700 pb-7 px-5 pt-5">
                        <Text className="text-3xl text-white">Hola Diana Carolina</Text>
                        <Text className="text-base text-white mt-1">
                            ¡Bienvenida a Smart Divde!
                        </Text>

                        <UserBalance {...userBalance} />
                    </Box>
                }
            >
                <Box className="mt-7">
                    <HStack className="justify-between items-center mb-3">
                        <Text className="text-xl font-semibold text-slate-900">
                            Revisa tus grupos
                        </Text>
                    </HStack>
                    <GroupFilterSection handleFilter={handleFilter} handleSearch={handleSearch} />

                    {hasGroups && (
                        <VStack className="gap-5 mt-5">
                            {groupListItems.map((groupInfo) => (
                                <GroupCard key={groupInfo.id} groupInfoResume={groupInfo} />
                            ))}
                        </VStack>
                    )}

                    {groupListItems.length === 0 && hasGroups&& (
                        <Text className="text-lg text-slate-900">
                            No se han encontrado resultados
                        </Text>
                    )}

                    <EmptyState
                        title="¡Aún no tienes grupos!"
                        url="/sections/group/create"
                        image={<WithoutGroups width={200} height={200} />}
                        buttonText="Crea un nuevo grupo"
                        show={!hasGroups}
                    />
                </Box>
            </ScreenLayout>

            {hasGroups && (
                <Link href="/sections/group/create" asChild>
                    <Fab
                        placement="bottom right"
                        isHovered={false}
                        isDisabled={false}
                        isPressed={false}
                        className="absolute bottom-5 right-5 bg-purple-700"
                    >
                        <FabIcon as={AddIcon} size="xl" />
                        <FabLabel className="font-medium">Crear Grupo</FabLabel>
                    </Fab>
                </Link>
            )}
        </>
    );
}
