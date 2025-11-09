import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { SearchIcon, SlidersHorizontal } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

export interface FilterOption<T> {
    label: string;
    value: T;
}

interface FiltersProps<T> {
    handleSearch: (arg: string) => void;
    handleFilter: (type: T) => void;
    filterOptions: FilterOption<T>[];
    defaultFilter: T;
}

export const Filters = <T,>({
    handleSearch,
    handleFilter: filterAction,
    filterOptions,
    defaultFilter,
}: FiltersProps<T>) => {
    const [selectedFilter, setSelectedFilter] = useState<T>(defaultFilter);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch(searchTerm);
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchTerm, handleSearch]);

    const handleFilter = (value: T) => {
        setSelectedFilter(value)
        if (value === defaultFilter) {
            handleSearch("");
        }

        filterAction(value);
    };

    return (
        <HStack className="gap-2 items-center">
            <Input className="bg-white border-0 h-10 rounded-full shadow-gray-200 elevation-sm flex-1">
                <InputSlot className="pl-3 border-none">
                    <InputIcon as={() => <SearchIcon color="#4f46e5" strokeWidth={1.5} />} />
                </InputSlot>
                <InputField
                    placeholder="Busca por el nombre del grupo..."
                    enterKeyHint="search"
                    className="text-indigo-900"
                    onChangeText={setSearchTerm}
                />
            </Input>

            <Menu
                placement="bottom right"
                offset={10}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Pressable {...triggerProps} className="bg-indigo-600 rounded-2xl p-2 px-3">
                            <Icon as={SlidersHorizontal} className="text-white w-6 h-6" />
                        </Pressable>
                    );
                }}
                className="p-3"
            >
                {filterOptions.map(({ label, value }) => (
                    <MenuItem
                        key={label}
                        textValue={value as string}
                        className={`${
                            selectedFilter === value ? "bg-indigo-200" : ""
                        } text-gray-950 p-2`}
                        onPress={() => {handleFilter(value)}}
                    >
                        <MenuItemLabel
                            className={`text-base ${
                                selectedFilter === value ? "text-gray-950" : "text-gray-500"
                            } `}

                        >
                            {label}
                        </MenuItemLabel>
                    </MenuItem>
                ))}
            </Menu>
        </HStack>
    );
};
