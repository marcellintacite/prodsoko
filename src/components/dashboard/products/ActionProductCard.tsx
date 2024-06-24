"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { Product } from "@/types/product.model";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ActionProductCard({ product }: Props) {
  const router = useRouter();

  const { addToCart, products } = useCartStore((store) => store);
  const handleAddCart = (product: Product) => {
    addToCart(product);
    toast.success("Produit ajouté avec succès");
  };

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className={buttonVariants({ variant: "outline" })}
      >
        Voir le produit
      </Link>
      <Button
        className="w-full"
        disabled={products.some((p) => p.id === product.id)}
        onClick={() => handleAddCart(product)}
      >
        <ShoppingCart size={20} />
      </Button>
    </>
  );
}
