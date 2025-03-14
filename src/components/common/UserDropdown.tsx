"use client";

import {
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "@/lib/firebase/auth";

interface UserAccountNavProps {
  user: User;
}

const UserDropDown: React.FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" aria-label="avatar">
        <Avatar>
          <AvatarImage src={user.photoURL as string} />
          <AvatarFallback>{user.displayName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.displayName && (
              <p className="text-sm font-medium">{user.displayName}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild disabled>
            <Link href="/dashboard/account">
              <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/orders">
              <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
              Commandes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/products">
              <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
            window.location.replace("/login");
          }}
          asChild
        >
          <div>
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            Deconnexion
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
