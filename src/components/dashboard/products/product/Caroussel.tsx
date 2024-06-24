"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Product } from "@/types/product.model";
import Image from "next/image";

type Props = {
  product: Product;
};
export function ImageCarroussel({ product }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex-1">
      <Carousel
        setApi={setApi}
        className="w-full p-1 border rounded-md relative"
      >
        <CarouselContent className="relative">
          {product.images.map((img) => (
            <CarouselItem key={img} className="">
              <Image
                src={img}
                alt=""
                width={900}
                height={500}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute bottom-1 left-1 z-10" />
        <CarouselNext className="absolute bottom-1 right-1 z-10" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
