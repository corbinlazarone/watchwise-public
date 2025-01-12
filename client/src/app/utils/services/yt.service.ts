import { supabase } from "../supabase-config";
import { redirect } from "next/navigation";

const refreshAuthState = async () => {
  try {
    // Get current session
    let { data: { session }, error } = await supabase.auth.getSession();

    // Check for provider token specifically
    if (!session?.provider_token) {
      // Try to refresh the session first
      const { data: refreshResult, error: refreshError } = 
        await supabase.auth.refreshSession();

      if (refreshError || !refreshResult.session?.provider_token) {
        // If still no provider token after refresh, re-authenticate with Google
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            scopes: 'https://www.googleapis.com/auth/youtube.readonly',
            redirectTo: `https://www.trywatchwise.com/pages/callback`
          }
        });
        return null; // The OAuth flow will handle the redirect
      }

      session = refreshResult.session;
    }

    return session;
  } catch (error) {
    console.error("Auth state refresh failed:", error);
    redirect("/pages/auth");
  }
};

export const ytService = () => {
  const makeAuthenticatedRequest = async (endpoint: string) => {
    try {
      const session = await refreshAuthState();
      
      // If no session, the OAuth flow will handle redirect
      if (!session) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            "Google-Provider-Token": session.provider_token!,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Re-authenticate on 401
          redirect("/pages/auth");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { error: false, data };
    } catch (error) {
      console.error("Error making authenticated request:", error);
      return {
        error: true,
        message: "Failed to fetch data from server",
        code: "FETCH_ERROR",
      };
    }
  };

  const GrabTopChannels = () => makeAuthenticatedRequest("/api/yt/channels");
  
  const GetChannelById = (channelId: string | string[]) => 
    makeAuthenticatedRequest(`/api/yt/channels/${channelId}/videos`);
  
  const GrabLikedVideos = () => makeAuthenticatedRequest("/api/yt/videos");

  return {
    GrabTopChannels,
    GetChannelById,
    GrabLikedVideos,
  };
};