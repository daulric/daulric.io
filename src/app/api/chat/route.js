import { NextRequest, NextResponse } from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai"

import { cookies } from "next/headers"

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
})

export function GET() {
    return new NextResponse("ok")
}

export async function POST(request) {
    const { message } = await request.json();
    const cookieStore = cookies()

    const chat_history_str = cookieStore.get("chat_history")
    let chat_history;

    if (typeof chat_history_str === "undefined") {
        chat_history = [
            {
                role: "user",
                parts: [{text: "questons"}]
            },
            {
                role: "model",
                parts: [{text: "answers"}]
            }
        ]

        cookieStore.set("chat_history", JSON.stringify(chat_history))
        localStorage.setItem("chat_history", JSON.stringify(chat_history))
    } else {
        chat_history = JSON.parse(chat_history_str.value)
        localStorage.setItem("chat_history", JSON.stringify(chat_history))
    }

    console.log("local storage: ", localStorage.getItem("chat_history"));
    console.log("prev chat history: ", chat_history)

    const chat = model.startChat({
        history: chat_history,
        generationConfig: {},
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    chat_history.map((value) => {
        if (value.role === "user") {
            value.parts.push({
                text: message,
            })
        }

        if (value.role === "model") {
            value.parts.push({
                text: response
            })
        }
    })

    console.log("updated cookie: ", chat_history)
    cookieStore.set("chat_history", JSON.stringify(chat_history))

    return NextResponse.json({
        response: response,
    }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}