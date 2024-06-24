"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogIn } from "lucide-react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addUser } from "@/lib/firebase/firestore";
import { User } from "firebase/auth";
import { useUser } from "@/hooks/userUser";

type Props = {};

export default function GoogleLogin({}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signInWithGoogleFucn = async () => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithGoogle();
      const { displayName, uid, photoURL, email } = userCredential.user;
      addUser({ displayName, uid, photoURL, email });
      setIsLoading(false);
      router.push("/dashboard/orders");
      toast.success("Logged in successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Il y a eu une erreur lors de la connexion");
      console.log(error);
    }
  };

  return (
    <Button
      onClick={signInWithGoogleFucn}
      aria-label="Sign in with google"
      variant="outline"
      className="w-full bg-background sm:w-auto flex gap-2 items-center justify-center"
    >
      Google
      <LogIn size={18} />
      {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
    </Button>
  );
}
