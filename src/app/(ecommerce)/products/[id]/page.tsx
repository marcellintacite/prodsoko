import Actions from "@/components/dashboard/products/product/Actions";
import { ImageCarroussel } from "@/components/dashboard/products/product/Caroussel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/lib/firebase/firestore";
import { Product } from "@/types/product.model";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = (await getProductById(params.id)) as Product;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    description: product.description,
    authors: [
      {
        name: product.user.displayName as string,
      },
    ],
    openGraph: {
      images: [product.thumbnail, ...previousImages],
    },
  };
}

export default async function pages({ params }: Props) {
  const product = (await getProductById(params.id)) as Product;
  return (
    <div className="my-2 flex flex-col gap-2 lg:flex-row min-h-[70vh]">
      <ImageCarroussel product={product} />
      <div className="flex-1 lg:p-2">
        <Card className="p-2 h-full">
          <CardContent className="f">
            <h2 className="text-2xl font-bold">{product.title}</h2>

            <div className="flex justify-between items-center mt-3">
              <p className="font-semibold">
                {Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </p>
              <p className="bg-primary-foreground p-1 rounded-md text-xs">
                {product.category}
              </p>
            </div>
            <h2 className="font-bold mt-2">Description</h2>
            <p className="mt-2 text-sm">{product.description}</p>

            <div className="flex gap-2 items-center mt-5">
              <Avatar>
                <AvatarImage src={product.user.photoURL as string} />
                <AvatarFallback>
                  {product.user.displayName?.trim()[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 text-gray-400 text-sm">
                <p>{product.user.displayName}</p>
                <p>{product.user.email}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end items-center">
            <Actions product={JSON.stringify(product)} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
