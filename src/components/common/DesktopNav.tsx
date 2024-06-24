import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";
import { BadgePercent, ChevronDown } from "lucide-react";

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/" className="flex space-x-2 items-center">
        <BadgePercent size={20} /> <h3 className="text-lg font-bold">Soko</h3>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2">
                <ListItem
                  href="/products?category=skateboards"
                  title="Skateboards"
                >
                  Explore the skateboards category
                </ListItem>
                <ListItem href="/products?category=clothing" title="Clothing">
                  Explore the clothing category
                </ListItem>
                <ListItem href="/products?category=shoes" title="Shoes">
                  Explore the shoes category
                </ListItem>
                <ListItem
                  href="/products?category=accessories"
                  title="Accessories"
                >
                  Explore the accessories category
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
