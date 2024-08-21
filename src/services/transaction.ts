import BaseResponse from "@/types/response";
import { Checkout } from "@prisma/client";
import { Product } from "@prisma/client";
import { DeliveryType } from "@prisma/client";
import { Transaction } from "@prisma/client";
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

interface PaymentPayload {
  application_fee: number;
  asurance_fee: number;
  delivery_fee: number;
  delivery_type: DeliveryType;
}

interface PaymentResponse extends BaseResponse {
  data: Transaction;
}

interface HistoryParams {
  page?: number | undefined;
}

interface CheckoutWithProduct {
  id: string;
  userId: string;
  productId: string;
  transactionId: string;
  qty: number;
  pricePerItem: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface TransactionWithCheckout {
  id: string;
  userId: string;
  totalPrice: number;
  deliveryFee: number;
  asuranceFee: number;
  applicationFee: number;
  grandTotalPrice: number;
  deliveryType: DeliveryType;
  createdAt: Date;
  updatedAt: Date;
  Checkout: CheckoutWithProduct[];
}

interface HistoryResponse extends BaseResponse {
  data: {
    data: TransactionWithCheckout[];
    total: number;
  };
}

export const transactionAPI = createApi({
  reducerPath: "transactionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["checkout", "transaction"],
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
    payment: builder.mutation<PaymentResponse, PaymentPayload>({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["transaction"],
    }),
    history: builder.query<HistoryResponse, HistoryParams>({
      query: () => ({
        url: "/history",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useCheckoutsQuery,
  usePaymentMutation,
  useHistoryQuery,
} = transactionAPI;
