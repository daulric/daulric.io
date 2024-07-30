import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({message: "ok"}, {status: 200})
}

export async function POST(request) {
    const {name, message} = await request.json();

    const data = await fetch(process.env.discord_webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: name,
            content: message,
        }),
    })

    if (!data.ok) {
        return NextResponse.json({
            success: false,
        }, {status: 200})
    }

    return NextResponse.json({
        success: true,
    }, {status: 200})
}