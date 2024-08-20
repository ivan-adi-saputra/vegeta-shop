"use client";

import React from "react";
import { Product } from "@prisma/client";

// components
import ProductCheckout from "@/components/product-checkout/product-checkout";

interface ProductCheckoutProps {
  products: {
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

function ItemList({ products = [] }: ProductCheckoutProps) {
  return (
    <>
      <div className="text-lg font-semibold">Barang yang dibeli</div>

      {products.map((product, index) => (
        <ProductCheckout
          key={`productCheckout${index}`}
          productDetails={product.product}
          onDeleteItem={() => {
            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
          }}
          onChangeItemCount={(count) => {
            const updatedProducts = [...products];
            updatedProducts[index].qty = count;
          }}
          qty={product.qty}
        />
      ))}
    </>
  );
}

export default ItemList;
