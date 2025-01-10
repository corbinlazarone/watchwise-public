export interface UserResult {
    id: string;
    full_name: string;
    email: string | undefined;
    profile_url: string;
    providers: string[];
    created_at: string;
}