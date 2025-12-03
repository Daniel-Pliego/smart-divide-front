import { NumberSchema } from "@/shared/components/form/types";
import z from "zod";

export const createPaymentSchema = (maxAmount: number) =>
    z.object({
        creditorId: z.string().min(1),
        debtorId: z.string().min(1),
        amount: NumberSchema.refine((val) => Number(val) <= maxAmount, {
            message: `El monto debe de ser menor o igual a ${maxAmount}`,
        }),
    })

export type CreatePaymentForm = z.infer<ReturnType<typeof createPaymentSchema>>;

export type CreatePaymentRequest = {
    amount: number;
    fromUserId: string;
    toUserId: string;
}