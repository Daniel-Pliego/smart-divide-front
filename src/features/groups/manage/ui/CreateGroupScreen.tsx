import { useAppToast } from "@/shared/hooks";
import { useCreateGroupState } from "../hooks";
import GroupForm from "./components/GroupForm";

export const CreateGroupScreen = () => {
    const { showToast } = useAppToast();
    const { handleSubmit, ...formState } = useCreateGroupState({
        showToast,
    });

    return <GroupForm {...formState} onSubmit={handleSubmit} />;
};
