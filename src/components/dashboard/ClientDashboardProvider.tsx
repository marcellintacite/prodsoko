"use client";
import { useUser } from "@/hooks/userUser";
import { redirect } from "next/navigation";

import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  children: React.ReactNode;
};

export default function ClientDashboardProvider({ children }: Props) {
  const { currentUser, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-11/12" />
        <Skeleton />
        <Skeleton />
      </div>
    );

  if (!currentUser) redirect("/login");

  return <div>{children}</div>;
}
