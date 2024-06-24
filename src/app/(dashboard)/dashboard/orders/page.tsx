import { Heading } from "@/components/dashboard/Heading";
import OrderContainer from "@/components/dashboard/orders/OrderContainer";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Commandes"
          description="Gérer vos commandes maintenant"
        />
      </div>
      <OrderContainer />
    </div>
  );
}
