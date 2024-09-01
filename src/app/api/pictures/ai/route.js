import {GoogleGenerativeAI} from "@google/generative-ai"
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function GET(request) {
    const {prompt} = await request.json();

    if (!prompt) {
        return NextResponse.json({
            error: "No Prompt Provided..."
        }, {status: 200})
    }

    const result = await model.generateContent([prompt, {
        mimeType: "image/png",
    }])

    if (!result) {
        return NextResponse.json({
            error: "Result not Processing..."
        }, {status: 200})
    }

    const _image_generated = result.response.text();
    console.log(`Image generated: ${_image_generated}`)

    return NextResponse.json({
        img: "hello",
    })

}