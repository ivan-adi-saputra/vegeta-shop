import BaseResponse from "@/types/response";
import { Checkout } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CheckoutResponse extends BaseResponse {
  data: Checkout;
}

interface CheckoutPayload {
  product_id: string;
  qty: number;
}

export const transactionAPI = createApi({
  reducerPath: "transactionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["transaction"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckoutMutation } = transactionAPI;
