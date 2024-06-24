import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),

  category: z.enum([
    "Electroniques",
    "Vêtements",
    "Maison",
    "Sport",
    "Alimentaire",
  ]),
});

export type ProductForm = z.infer<typeof productSchema>;
