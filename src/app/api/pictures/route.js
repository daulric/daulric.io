import { NextResponse } from "next/server";
import { SupabaseClient } from "@/components/SupabaseClient"
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request) {
    noStore()
    const supa_db = SupabaseClient()
    const db_data = []

    // Images Bucket
    let images_bucket = supa_db.storage.from("images")
    let {data} = await images_bucket.list()

    // Query Parameter;
    const searchParams = request.nextUrl.searchParams
    const isDescending = searchParams.get("descending")

    // Getting Url Data
    data.map((item) => {
        db_data.push({
            url: images_bucket.getPublicUrl(item.name).data.publicUrl,
            data: item
        })
    })

    if (String(isDescending) === "true") {
        db_data.sort((a, b) => b.data.created_at.localeCompare(a.data.created_at))
    }
    
    return NextResponse.json(db_data, {status: 200})
}

export async function POST(request) {
    noStore()
    const upload_data = await request.formData();
    const file = upload_data.get("file");

    const supa_db = SupabaseClient()

    if (!file) {
        return NextResponse.json({success: false}, {status: 200})
    }

    const {data, error}= await (await supa_db.storage.from("images").upload(file.name, file))

    if (error) {
        return NextResponse.json({success: false, error: error}, {status:200})
    }

    return NextResponse.json({success: true}, {status: 200})
}