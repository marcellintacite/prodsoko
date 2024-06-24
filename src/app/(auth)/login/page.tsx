import GoogleLogin from "@/components/auth/GoogleLogin";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main>
      <div className="mx-auto">
        <Card className="w- xl:w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Connectez-vous</CardTitle>
            <CardDescription>
              Connectez-vous sur Soko app, pour vendre et achetez des produits
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1">
            <GoogleLogin />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              <p>Gagnez plus de temps en vous connectant</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
