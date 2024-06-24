"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: string;
};

export default function Actions({ product }: Props) {
  const currentProduct = JSON.parse(product);

  const { addToCart, products } = useCartStore((store) => store);

  return (
    <Button
      disabled={products.some((p) => p.id === currentProduct.id)}
      onClick={() => {
        addToCart(currentProduct);
        toast.success("Produit ajouté au panier");
      }}
    >
      {products.some((p) => p.id === currentProduct.id)
        ? "Produit ajouté au panier"
        : "Ajouter au panier"}
    </Button>
  );
}
