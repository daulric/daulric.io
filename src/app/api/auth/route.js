import { SupabaseServer } from "@/components/supabase/server";
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { encrypt, decrypt } from "@/components/tools/encryption"

export async function GET() {
    return new NextResponse("ok", {status: 200})
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

        const cookieStore = cookies();

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

                const { data: success_data, error: insertError } = await accounts_db
                    .insert({
                        username: username,
                        email: email,
                        password: password,
                    })
                    .select();

                if (insertError) throw insertError;

                const account_data = success_data[0];
                cookieStore.set("user", account_data.user_id)

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

export async function PUT(request) {
    try {
        const { loginType, email, password } = await request.json();
        
        if (!loginType || !email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Missing Fields Required'
            }, { status: 400 });  // Changed to 400 for bad request
        }

        const supa_client = SupabaseServer();
        const accounts_db = supa_client.from("Accounts");
        const cookieStore = cookies();

        if (loginType === "login") {
            const { data: existing_accounts, error: checkError } = await accounts_db
                    .select()
                    .or(`password.eq.${password},email.eq.${email}`);
                
            if (checkError) {
                throw checkError;
            }

            if (existing_accounts && existing_accounts.length > 0) {
                const isEmail = existing_accounts.some(account => account.email === email);
                const isPassword = existing_accounts.some(account => decrypt(account.password, "passcode") === decrypt(password, "passcode"));

                if (isEmail && isPassword) {
                    const user_token = existing_accounts[0].user_id;
                    cookieStore.set("user", user_token);

                    return NextResponse.json({
                        success: true,
                        message: "Login Successful",
                    }, { status: 200 });
                } else if (!isPassword) {
                    return NextResponse.json({
                        success: false,
                        message: "Invalid Password",
                    }, { status: 401 });  // Unauthorized
                } else {
                    return NextResponse.json({
                        success: false,
                        message: "Invalid Email",
                    }, { status: 401 });  // Unauthorized
                }
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Account not found. Please create a new account."
                }, { status: 404 });  // Not Found
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid Login Type"
            }, { status: 400 });  // Bad Request
        }
    } catch (e) {
        console.error("Error in PUT /api/auth:", e);
        return NextResponse.json({
            success: false,
            message: "An error occurred",
            error: e.message
        }, { status: 500 });
    }
}