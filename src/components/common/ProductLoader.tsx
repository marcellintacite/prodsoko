import ProductCardSkeleton from "./ProductCardSkeleton";

import React from "react";

type Props = {};

export default function ProductLoader({}: Props) {
  return (
    <div className="grid mt-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
