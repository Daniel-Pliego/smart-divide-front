import { useGetGroupsService } from "@/modules/groups/services";
import { GroupListItem } from "@/modules/groups/types";
import { useEffect, useState } from "react";
import { GroupFilterType } from "../constants/FilterOptions";

export const useGroupsState = () => {
    const { groupListItems } = useGetGroupsService();
    const [filteredGroups, setFilteredGroups] = useState<GroupListItem[]>(groupListItems);
    const [balance, setBalance] = useState({
        totalDebts: 0,
        totalCredits: 0,
    });

    useEffect(() => {
        let totalCredits = 0;
        let totalDebts = 0;
        groupListItems.forEach((group) => {
            totalCredits += group.totalCredits;
            totalDebts += group.totalDebts;
        });

        setBalance({ totalCredits, totalDebts });
    }, [groupListItems]);

    const handleFilter = (type: GroupFilterType) => {
        if (type === "all") {
            setFilteredGroups(groupListItems);
            return;
        }

        setFilteredGroups(groupListItems.filter((group) => group[type] > 0));
    };

    const handleSearch = (value: string) => {
        if (!value) {
            setFilteredGroups(groupListItems);
            return;
        }

        setFilteredGroups((prev) =>
            prev.filter((group) => group.name.toLowerCase().includes(value.trim().toLowerCase()))
        );
    };

    return {
        groupListItems: filteredGroups,
        handleFilter,
        userBalance: balance,
        handleSearch,
    };
};
