import { SupabaseClient } from "@/components/supabase/client"
import {NextResponse} from "next/server"
import { unstable_noStore as noStore } from "next/cache"

import {encrypt} from "@/components/tools/encryption"

export async function GET() {
    noStore();
    const supa_db = SupabaseClient();
    let secret = "";

    const {data} = await supa_db.from("live_creds").select("secret").eq("name", "beta_pwd").single()

    const encrypted = encrypt(data.secret, "passcode");
    return new NextResponse(encrypted, {status: 200});
}