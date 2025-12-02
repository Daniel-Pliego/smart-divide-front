import { ImageFileSchema, NumberSchema } from "@/shared/components/form/types";
import { z } from "zod";
import { DivisionType } from "./DivisionType";
import { expenseParticipantSchema, ParticipanRequest } from "./ExpenseParticipant";

export const ExpenseFormSchema = z
    .object({
        id: z.string().optional(),
        createdAt: z.string().optional(),
        description: z.string().min(1, "La descripción es requerida"),
        amount: NumberSchema,
        divisionType: z.enum(["equal", "custom"], "El tipo de división es requerido"),
        type: z.string(),
        payers: z
            .array(expenseParticipantSchema)
            .min(1, "El gasto debe de ser pagado por al menos una persona"),
        participants: z
            .array(expenseParticipantSchema)
            .min(1, "El gasto debe de ser distribuido entre al menos una persona"),
        evidence: ImageFileSchema.optional(),
    })
    .superRefine((data, ctx) => {
        const amount = Number(data.amount);

        const payersTotal = data.payers.reduce((acc, p) => acc + Number(p.amountPaid), 0);

        if (payersTotal !== amount) {
            ctx.addIssue({
                code: "custom",
                message: "La suma total debe ser igual al monto del gasto",
                path: ["payers", "_sum"],
            });
        }

        const participantsTotal = data.participants.reduce(
            (acc, p) => acc + Number(p.amountPaid),
            0
        );

        if (participantsTotal !== amount) {
            ctx.addIssue({
                code: "custom",
                message: "La suma total debe ser igual al monto del gasto",
                path: ["participants", "_sum"],
            });
        }

        const balances = new Map<string, number>();

        data.payers.forEach(p => {
            balances.set(p.userId, (balances.get(p.userId) || 0) + Number(p.amountPaid));
        });

        data.participants.forEach(p => {
            balances.set(p.userId, (balances.get(p.userId) || 0) - Number(p.amountPaid));
        });

        const everyoneHasZeroBalance = Array.from(balances.values()).every(balance => Math.abs(balance) < 0.001);

        if (everyoneHasZeroBalance) {
            ctx.addIssue({
                code: "custom",
                message: "El gasto debe generar una deuda para al menos un participante.",
                path: ["participants", "_sum"],
            });
        }


    });

export type ExpenseForm = z.infer<typeof ExpenseFormSchema>;

export type Expense = {
    id?: string;
    createdAt?: string;
    description: string;
    amount: number;
    divisionType: DivisionType;
    type: string;
    evidenceUrl: string;
    payers: ParticipanRequest[];
    participants: ParticipanRequest[];
}
