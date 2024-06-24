import { getProductByUser } from "@/lib/firebase/firestore";
import { Product } from "@/types/product.model";
import React from "react";
import ProductCard from "./ProductCard";
import { ProductTable } from "./ProductTable";

type Props = {
  uid: string;
};

export default async function ProductList({ uid }: Props) {
  const products = (await getProductByUser(uid)) as Product[];

  return <ProductTable products={products} />;
}
