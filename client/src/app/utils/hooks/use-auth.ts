import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-config";
import { useRouter } from "next/navigation";

interface AuthState {
  session: Session | null;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
  });

  useEffect(() => {
    // check active user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState({
          session: session,
        });
      } else {
        setAuthState((state) => ({ ...state }));
      }
    });

    // listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // update state with new session
        setAuthState({
          session: session,
        });
      } else {
        setAuthState({
          session: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Sign in with Google with specfic scopes
   */
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_AUTH_URL}/pages/callback`,
          scopes:
            "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube",
          queryParams: {
            access_type: "online",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
      if (data) {
        router.push("/pages/channels");
      }
    } catch (error) {
      console.error("Google sign-in error: ", error);
      throw error;
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setAuthState({
        session: null,
      });
      router.push("/");
    } catch (error) {
      console.error("Sign out error: ", error);
      throw error;
    }
  };

  return {
    ...authState,
    signInWithGoogle,
    signOut,
  };
}
