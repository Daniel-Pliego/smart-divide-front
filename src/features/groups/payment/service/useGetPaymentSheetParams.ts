import { apiClient } from "@/features/config/api";
import { ResponseWrapper } from "@/features/config/types";
import { useMutation } from "@tanstack/react-query";
import { PaymentSheetParams } from "../types/PaymentSheetParams";

interface CreatePaymentIntentPayload {
  groupId: string;
  fromUser: string;
  toUser: string;
  amount: number;
}

export function useGetPaymentSheetsParamsService() {
  return useMutation({
    mutationFn: async ({
      groupId,
      ...payload
    }: CreatePaymentIntentPayload) => {
      const response =
        await apiClient.post<ResponseWrapper<PaymentSheetParams>>(
          `/stripe/${groupId}/paymentIntent`,
          payload
        );

      return response.data.body;
    },
  });
}
