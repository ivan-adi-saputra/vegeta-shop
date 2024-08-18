import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductResponse extends BaseResponse {
  data: {
    total: number;
    data: Product[];
  };
}

interface ProductParams {
  page?: string | undefined;
  category?: string | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<ProductResponse, ProductParams>({
      query: ({ page, category }) => ({
        url: "/",
        params: {
          page,
          category,
        },
      }),
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
