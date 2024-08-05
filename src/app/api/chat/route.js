import { NextResponse } from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai"
import { SupabaseClient } from "@/components/SupabaseClient";

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
})

export function GET() {
    return new NextResponse("ok")
}

export async function POST(request) {
    const { message, id } = await request.json();

    if (!id) {
        return NextResponse.json({
            response: "You must create a secure id to use this chat!",
        }, {status: 200})
    }

    const supa_db = SupabaseClient();
    const chat_db = supa_db.from("Chat Storage");

    const {data, error} = await chat_db.select()
    let Chat_History;
    let data_gotten;

    let chat_associated_id = data.filter((chat) => chat.chat_id === id);

    // Get Chat History From Database;
    if (!chat_associated_id || chat_associated_id.length === 0) {
        let created_history = [
            {
                role: "user",
                parts: [{text: "questons"}]
            },
            {
                role: "model",
                parts: [{text: "answers"}]
            }
        ]

        await chat_db.insert({
            chat_id: id,
            chat_history: JSON.stringify(created_history),
        })

        let got_data = await chat_db.select("*")
        data_gotten = got_data.data.filter(chat => chat.chat_id === id)
    } else {
        data_gotten = chat_associated_id
    }

    // Parsed the Chat History to convert it from a string!
    Chat_History = JSON.parse(data_gotten[0].chat_history);

    // Chat history with given chat history
    const chat = model.startChat({
        history: Chat_History,
        generationConfig: {},
    });

    // Output the given response to the message
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Storing Data
    Chat_History.map((history) => {
        if (history.role === "user") {
            history.parts.push({text: message})
        }

        if (history.role === "model") {
            history.parts.push({text: response})
        }
    })

    // Update the chat history
    chat_db.upsert({
        chat_id: id,
        chat_history: JSON.stringify(Chat_History)
    }).then(() => console.log("data updated", id))

    // Return the AI Response
    return NextResponse.json({
        response: response,
    }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}