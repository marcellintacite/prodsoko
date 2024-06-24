"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { productSchema, ProductForm } from "@/lib/validators/product";
import categories, { Product } from "@/types/product.model";
import FileUploadContainer from "./FileUploadContainer";
import Image from "next/image";
import { addProduct } from "@/lib/firebase/firestore";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";

type Props = {
  product?: string;
};

export function AddProductForm({ product }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgsUrl, setImgsUrl] = useState<string[]>([]);
  const currentProduct = product ? JSON.parse(product) : null;

  const params = useParams();
  const router = useRouter();

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: currentProduct?.title || "",
      description: currentProduct?.description || "",
      category: currentProduct?.category || "",
      price: currentProduct?.price || "",
    },
  });

  const onSubmit = async (values: ProductForm) => {
    setIsLoading(true);

    const product = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: values.price,
      thumbnail: imgsUrl[0],
      images: imgsUrl,
      createdAt: Timestamp.fromDate(new Date()),
    } as Product;

    addProduct(product);
    setImgsUrl([]);
    setIsLoading(false);
    toast.success("Produits ajouté avec succès");
    router.push("/dashboard/products");
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom produit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du produit"
                  disabled={isLoading}
                  {...form.register("title")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description du produit"
                  disabled={isLoading}
                  {...form.register("description")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Categorie</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                  {...form.register("category")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem value={c} key={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <div className="relative">
                    <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center">
                      $
                    </p>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="0"
                      disabled={isLoading}
                      {...form.register("price")}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {imgsUrl.length > 0 ? (
          <div className="flex flex-col items-start gap-6 md:flex-row">
            {imgsUrl.map((i) => (
              <Image
                className="w-20 h-20"
                src={i}
                key={i}
                alt=""
                width={100}
                height={100}
              />
            ))}
          </div>
        ) : (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="flex-1 w-full flex flex-col">
                <FormLabel>Images :</FormLabel>
                <FormControl>
                  <FileUploadContainer setImages={setImgsUrl} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={imgsUrl.length === 0}>
          Publier le produit
          <span className="sr-only">Publier le produit</span>
        </Button>
      </form>
    </Form>
  );
}
