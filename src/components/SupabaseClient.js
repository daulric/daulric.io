import { createClient } from "@supabase/supabase-js"

export function SupabaseClient() {
    return createClient(process.env.supabase_url, process.env.supabase_servive_key)
}