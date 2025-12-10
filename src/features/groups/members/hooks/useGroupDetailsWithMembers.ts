import { getAuthStore } from "@/features/auth/utils";
import { useEffect, useState } from "react";
import { useGetGroupMembers } from "./useGetGroupMembers";

export default function useGroupDetailsWithMembers(ownerId: string, groupId: string) {
    const { groupMembers } = useGetGroupMembers(groupId);
    const owner = groupMembers.find((member) => member.userId === ownerId);
    const members = groupMembers.filter((member) => member.userId !== ownerId);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            const auth = await getAuthStore();
            setIsOwner(ownerId === auth?.userId);
        };
        init();
    }, [isOwner]);

    return {
        owner,
        members,
        isOwner
    };
}
