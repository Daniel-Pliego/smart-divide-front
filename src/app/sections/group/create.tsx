import { GroupForm } from "@/modules/groups/components";
import { useCreateGroupState } from "@/modules/groups/hooks";

export default function GroupPage() {
    const { saveGroup: onSubmit, ...formState } = useCreateGroupState();

    return <GroupForm {...formState} onSubmit={onSubmit} />;
}
