"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../utils/supabsae-config";
import Loading from "../../components/loading";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Authentication error: ", error);
          router.push("/pages/auth?error=Authentication failed");
          return;
        }

        if (session) {
          // Successful login, redirect to channels page
          router.push("/pages/channels")
        } else {
          router.push("/pages/auth?error=No session found");
        }
      } catch (error) {
        console.error("Callback error: ", error);
        router.push("/pages/auth?error=Authentication failed");
      }
    };

    handleCallback();
  }, [router]);

  return <Loading />
}
