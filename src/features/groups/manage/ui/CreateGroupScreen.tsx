import { useAppToast } from "@/shared/hooks";
import { useRouter } from "expo-router";
import { useCreateGroup } from "../hooks";
import GroupForm from "./components/GroupForm";

export const CreateGroupScreen = () => {
    const router = useRouter();
    const { showToast } = useAppToast();

    const onSuccess = () => {
         setTimeout(() => {
            showToast("¡Grupo creado exitosamente!", "success");
            router.navigate("/(tabs)/group");
        }, 1000);
    };

    const onError = () => {};

    const { saveGroup: onSubmit, ...formState } = useCreateGroup({
        userId: "userId_1",
        onSuccess,
        onError,
    });

    return <GroupForm {...formState} onSubmit={onSubmit} />;
};
