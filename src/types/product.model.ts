import { User } from "firebase/auth";
import { FieldValue, Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "Electroniques" | "Vêtements" | "Maison" | "Sport" | "Alimentaire";
  thumbnail: string;
  images: string[];
  createdAt: FieldValue | Timestamp;
  user: Partial<User>;
};

const categories = [
  "Electroniques",
  "Vêtements",
  "Maison",
  "Sport",
  "Alimentaire",
];

export default categories;
