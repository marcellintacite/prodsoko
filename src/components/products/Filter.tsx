"use client";

import categories from "@/types/product.model";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const Filter = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const changeCategory = (categorySlug: string) => {
    setIsOpen(false);

    if (categorySlug === selectedCategory) {
      return router.push("/products");
    }

    router.push(`/products?category=${categorySlug}`);
  };

  return (
    <div className={cn("flex", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-x-2">
            Filtres
            <Plus />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="px-2 flex flex-col gap-4">
            <h3 className="text-lg text-emerald-600 font-semibold">
              Categories
            </h3>

            <div className="flex flex-wrap gap-2">
              <div
                onClick={() => changeCategory("")}
                className="flex items-center"
              >
                <Button variant={selectedCategory ? "default" : "outline"}>
                  Tous
                </Button>
              </div>
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => changeCategory(category)}
                  className="flex items-center"
                >
                  <Button
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filter;
