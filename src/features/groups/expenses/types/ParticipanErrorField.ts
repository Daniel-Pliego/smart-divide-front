import { FieldError, FieldErrorsImpl } from "react-hook-form";
import { ExpenseParticipant } from "./ExpenseParticipant";

export type ParticipanErrorField =
    | (FieldErrorsImpl<ExpenseParticipant> & {
          _sum?: FieldError;
      })[]
    | { _sum?: FieldError };