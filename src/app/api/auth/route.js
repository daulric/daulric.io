import { SupabaseServer } from "@/components/supabase/server";
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { encrypt, decrypt } from "@/components/tools/encryption"

export async function GET() {
    
}

export async function POST(request) {
    const { loginType, username, email, password } = await request.json();

    const supa_client = SupabaseServer();
    const accounts_db = supa_client.from("Accounts")

    switch (loginType) {
        case "signup":
            const { data: username_check, error } = await accounts_db.select("usernname").eq("username", username);

            if (username_check.length !== 0) {
                return NextResponse.json({
                    success: false,
                    msg: "Username Already Exists!",
                }, {status: 200})
            }

            let {data: success_data} = await accounts_db.upsert({
                username: username,
                email: email,
                password: encrypt(password, "passcode"),
            }).select("*")

            if (success_data) {
                return NextResponse.json({
                    success: true,
                })
            }

        default:

    }

}   