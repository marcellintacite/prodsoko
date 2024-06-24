"use client";

import { Product } from "@/types/product.model";
import { useIntersection } from "@mantine/hooks";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../dashboard/products/ProductCard";

interface ProductsListProps {
  initialProducts: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ initialProducts }) => {
  const [data, setData] = useState<Product[]>(initialProducts);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      const filteredProducts = initialProducts.filter(
        (product) => product.category === category
      );
      setData(filteredProducts);
    } else {
      setData(initialProducts);
    }
  }, [category, initialProducts]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product, index) => {
        return (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
