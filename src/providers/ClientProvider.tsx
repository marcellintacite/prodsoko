"use client";
import { Toaster } from "@/components/ui/sonner";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ClientProvider({ children }: Props) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
