import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main>
      <Hero />
      <Products />
    </main>
  );
}
