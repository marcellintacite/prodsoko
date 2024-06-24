import { AddProductForm } from "@/components/dashboard/products/AddProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewProductPage = () => {
  return (
    <Card
      id="new-product-page-form-container"
      aria-labelledby="new-product-page-form-heading"
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Ajouter un produit</CardTitle>
        <CardDescription>
          Ajouter un produit dans la liste des produits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm />
      </CardContent>
    </Card>
  );
};

export default NewProductPage;
