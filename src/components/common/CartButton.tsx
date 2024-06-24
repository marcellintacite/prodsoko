"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";

const CartButton = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { products } = useCartStore((store) => store);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Button
      onClick={() => router.push("/cart")}
      size="sm"
      className="gap-x-1"
      variant="outline"
      aria-label={`${10}-items-in-cart`}
    >
      <ShoppingCart className="w-4 h-4" />
      {products.length > 0 && (
        <span className="text-xs">{products.length}</span>
      )}
    </Button>
  );
};

export default CartButton;
