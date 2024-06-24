"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BadgePercent, ChevronDown } from "lucide-react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import SearchButton from "./SearchBoutton";
import CartButton from "./CartButton";
import { useUser } from "@/hooks/userUser";
import { Skeleton } from "../ui/skeleton";
import UserDropDown from "./UserDropdown";
import { buttonVariants } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Navbar() {
  const { currentUser, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background py-3">
      <nav className="flex justify-between">
        <MobileNav />
        <DesktopNav />

        <div className="flex items-center space-x-4">
          <SearchButton />
          <CartButton />

          {isLoading ? (
            <Skeleton className="w-8 h-8 rounded-full" />
          ) : currentUser ? (
            <UserDropDown user={currentUser} />
          ) : (
            <Link
              href="/login"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Connexion
              <span className="sr-only">Connexion</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
