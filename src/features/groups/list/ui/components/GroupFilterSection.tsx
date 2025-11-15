import {
    GroupFilterType,
    GROUPS_FILTER_OPTIONS,
} from "@/features/groups/list/config";
import { Button, ButtonIcon, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Filters } from "@/shared/components";
import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import { Text } from "react-native";

interface GroupFilterSectionProps {
    handleFilter: (value: GroupFilterType) => void;
    handleSearch: (value: string) => void;
}

export const GroupFilterSection = ({ handleFilter, handleSearch }: GroupFilterSectionProps) => {
    return (
        <>
            <HStack className="justify-between items-center mb-3">
                <Text className="text-xl font-semibold text-slate-900">Revisa tus grupos</Text>
                <Link href="/sections/group/create" asChild>
                    <Button className="rounded-full bg-purple-700 px-2">
                        <ButtonIcon as={Plus} className="w-5 -mr-2" />
                        <ButtonText className="text-sm">Crear grupo</ButtonText>
                    </Button>
                </Link>
            </HStack>
            <Filters
                filterOptions={GROUPS_FILTER_OPTIONS}
                defaultFilter="all"
                handleFilter={handleFilter}
                handleSearch={handleSearch}
            />
        </>
    );
};
