import { Product } from "@/types/product.model";
import { create } from "zustand";

type Store = {
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

export const useCartStore = create<Store>()((set) => ({
  products: [],
  addToCart: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeFromCart: (product) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== product.id),
    })),
  clearCart: () => set({ products: [] }),
}));
