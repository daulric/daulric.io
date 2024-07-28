import { NextResponse } from "next/server";
import { SupabaseClient } from "@/components/SupabaseClient"

export async function POST(request) {
    const upload_data = await request.formData();
    const file = upload_data.get("file");

    const supa_db = SupabaseClient()

    if (!file) {
        return NextResponse.json({success: false}, {status: 200})
    }

    return NextResponse.json({success: true}, {status: 200})
}