'use client';

import { maxHeaderSize } from 'http';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);

    const processMessageContent = (content) => {
        return content.replace(/\*/g, '');
      };

    const sendMessage = async () => {
        if (!input) return;
        const userMessage = { user: 'You', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });
    
        const data = await response.json();
        const aiMessage = { user: 'dabot', text: data.response };
        setMessages((prevMessages) => [...prevMessages,  aiMessage]);
        setInput('');
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Chat with AI</h1>
            <p className="text-2xl font-small mb-5">messages here will not be stored!</p>
            <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-xl shadow-lg">
                <div
                    className="chat-window overflow-y-scroll h-80 border-b border-gray-700 mb-6 p-4 rounded-xl scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    ref={chatWindowRef}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message mb-3 ${
                                msg.user === 'You' ? 'text-right' : 'text-left'
                            }`}
                        >
                            <strong>{msg.user}:</strong> {processMessageContent(msg.text)}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter Message'
                    />
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-r-xl hover:bg-blue-700"
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