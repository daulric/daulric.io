import { createClient } from "@supabase/supabase-js"

export function SupabaseClient() {
    const supabase_url =  process.env.NEXT_PUBLIC_supabase_url; // Client Support
    const service_key =  process.env.NEXT_PUBLIC_supabase_servive_key; // Client Support
    return createClient(supabase_url, service_key)
}