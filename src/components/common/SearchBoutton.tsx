import { useDebouncedValue } from "@mantine/hooks";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAllProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types/product.model";

const SearchButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [debounced] = useDebouncedValue(query, 300);

  const [data, setData] = useState<any | null>([
    {
      id: 1,
      name: "Product 1",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
    },
    {
      id: 3,
      name: "Product 3",
      category: "Category 3",
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (debounced.length <= 0) {
      setData(null);
      return;
    }

    const fetchProducts = async () => {
      const products = (await getAllProducts()) as Product[];

      const filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(debounced.toLowerCase()) ||
          product.description.toLowerCase().includes(debounced.toLowerCase())
      );
      setData(filteredProducts);
    };

    startTransition(fetchProducts);

    return () => setData(null);
  }, [debounced]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Rechercher...</span>
        <span className="sr-only">Rechercher ...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Chercher les produits..."
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            Pas de résultats
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map(
              (group: { category: string; title: string; id: string }) => (
                <CommandGroup
                  key={group.category}
                  className="capitalize pb-3"
                  heading={group.category}
                >
                  <CommandItem
                    value={group.title}
                    className="cursor-pointer"
                    onSelect={() =>
                      handleSelect(() => router.push(`/products/${group.id}`))
                    }
                  >
                    <span className="truncate">{group.title}</span>
                  </CommandItem>
                </CommandGroup>
              )
            )
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchButton;
