import { useAppToast } from "@/shared/hooks";
import { useLocalSearchParams } from "expo-router";
import { useGetGroupMembers } from "../../members/hooks";
import { useCreateExpense } from "../hooks";
import { ExpenseFormComponent } from "./components";

export default function CreateExpenseScreen() {
    const { groupId } = useLocalSearchParams();
    const { transformedValues: groupMembers } = useGetGroupMembers(groupId as string);
    const { showToast } = useAppToast();
    const { handleSubmit, isPending } = useCreateExpense({
        showToast,
        groupId: groupId as string,
    });

    return <ExpenseFormComponent onSubmit={handleSubmit} groupMembers={groupMembers} isSubmitting={isPending} />;
}
