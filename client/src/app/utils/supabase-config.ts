import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, // supabaseUrl
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // supabaseKey
);