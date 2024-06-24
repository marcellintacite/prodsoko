import { FieldValue, Timestamp } from "firebase/firestore";
import { Product } from "./product.model";
import { User } from "firebase/auth";

export type Order = {
  id?: string;

  products: Product[];
  createdAt: FieldValue | Timestamp;
  user: Partial<User>;
};
