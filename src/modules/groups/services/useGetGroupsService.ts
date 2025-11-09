import { GROUP_LIST_ITEMS } from "@/src/modules/groups/mock/groupListItems";
import { GroupListItem } from "@/src/modules/groups/types";
export const useGetGroupsService = () => {
    return {
        groupListItems: GROUP_LIST_ITEMS as GroupListItem[],
    };
};
