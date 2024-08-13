import { SupabaseClient } from "@/components/SupabaseClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    const id = Number(params.id);
    
    const supa_db = SupabaseClient().from("Blog Likes")
    const {error, data} = await supa_db.select().eq("blog_id", id)

    if (error) {
        return new NextResponse("Error Fetching Likes", {status: 200});
    }

    let blog_likes_data = data.length !== 0 ? data[0] : null;

    if (blog_likes_data === null) {
        let temp_update_data = await supa_db.upsert({
            blog_id: id,
            likes: 0,
        }).select("*")

        blog_likes_data = temp_update_data.data?.map(data => data.blog_id === id)[0]
    }

    return NextResponse.json(blog_likes_data, {status: 200})
}

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
    const supa_db = SupabaseClient().from("Blog Likes");
    const id = Number(params.id);

    const {data, error} = await supa_db.select("*").eq("blog_id", id);
    let blog_likes: any = data ? data[0] : null;

    if (error) {
        return NextResponse.json({success: false}, { status: 200 })
    }

    let likes = blog_likes.likes;
    let { increment } = await request.json();

    if (increment === true) {
        likes += 1
    } else if (increment === false) {
        likes -= 1;
    }

    await supa_db.upsert({
        blog_id: id,
        likes: likes,
    })

    return NextResponse.json({success: true}, {status: 200})
}