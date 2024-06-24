"use client";

import { useUser } from "@/hooks/userUser";
import React, { Suspense, useEffect } from "react";
import TableContainer from "./TableContainer";

import TableSkeleton from "@/components/skeleton/TableSkeleton";

type Props = {};

export default function OrderContainer({}: Props) {
  const { currentUser } = useUser();

  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <TableContainer uid={currentUser?.uid as string} />
      </Suspense>
    </div>
  );
}
