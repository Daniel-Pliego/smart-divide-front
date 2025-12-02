export type ParticipantInfo = {
  userId: string;
  name: string;
  lastName: string;
  photoUrl: string;
};

export type PaidBy = {
  participant: ParticipantInfo;
  amount: number;
};

export type Distribution = {
  participant: ParticipantInfo;
  amount: number;
};

export type PayerBalance = {
  participant: ParticipantInfo;
  amountPaid: number;
  amountBorrowed: number;
};

export type DebtorBalance = {
  participant: ParticipantInfo;
  amount: number;
};

export type Balance = {
  payer: PayerBalance;
  debtors: DebtorBalance[];
};

export type ExpenseDetails = {
  id: string;
  type: string;
  description: string;
  amount: number;
  createdAt: string;
  evidenceUrl: string;
  paidBy: PaidBy[];
  distribution: Distribution[];
  balances: Balance[];
};
