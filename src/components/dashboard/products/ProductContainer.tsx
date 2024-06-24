"use client";

import { Suspense, useEffect } from "react";
import ProductList from "./ProductList";
import { useUser } from "@/hooks/userUser";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import ProductLoader from "@/components/common/ProductLoader";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

type Props = {};

export default function ProductContainer({}: Props) {
  const { currentUser } = useUser();

  useEffect(() => {}, []);

  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductList uid={currentUser?.uid as string} />
    </Suspense>
  );
}
