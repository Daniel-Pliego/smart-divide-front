import { getAuthStore } from "@/features/auth/utils";
import { useAppToast } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useGetFriendsService } from "../services/useGetFriendsService";
import { FriendFormSchema, FriendsForm } from "../types/FriendsForm";
import { useAddFriendService } from "./../services/useAddFriendService";

const errorStatusMessages: Record<number, string> = {
    404: "No se ha encontrado al usuario",
    409: "Ya tienes una solicitud de amistad con el usuario",
};

export function useFriendsScreen() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(FriendFormSchema),
        defaultValues: {
            friendId: "",
        },
    });

    const { showToast } = useAppToast();

    const onSuccess = () => {
        showToast("¡Solicitud de amistad enviada!", "success");
        reset({ friendId: "" });
    };

    const onError = (error: AxiosError) => {
        const status = error.response?.status;
        console.log(error.response?.data)
        const errorMessage =
            errorStatusMessages[status || 0] ||
            "Oops! Ha ocurrido un error. Por favor, intente de nuevo.";
        showToast(errorMessage, "error");
    };

    const addFriend = useAddFriendService({ onSuccess, onError });

    const onSubmit = async (data: FriendsForm) => {
        const authStore = await getAuthStore();
        addFriend.mutate({
            friendId: data.friendId,
            requesterId: authStore?.userId!,
        });
    };

    const { data: friends, isLoading } = useGetFriendsService();

    return {
        handleSubmit,
        control,
        errors,
        isSubmitting,
        friends,
        isLoading,
        onSubmit,
    };
}
