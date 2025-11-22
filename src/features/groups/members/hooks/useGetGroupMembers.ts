import { GroupMember } from "../types";
import { useGetGroupMembersService } from "./../services/useGetGroupMembersService";

export const useGetGroupMembers = (groupId: string) => {
    const {
        data: groupMembers = [],
        isLoading,
        error,
        isError,
    } = useGetGroupMembersService(groupId);

    return {
        groupMembers,
        transformedValues: groupMembers.map((groupMember: GroupMember) => ({
            value: groupMember.userId,
            label: `${groupMember.name} ${groupMember.lastName}`,
        })),
    };
};
