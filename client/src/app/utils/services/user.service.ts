import { redirect } from "next/navigation";
import { supabase } from "../supabase-config";
import { UserResult } from "../types/user";

export const userFunctions = () => {
    const getUserByID = async (): Promise<UserResult | null> => {
        try {
            // Get current session
            let { data: { session }, error } = await supabase.auth.getSession();

            // If no session or error, try to refresh
            if (!session || error) {
                const { data: refreshResult, error: refreshError } = await supabase.auth.refreshSession();
                
                // If refresh fails, redirect to auth
                if (refreshError || !refreshResult.session) {
                    console.error("Session refresh failed:", refreshError);
                    redirect("/pages/auth");
                }

                // Use refreshed session
                session = refreshResult.session;
            }

            if (session?.user) {
                const userData: UserResult = {
                    id: session.user.id,
                    full_name: session.user.user_metadata.full_name,
                    email: session.user.email,
                    profile_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
                    providers: session.user.app_metadata.providers,
                    created_at: session.user.created_at,
                };
                
                return userData as UserResult;
            }

            // If we somehow get here without a user, redirect to auth
            console.error("No user data in session");
            redirect("/pages/auth");
            
        } catch (error) {
            console.error("Unexpected error during user fetch:", error);
            redirect("/pages/auth");
        }

        return null;
    };

    return {
        getUserByID,
    };
};
