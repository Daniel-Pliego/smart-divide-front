import { GroupForm } from "@/src/modules/groups/components";
import { useCreateGroupState } from "@/src/modules/groups/hooks";

export const CreateGroup = () => {
    const formState = useCreateGroupState();

    return <GroupForm {...formState} />;
};

export default CreateGroup;
