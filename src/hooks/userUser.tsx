import { auth } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    // Cleanup function to unsubscribe from listener on component unmount
    return unsubscribe;
  }, []);

  return { currentUser, isLoading };
};
