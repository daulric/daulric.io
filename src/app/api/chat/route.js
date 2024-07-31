import { NextResponse } from "next/server";

export async function POST(request) {
    const { message } = await request.json();

    const aiResponse = `${message}`;

    return NextResponse.json({
        response: aiResponse,
    }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}