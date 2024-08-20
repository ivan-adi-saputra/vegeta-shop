import BaseResponse from "@/types/response";
import { Checkout } from "@prisma/client";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CheckoutResponse extends BaseResponse {
  data: Checkout;
}

interface CheckoutPayload {
  product_id: string;
  qty: number;
}

interface CheckoutsResponse extends BaseResponse {
  data: {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    pricePerItem: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
  }[];
}

export const transactionAPI = createApi({
  reducerPath: "transactionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["checkout"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),
    checkouts: builder.query<CheckoutsResponse, void>({
      query: () => ({
        url: "/checkout",
      }),
      providesTags: ["checkout"], // ketika ada yang menambahkan data dengan checkout post maka checkout get otomatis ke update data terbaru tanpa memanggil ulang
    }),
  }),
});

export const { useCheckoutMutation, useCheckoutsQuery } = transactionAPI;
