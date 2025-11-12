import { HStack } from "@gluestack/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@gluestack/input";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

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
        setSelectedFilter(value);
        filterAction(value);
        handleSearch(searchTerm);
    };

    return (
        <>
            <Input className="bg-gray-100 border-0 h-12 rounded-lg">
                <InputSlot className="pl-3">
                    <InputIcon as={() => <SearchIcon color="#7e22ce" strokeWidth={1.5} />} />
                </InputSlot>
                <InputField
                    placeholder="Busca por el nombre del grupo..."
                    enterKeyHint="search"
                    className="text-slate-900"
                    onChangeText={setSearchTerm}
                />
            </Input>

            <HStack className="gap-2 mt-4">
                {filterOptions.map(({ label, value }) => (
                    <Pressable
                        key={value as string}
                        className={`p-1 px-4 ${
                            selectedFilter === value ? "bg-purple-700" : "bg-gray-200"
                        } rounded-full`}
                        onPress={() => handleFilter(value)}
                    >
                        <Text
                            className={`${
                                selectedFilter === value ? "text-white" : "text-gray-700"
                            }`}
                        >
                            {label}
                        </Text>
                    </Pressable>
                ))}
            </HStack>
        </>
    );
};
