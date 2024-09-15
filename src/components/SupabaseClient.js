import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"

import { cookieStore } from "@/components/cookieStore"

export function SupabaseClient() {
    const supabase_url =  process.env.NEXT_PUBLIC_supabase_url; // Client Support
    const service_key =  process.env.NEXT_PUBLIC_supabase_servive_key; // Client Support
    const anon_key = process.env.NEXT_PUBLIC_supabase_anon_key;

    return createClient(supabase_url, anon_key, {
        cookies: cookieStore,
    })
}