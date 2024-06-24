import { AddProductForm } from "@/components/dashboard/products/AddProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductById } from "@/lib/firebase/firestore";
import { Product } from "@/types/product.model";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const product = (await getProductById(params.id)) as Product;

  return (
    <Card
      id="new-product-page-form-container"
      aria-labelledby="new-product-page-form-heading"
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Modifier un produit</CardTitle>
        <CardDescription>Modofier le produit</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm product={JSON.stringify(product)} />
      </CardContent>
    </Card>
  );
}
