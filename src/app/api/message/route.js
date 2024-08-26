import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
    return NextResponse.json({message: "ok"}, {status: 200})
}

export async function POST(request) {
    const {name, message} = await request.json();

    // Send the message to the chat service via webhook

    const data = await axios.post(process.env.discord_webhook, {
        username: name,
        content: message,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    // returns false if data response is not ok
    if (data.status === 404 || data.status === 500) {
        return NextResponse.json({
            success: false,
        }, {status: 200})
    }

    // returns the response true to indicate success
    return NextResponse.json({
        success: true,
    }, {status: 200})
}