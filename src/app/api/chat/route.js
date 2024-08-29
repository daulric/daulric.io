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
    // request data sent here;
    const { message, id } = await request.json();

    // returns error response is id is not found
    if (!id) {
        return NextResponse.json({
            response: "You must create a secure id to use this chat!",
        }, {status: 200})
    }

    const supa_db = SupabaseClient();
    const chat_db = supa_db.from("Chat Storage");

    // Get filtered chat data
    const {data, error} = await chat_db.select().eq("chat_id", id)
    let data_gotten;

    // Get Chat History From Database;
    if (!data || data === null || data.length === 0) {
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

        let items = await chat_db.upsert({
            chat_id: id,
            chat_history: JSON.stringify(created_history),
        }).select()

        data_gotten = items.data;
    } else {
        data_gotten = data
    }

    // Parsed the Chat History to convert it from a string!
    let Chat_History = JSON.parse(data_gotten[0].chat_history);

    // Chat history with given chat history
    const chat = model.startChat({
        history: Chat_History,
        generationConfig: {},
    });

    try {
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

    } catch(e) {
        return NextResponse.json({
            response: "Google is not allowing these type of questions. Dont blame me.😊\n This question/statement will not be stored in your chat history.",
        }, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}