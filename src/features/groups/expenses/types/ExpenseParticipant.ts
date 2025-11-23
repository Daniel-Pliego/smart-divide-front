import { NumberSchema } from "@/shared/components/form/types";
import z from "zod";

export const expenseParticipantSchema = z.object({    
    userId: z.string().nonempty("El participante es requerido"),
    amountPaid: NumberSchema
});

export type ExpenseParticipant = z.infer<typeof expenseParticipantSchema>;

export type ParticipanRequest = {
    userId: string, 
    amount: number
}