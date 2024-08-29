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
    const blog_db = supa_db.from("Blog")
    const {data, error} = await blog_db.select()

    // log the error
    if (error) {
        return NextResponse.json(error, {status: 200})
    }

    // Getting Individual Blog Data using the "id" query.
    if (blog_filtered !== null) {
        let filterd = Number(blog_filtered)
        let blog_filter = await blog_db.select().eq("blog_id", filterd)
        let blog_filtered_data = blog_filter.data
        
        if (blog_filtered_data.length !== 0) {
            return NextResponse.json(blog_filtered_data, {status: 200})
        } else {
            return new NextResponse("blog id not found", {status: 404})
        }
    }

    // List all blog in descending order
    if (String(isDescending).toLowerCase() === "true") {
        if (data !== null) {
            data.sort((a, b) => b.blog_id - a.blog_id);
        } 
    }

    // Returns the data
    return NextResponse.json(data, {status: 200});
}

export async function POST(request) {
    noStore()

    // Get the Data
    const {title, content} = await request.json();
    const supa_db = SupabaseClient()

    // Store the Data;
    const {data, error} = await supa_db.from("Blog").insert([
        {title, content}
    ]).select()

    // Log the results or error;
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }

    return NextResponse.json(data[0], {status: 200});
}