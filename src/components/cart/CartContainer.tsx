"use client";

import { useCartStore } from "@/lib/store/cart";
import React from "react";
import CartItem from "./CartItem";
import Summary from "./Summary";

type Props = {};

export default function CartContainer({}: Props) {
  const { products } = useCartStore((store) => store);
  return (
    <div>
      {products.length === 0 && (
        <div className="text-center min-h-[80vh] flex items-center justify-center">
          <p>Pas de produit</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="container mx-auto flex flex-col lg:flex-row gap-2">
          <div className="flex-1">
            {products.map((p) => {
              return <CartItem key={p.id} data={p} />;
            })}
          </div>
          <Summary />
        </div>
      )}
    </div>
  );
}
