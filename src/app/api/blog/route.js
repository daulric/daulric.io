import { unstable_noStore as noStore } from "next/cache"
import {createClient} from "@supabase/supabase-js"
import { NextResponse } from "next/server";

export async function GET(request) {
    noStore();

    // Get Query info;
    const searchParams = request.nextUrl.searchParams;
    const isDescending = searchParams.get("descending");

    // Fetch data from Supabase;
    const supa_db = createClient(process.env.supabase_url, process.env.supabase_servive_key);

    const {data, error} = await supa_db.from("Blog").select()

    if (error) {
        console.log(error)
    } else {
        console.log(data, "here")
    }

    if (String(isDescending).toLowerCase() === "true") {
        if (data !== null) {
            data.sort((a, b) => b.blog_id - a.blog_id);
        } 
    }

    return NextResponse.json(data);
}

export async function POST(request) {
    noStore()

    const {title, content} = await request.json();
    const supa_db = createClient(process.env.supabase_url, process.env.supabase_servive_key);

    const {data, error} = await supa_db.from("Blog").insert([
        {title, content}
    ]).select()

    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
    

    return NextResponse.json(data[0]);
}