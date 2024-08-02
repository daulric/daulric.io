import { NextRequest, NextResponse } from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai"

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const model = ai.getGenerativeModel({
    model: "gemini-pro",
})

export async function POST(request) {
    const { message } = await request.json();

    const chat = model.startChat({
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({
        response: response,
    }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}