import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import { Heading } from "@/components/dashboard/Heading";
import ProductContainer from "@/components/dashboard/products/ProductContainer";
import ProductList from "@/components/dashboard/products/ProductList";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Produits"
          description="Gérer vos produits à un seul endroit"
        />

        <Link className={buttonVariants()} href="/dashboard/products/new">
          Ajouter un produit
        </Link>
      </div>

      <div>
        <ProductContainer />
      </div>
    </div>
  );
}
