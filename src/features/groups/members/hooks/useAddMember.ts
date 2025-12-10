import { useGetFriendsService } from "@/features/friends/services/useGetFriendsService";
import { useAppToast } from "@/shared/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useAddMemberService } from "../services/useAddMemberService";
import { useGetGroupMembers } from "./useGetGroupMembers";

export default function useAddMember() {
    const { groupId } = useLocalSearchParams();
    const { data: friends = [] } = useGetFriendsService();
    const { groupMembers } = useGetGroupMembers(groupId as string);
    const { showToast } = useAppToast();
    const router = useRouter();

    const [memberSelected, setMemberSelected] = useState<string>("");

    const availableFriends = useMemo(() => {
        const memberIds = new Set(groupMembers.map((member) => member.userId));
        return friends.filter((friend) => !memberIds.has(friend.friendshipId));
    }, [friends, groupMembers]);

    const selectMember = (memberId: string) => {
        if (memberId == memberSelected) {
            setMemberSelected("");
            return;
        }
        setMemberSelected(memberId);
    };

    const onSuccess = () => {
        showToast("Miembro agregado con éxito");
        setTimeout(() => {
            router.back();
        }, 1000);
    };

    const onError = () => {
        showToast("Error al agregar al miembro");
    };

    const addMember = useAddMemberService({
        onSuccess,
        onError,
        groupId: groupId as string,
    });

    const onSubmit = () => {
        addMember.mutate({ memberId: memberSelected });
    };

    return {
        availableFriends,
        selectMember,
        memberSelected,
        onSubmit,
        isSubmitting: addMember.isPending,
    };
}
