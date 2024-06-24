import CartContainer from "@/components/cart/CartContainer";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="min-h-[80vh]">
      <CartContainer />
    </div>
  );
}
