"use client";

import { useCartStore } from "@/lib/store/cart";

import { Button } from "../ui/button";
import { addOrderByUser } from "@/lib/firebase/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Order } from "@/types/orders.model";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase/firebase";

const Summary = () => {
  const { clearCart, removeFromCart, products } = useCartStore(
    (store) => store
  );
  const totalPrice = products.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const router = useRouter();

  const handleCheckout = () => {
    console.log("Checkout");
    const order: Order = {
      products,
      createdAt: Timestamp.now(),
      user: {
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        uid: auth.currentUser?.uid,
      },
    };
    addOrderByUser(order);
    clearCart();
    toast.success("Commande effectuée avec succès");
    router.push("/");
  };

  return (
    <div
      className="
        mt-16
        rounded-lg
        bg-gray-50
        px-4
        py-6
        sm:p-6
        lg:col-span-5
        lg:mt-3
        lg:p-8
        h-fit
        ml-3
        mb-3
      "
    >
      <h2 className="text-lg font-medium text-gray-900">
        Details de la commande
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalPrice)}
        </div>
        <Button
          disabled={products.length === 0}
          className="w-full mt-6 hover:before:-translate-x-[500px]"
          onClick={handleCheckout}
        >
          Checkout
        </Button>

        <Button variant={"link"} className="w-full" onClick={clearCart}>
          Effacer
        </Button>
      </div>
    </div>
  );
};

export default Summary;
