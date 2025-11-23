import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExpenseForm, ExpenseFormSchema } from "../types";
import { splitAmountEqual } from "../utils";

export const useExpenseForm = () => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<ExpenseForm>({
        resolver: zodResolver(ExpenseFormSchema),
        defaultValues: {
            description: "",
            amount: "0",
            type: "other",
            payers: [
                {
                    userId: "",
                    amountPaid: "0",
                },
            ],
            participants: [
                {
                    userId: "",
                    amountPaid: "0",
                },
            ],
            evidence: undefined,
        },
        mode: "onChange",
    });

    const expenseType = watch("type");
    const expenseAmount = watch("amount");
    const participants = watch("participants");
    const divisionType = watch("divisionType");

    useEffect(() => {
        if (divisionType === "equal") {
            const result = splitAmountEqual(Number(expenseAmount), participants.length);
            result.forEach((amount, index) => {
                setValue(`participants.${index}.amountPaid`, amount.toString());
            });
            trigger("participants");
        }
    }, [divisionType, participants.length, expenseAmount, setValue, trigger]);

    return { control, handleSubmit, errors, isSubmitting, expenseType, divisionType };
};
