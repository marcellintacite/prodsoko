import { getAllProducts, getTenFirstProduct } from "@/lib/firebase/firestore";
import ProductLoader from "../common/ProductLoader";
import { Product } from "@/types/product.model";
import { Suspense } from "react";
import ProductCard from "../dashboard/products/ProductCard";

type Props = {};

export default async function Products({}: Props) {
  const products = (await getTenFirstProduct()) as Product[];
  return (
    <section id="products" className="pb-7">
      <h2 className="text-2xl font-bold mb-4">Produits populaires</h2>
      <div className="mt-4">
        <Suspense fallback={<ProductLoader />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center p-3">
              <p>Aucun produit trouvé</p>
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
}
