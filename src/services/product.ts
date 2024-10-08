import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductResponse extends BaseResponse {
  data: {
    total: number;
    data: Product[];
  };
}

interface ProductByIdResponse extends BaseResponse {
  data: Product;
}

interface ProductParams {
  page?: string | undefined;
  category?: string | undefined;
  min_price?: string | undefined;
  max_price?: string | undefined;
  rating?: string | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<ProductResponse, ProductParams>({
      query: ({ page, category, min_price, max_price, rating }) => ({
        url: "/",
        params: {
          page,
          category,
          min_price,
          max_price,
          rating,
        },
      }),
    }),
    getProductById: builder.query<ProductByIdResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        params: {
          id,
        },
      }),
    }),
  }),
});

export const { useGetAllProductQuery, useGetProductByIdQuery } = productApi;
