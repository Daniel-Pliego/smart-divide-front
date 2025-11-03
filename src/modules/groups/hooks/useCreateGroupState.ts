import { useCreateGroupsService } from "@/src/modules/groups/services";
import { useAppToast } from "@/src/shared/hooks";
import { useRouter } from "expo-router";
import { GroupFormData } from "../types";

export const useCreateGroupState = () => {
    const { saveGroup } = useCreateGroupsService();
    const { showToast } = useAppToast();
    const router = useRouter();

    const onSubmit = (group: GroupFormData) => {
        saveGroup(group);
        showToast("¡Grupo creado exitosamente!", "success");
        setTimeout(() => {
            router.push("/(pages)/group");
        }, 2000);
    };

    return {
        onSubmit,
        router,
        mode: "create",
    };
};
