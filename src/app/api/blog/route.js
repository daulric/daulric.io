import { unstable_noStore as noStore } from "next/cache"
import { NextResponse } from "next/server";

import { SupabaseClient } from "@/components/SupabaseClient"

export async function GET(request) {
    noStore();

    // Get Query info;
    const searchParams = request.nextUrl.searchParams;
    const isDescending = searchParams.get("descending");
    const blog_filtered = searchParams.get("id")

    // Fetch data from Supabase;
    const supa_db = SupabaseClient()
    const {data, error} = await supa_db.from("Blog").select()

    if (error) {
        console.error(error)
    }

    // Getting Individual Blog Data using the "id" query.
    if (blog_filtered !== null) {
        let filterd = Number(blog_filtered)
        let blog_filter = data.filter((blog) => blog.blog_id === filterd)
        
        if (blog_filter.length !== 0) {
            return NextResponse.json(blog_filter, {status: 200})
        } else {
            return new NextResponse("blog id not found", {status: 404})
        }
    }

    if (String(isDescending).toLowerCase() === "true") {
        if (data !== null) {
            data.sort((a, b) => b.blog_id - a.blog_id);
        } 
    }

    return NextResponse.json(data, {status: 200});
}

export async function POST(request) {
    noStore()

    const {title, content} = await request.json();
    const supa_db = SupabaseClient()

    const {data, error} = await supa_db.from("Blog").insert([
        {title, content}
    ]).select()

    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }

    return NextResponse.json(data[0], {status: 200});
}