import { Heading } from "@/components/dashboard/Heading";
import Filter from "@/components/products/Filter";
import ProductsList from "@/components/products/ProductsList";
import { getAllProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types/product.model";

const Products = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const products = (await getAllProducts()) as Product[];

  if (searchParams.category) {
  } else {
  }

  return (
    <div className="flex flex-col py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <Heading
        title={`Products (${products.length})`}
        description="Explore all products from around the world"
      />
      <Filter className="mt-8 sm:mt-10 mb-4 sm:mb-6" />
      <ProductsList initialProducts={products} />
    </div>
  );
};

export default Products;
