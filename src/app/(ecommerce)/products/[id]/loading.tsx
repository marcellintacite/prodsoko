import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex fle-col gap-2 lg:flex-row mt-3 pb-16 min-h-[70vh]">
      <div className="flex gap-2 items-center flex-col">
        <Skeleton className="lg:w-[550px] w-full h-[450px]" />
        <div className="flex gap-3 mt-3">
          <Skeleton className="w-16 h-16  rounded-md" />
          <Skeleton className="w-16 h-16  rounded-md" />
          <Skeleton className="w-16 h-16 rounded-md" />
          <Skeleton className="w-16 h-16 rounded-md" />
        </div>
      </div>
      <div className="flex-1 flex-col flex gap-2">
        <Skeleton className="w-4/5 h-12" />
        <Skeleton className="w-full h-5 mt-1" />
        <Skeleton className="w-full h-5 mt-3" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5 mt-3" />
      </div>
    </div>
  );
}
