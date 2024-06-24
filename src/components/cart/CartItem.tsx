"use client";

import { useCartStore } from "@/lib/store/cart";
import { Product } from "@/types/product.model";
import { X } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { Button } from "../ui/button";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { addToCart, removeFromCart, clearCart, products } = useCartStore(
    (store) => store
  );

  const onRemove = () => {
    removeFromCart(data);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0]}
          alt={data.title}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button onClick={onRemove}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <Link
              href={`/products/${data.id}`}
              className="sm:text-lg font-semibold text-black line-clamp-2"
            >
              {data.title}
            </Link>
          </div>

          <div className="mt-1 text-sm">
            <p className="text-gray-500 sm:text-center capitalize">
              {data.category}
            </p>
          </div>

          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data.price)}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
