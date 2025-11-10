import { GroupForm } from "@/modules/groups/components";
import { useCreateGroupState } from "@/modules/groups/hooks";

const CreateGroupPage = () => {
    const formState = useCreateGroupState();

    return (
        <>
            <GroupForm {...formState} />
        </>
    );
};

export default CreateGroupPage;
