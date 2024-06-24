import { Skeleton } from "@/components/ui/skeleton";

import React from "react";
import { Card } from "../ui/card";

type Props = {};

export default function EditSkeleton({}: Props) {
  return (
    <div>
      <Card>
        <div>
          <Skeleton className="w-full h-6  rounded-md" />
          <Skeleton className="w-full h-6  rounded-md" />
        </div>

        <form action="" className="mt-4">
          <div>
            <Skeleton className="w-full h-2  rounded-md" />
            <Skeleton className="w-full h-14  rounded-md" />
          </div>
          <div>
            <Skeleton className="w-full h-2  rounded-md" />
            <Skeleton className="w-full h-14  rounded-md" />
          </div>
          <div>
            <Skeleton className="w-full h-2  rounded-md" />
            <Skeleton className="w-full h-20  rounded-md" />
          </div>

          <div className="flex justify-end">
            <Skeleton className="w-20 h-10  rounded-md" />
          </div>
        </form>
      </Card>
    </div>
  );
}
