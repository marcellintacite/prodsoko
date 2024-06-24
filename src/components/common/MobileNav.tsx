"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import categories from "@/types/product.model";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="px-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <ChevronDown className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="font-bold">Soko</span>
              <span className="sr-only">Home</span>
            </Link>
            <div className="text-sm">
              <Accordion
                type="multiple"
                defaultValue={["item-1", "item-2", "item-3"]}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>My Dashboard</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/dashboard/orders"
                      >
                        Orders
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/dashboard/stores"
                      >
                        Stores
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      {categories.map((cat) => (
                        <Link href={`/products?category=${cat}`} key={cat}>
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
