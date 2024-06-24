import { getOrdersByUser } from "@/lib/firebase/firestore";
import React from "react";
import { OrderTable } from "./OrderTable";
import { Order } from "@/types/orders.model";

type Props = {
  uid: string;
};

export default async function TableContainer({ uid }: Props) {
  const orders = (await getOrdersByUser(uid)) as Order[];
  console.log(orders);

  return (
    <div>
      <OrderTable orders={orders} />{" "}
    </div>
  );
}
