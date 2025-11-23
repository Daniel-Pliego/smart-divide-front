import {
    DivisionType,
    Expense,
    ExpenseForm,
    ExpenseParticipant,
    ParticipanRequest,
} from "../types";

export const mapFormToModel = (expenseForm: ExpenseForm): Expense => {
    return {
        type: expenseForm.type,
        description: expenseForm.description,
        divisionType: expenseForm.divisionType.toUpperCase() as DivisionType,
        amount: Number(expenseForm.amount),
        participants: mapParticipanFormToModel(expenseForm.participants),
        payers: mapParticipanFormToModel(expenseForm.payers),
        evidenceUrl: "",
    };
};

export const mapParticipanFormToModel = (
    participans: ExpenseParticipant[]
): ParticipanRequest[] => {
    return participans.map((p) => {
        return {
            userId: p.userId,
            amount: Number(p.amountPaid),
        };
    });
};
