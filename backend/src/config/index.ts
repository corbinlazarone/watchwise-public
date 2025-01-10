import dotenv from "dotenv";
import path from "path";

const environment = process.env.NODE_ENV || "development";
const envFile = environment == "production" ? ".env.production" : ".env.local";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
    port: process.env.PORT || 3000,
    env: environment,
    supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    },
    frontend: {
        url: process.env.CLIENT_URL
    }
}
