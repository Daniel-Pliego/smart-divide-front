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

        const payerIds = new Set(data.payers.map(p => p.userId));
        const hasOtherParticipants = data.participants.some(p => !payerIds.has(p.userId));

        if (!hasOtherParticipants) {
            ctx.addIssue({
                code: "custom",
                message: "Debe haber al menos un participante diferente a quienes pagaron el gasto",
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
