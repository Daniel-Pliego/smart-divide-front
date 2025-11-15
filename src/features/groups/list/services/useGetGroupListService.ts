import { GroupInfoResume } from "@/features/groups/list/types";
import { GROUP_LIST_ITEMS } from "@/features/groups/mock";

export const useGetGroupListService = () => {
    return {
        groupListItems: GROUP_LIST_ITEMS as GroupInfoResume[],
    };
};
