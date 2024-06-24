import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/types/product.model";
import Image from "next/image";
import ActionProductCard from "./ActionProductCard";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="h-full overflow-hidden rounded-2xl">
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="m-3">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            priority
            className="w-full h-full object-cover object-center rounded-md
            "
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <div>
          <h2 className="text-lg font-semibold capitalize">{product.title}</h2>
          <div className="flex justify-between">
            <p>{product.price}$</p>
            <p className="p-1 bg-gray-100 rounded-md text-xs">
              {product.category}
            </p>
          </div>
          <div className="flex justify-between ">
            <p className="text-sm text-gray-500">{product.user.displayName}</p>

            <p className="text-sm text-gray-500">
              {/* {product.createdAt.toDate()} */}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 gap-3">
        <ActionProductCard product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
