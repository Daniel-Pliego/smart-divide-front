import { GroupFilterType, GROUPS_FILTER_OPTIONS } from "@/features/groups/list/config";
import { Filters } from "@/shared/components";

interface GroupFilterSectionProps {
    handleFilter: (value: GroupFilterType) => void;
    handleSearch: (value: string) => void;
}

export const GroupFilterSection = ({ handleFilter, handleSearch }: GroupFilterSectionProps) => {
    return (
        <Filters
            filterOptions={GROUPS_FILTER_OPTIONS}
            defaultFilter="all"
            handleFilter={handleFilter}
            handleSearch={handleSearch}
        />
    );
};
