"use client";

import { useUser } from "@/hooks/userUser";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthClientProtect({ children }: Props) {
  const router = useRouter();
  const { currentUser, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-8 h-8 rounded-full animate-pulse" />
      </div>
    );
  }
  if (currentUser) {
    router.push("/");
    return null;
  } else {
    return <> {children} </>;
  }
}
