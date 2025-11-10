import { GROUP_LIST_ITEMS } from "@/modules/groups/mock/groupListItems";
import { GroupFormData } from "@/modules/groups/types";

let id = 1;

export const useCreateGroupsService = () => {
    return {
        saveGroup: (group: GroupFormData) => {
            const { name, type } = group;

            id += 1;
            GROUP_LIST_ITEMS.push({
                id: group.name + id,
                name,
                type,
                totalCredits: 0,
                totalDebts: 0,
                ownerId: "ui-2",
            });
        },
    };
};
