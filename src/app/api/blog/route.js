import { unstable_noStore as noStore } from "next/cache"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

export async function GET(request) {
    noStore();

    // Get Query info;
    const searchParams = request.nextUrl.searchParams;
    const isDescending = searchParams.get("descending");
    
    // Fetch data from Prisma;
    const prisma = new PrismaClient();
    const data = await prisma.blog.findMany()

    if (String(isDescending).toLowerCase() === "true") {
        data.sort((a, b) => b.blog_id - a.blog_id);
    }

    return NextResponse.json(data);
}

export async function POST(request) {
    noStore()

    const {title, content} = await request.json();

    const prisma_client = new PrismaClient();

    const blog_data = await prisma_client.blog.create({
        data: {
            title: title,
            content: content,
        }
    })

    return NextResponse.json(blog_data);
}