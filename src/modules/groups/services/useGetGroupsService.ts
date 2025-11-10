import { GROUP_LIST_ITEMS } from "@/modules/groups/mock/groupListItems";
import { GroupListItem } from "@/modules/groups/types";
export const useGetGroupsService = () => {
    return {
        groupListItems: GROUP_LIST_ITEMS as GroupListItem[],
    };
};
