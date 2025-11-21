import { useEffect, useMemo, useState } from "react";
import { GroupFilterType } from "../config/filtersOptions";
import { useGetGroupListService } from "../services/useGetGroupListService";

export const useGetGroupList = () => {
    const { data, isLoading, isError } = useGetGroupListService();

    const groupListItems = data?.body || [];

    const [filterType, setFilterType] = useState<GroupFilterType>("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [balance, setBalance] = useState({
        totalDebts: 0,
        totalCredits: 0,
    });

    const filteredGroups = useMemo(() => {
        let groups = [...groupListItems];

        if (filterType !== "all") {
            groups = groups.filter((group) => group[filterType] > 0);
        }

        if (searchTerm) {
            groups = groups.filter((group) =>
                group.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
        }

        return groups;
    }, [groupListItems, filterType, searchTerm]);

    useEffect(() => {
        let totalCredits = 0;
        let totalDebts = 0;

        groupListItems.forEach((group) => {
            totalCredits += group.totalCredits;
            totalDebts += group.totalDebts;
        });

        setBalance({ totalCredits, totalDebts });
    }, [groupListItems]);

    return {
        groupListItems: filteredGroups,
        handleFilter: setFilterType,
        userBalance: balance,
        handleSearch: setSearchTerm,
        hasGroups: groupListItems.length > 0,
    };
};
