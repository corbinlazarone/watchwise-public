import { supabase } from "../supabsae-config";
import { UserResult } from "../types/user";

export const userFunctions = () => {
  const getUserByID = async (): Promise<UserResult | null> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error checking session: ", error);
      return;
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
  };

  return {
    getUserByID,
  };
};
