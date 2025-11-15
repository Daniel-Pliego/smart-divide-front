import { useCreateGroupService } from "../services";
import { GroupFormData } from "../types/groupForm";

export interface useCreateGroup {
    onSuccess: () => void;
    onError: () => void;
    userId: string;
}

export const useCreateGroup = ({ onSuccess, onError, userId }: useCreateGroup) => {
    const { saveGroup } = useCreateGroupService(userId);

    const onSubmit = (group: GroupFormData) => {
        saveGroup(group);
        onSuccess();
    };

    return {
        saveGroup: onSubmit,
        mode: "create",
    };
};
