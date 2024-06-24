import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ImageUpload from "./ImageUpload";

type Props = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileUploadContainer({ setImages }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-md shadow" variant="outline">
          Ajouter des images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Ajouter des images </DialogTitle>
          <DialogDescription className="text-center">
            Importez les images ici en format JPG ou PNG
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ImageUpload setImages={setImages} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
