import { ParticipantInfo } from "../../expenses/types/ExpenseDetails"


export type UserBalance = {
    creditor: ParticipantInfo, 
    debtor: ParticipantInfo, 
    amount: number
}

export type Debts = {
    balances: UserBalance[]
}