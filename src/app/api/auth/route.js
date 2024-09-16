import { SupabaseServer } from "@/components/supabase/server";
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { encrypt, decrypt } from "@/components/tools/encryption"

export async function GET() {

}

export async function POST(request) {
    try {
        const { loginType, username, email, password } = await request.json();

        // Input validation (basic example, consider using a validation library)
        if (!loginType || !username || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
            }, { status: 400 });
        }

        const supa_client = SupabaseServer();
        const accounts_db = supa_client.from("Accounts");

        switch (loginType) {
            case "signup":
                const { data: existing_accounts, error: checkError } = await accounts_db
                    .select()
                    .or(`username.eq.${username},email.eq.${email}`);

                if (checkError) throw checkError;

                if (existing_accounts && existing_accounts.length > 0) {
                    const isDuplicateUsername = existing_accounts.some(account => account.username === username);
                    const isDuplicateEmail = existing_accounts.some(account => account.email === email);

                    let message = "";

                    if (isDuplicateUsername && isDuplicateEmail) {
                        message = "Both username and email already exist!";
                    } else if (isDuplicateUsername) {
                        message = "Username already exists!";
                    } else if (isDuplicateEmail) {
                        message = "Email already exists!";
                    }

                    return NextResponse.json({
                        success: false,
                        message: message,
                    }, { status: 409 });
                }

                // Use a proper password hashing function instead of encryption
                const hashedPassword = encrypt(password, "passcode");

                const { data: success_data, error: insertError } = await accounts_db
                    .insert({
                        username: username,
                        email: email,
                        password: hashedPassword,
                    })
                    .select();

                if (insertError) throw insertError;

                const account_data = success_data[0];
                

                return NextResponse.json({
                    success: true,
                    message: "Account created successfully",
                }, { status: 201 });

            default:
                return NextResponse.json({
                    success: false,
                    message: "Invalid login type",
                }, { status: 400 });
        }
    } catch (error) {
        console.error("Error in POST function:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred",
        }, { status: 500 });
    }
}