'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkDown from "react-markdown"
import crypto from "crypto"

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);
    
    let cookieStore = {}

    useEffect(() => {
        let cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            let [name, value] = cookie.split('=')
            cookieStore[name] = value
        })

        if (!cookieStore["chat_key"]) {
            let key = crypto.randomBytes(32).toString("hex")
            document.cookie = `chat_key=${key}`
            cookieStore["chat_key"] = key;
            console.log("created!")
        }
    }, [cookieStore])

    const sendMessage = async () => {
        if (!input) return;
        setInput('')
        const userMessage = { user: 'You', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input, id: cookieStore["chat_key"] }),
        });
    
        const data = await response.json();
        const aiMessage = { user: 'dabot', text: data.response };
        setMessages((prevMessages) => [...prevMessages,  aiMessage]);
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-3">
            <div className="flex-shrink-0 mb-3 text-center"> {}
                <h1 className="text-2xl font-bold">Chat with AI</h1>
            </div>
            
            <div className="flex-grow flex flex-col overflow-hidden bg-gray-800 rounded-lg shadow-lg">
                <div 
                    className="flex-grow overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    ref={chatWindowRef}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message mb-3 ${
                                msg.user === 'You' ? 'text-right' : 'text-left'
                            } p-2 md:p-4 w-full`}
                        >
                            <strong className="text-sm md:text-base">{msg.user}:</strong>
                            <ReactMarkDown className="text-sm md:text-base font-normal break-words whitespace-pre-wrap">
                                {msg.text}
                            </ReactMarkDown>
                        </div>
                    ))}
                </div>
                
                <div className="flex p-3 bg-gray-700">
                    <input
                        type="text"
                        className="flex-grow p-2 bg-gray-600 border border-gray-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter Message'
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 text-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
