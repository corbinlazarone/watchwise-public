import { supabase } from "../supabsae-config";
import { redirect } from "next/navigation";

export const ytService = () => {
  const GrabTopChannels = async () => {
    try {
      // Get current session
      let {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // If no session or error, try to refresh
      if (!session || error) {
        const { data: refreshResult, error: refreshError } =
          await supabase.auth.refreshSession();

        // If refresh fails, redirect to auth
        if (refreshError || !refreshResult.session) {
          console.error("Session refresh failed:", refreshError);
          redirect("/pages/auth");
        }

        // Use refreshed session
        session = refreshResult.session;
      }

      // Make API call with valid session
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/yt/channels`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
              "Google-Provider-Token": session.provider_token,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized, redirect to auth
            redirect("/pages/auth");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { error: false, data };
      } catch (fetchError) {
        console.error("Error fetching from backend:", fetchError);
        // If it's an auth-related error, redirect
        if (fetchError.message?.includes("401")) {
          redirect("/pages/auth");
        }
        return {
          error: true,
          message: "Failed to fetch data from server",
          code: "FETCH_ERROR",
        };
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // For unexpected errors, redirect to auth as a fallback
      redirect("/pages/auth");
    }
  };

  const GetChannelById = async (channelId: string | string[]) => {
    try {
      // Get current session
      let {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // If no session or error, try to refresh
      if (!session || error) {
        const { data: refreshResult, error: refreshError } =
          await supabase.auth.refreshSession();

        // If refresh fails, redirect to auth
        if (refreshError || !refreshResult.session) {
          console.error("Session refresh failed:", refreshError);
          redirect("/pages/auth");
        }

        // Use refreshed session
        session = refreshResult.session;
      }

      // Make API call with valid session
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/yt/channels/${channelId}/videos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
              "Google-Provider-Token": session.provider_token,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized, redirect to auth
            redirect("/pages/auth");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { error: false, data };
      } catch (fetchError) {
        console.error("Error fetching from backend:", fetchError);
        // If it's an auth-related error, redirect
        if (fetchError.message?.includes("401")) {
          redirect("/pages/auth");
        }
        return {
          error: true,
          message: "Failed to fetch data from server",
          code: "FETCH_ERROR",
        };
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // For unexpected errors, redirect to auth as a fallback
      redirect("/pages/auth");
    }
  };

  const GrabLikedVideos = async (channelId: string | string[]) => {
    try {
        // Get current session
        let {
          data: { session },
          error,
        } = await supabase.auth.getSession();
  
        // If no session or error, try to refresh
        if (!session || error) {
          const { data: refreshResult, error: refreshError } =
            await supabase.auth.refreshSession();
  
          // If refresh fails, redirect to auth
          if (refreshError || !refreshResult.session) {
            console.error("Session refresh failed:", refreshError);
            redirect("/pages/auth");
          }
  
          // Use refreshed session
          session = refreshResult.session;
        }
  
        // Make API call with valid session
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/yt/channels/${channelId}/videos`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
                "Google-Provider-Token": session.provider_token,
              },
            }
          );
  
          if (!response.ok) {
            if (response.status === 401) {
              // Unauthorized, redirect to auth
              redirect("/pages/auth");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          return { error: false, data };
        } catch (fetchError) {
          console.error("Error fetching from backend:", fetchError);
          // If it's an auth-related error, redirect
          if (fetchError.message?.includes("401")) {
            redirect("/pages/auth");
          }
          return {
            error: true,
            message: "Failed to fetch data from server",
            code: "FETCH_ERROR",
          };
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        // For unexpected errors, redirect to auth as a fallback
        redirect("/pages/auth");
      }
  }

  return {
    GrabTopChannels,
    GetChannelById,
    GrabLikedVideos
  };
};
