'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import crypto from "crypto";
import axios from "axios";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const scrollAreaRef = useRef(null);
    
    let cookieStore = {};

    useEffect(() => {
        let cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            let [name, value] = cookie.split('=');
            console.log(name, value);
            cookieStore[name] = value;
        });

        if (!cookieStore["chat_key"]) {
            let key = crypto.randomBytes(32).toString("hex");
            document.cookie = `chat_key=${key}`;
            cookieStore["chat_key"] = key;
            console.log("created!");
        }
    }, [cookieStore]);

    const sendMessage = async () => {
        if (!input) return;
        setInput('');
        const userMessage = { user: 'You', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const { data } = await axios.post("/api/chat", {
                message: input, 
                id: cookieStore["chat_key"]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            const aiMessage = { user: 'dabot', text: data.response };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Card className="flex flex-col h-screen bg-gray-900 text-gray-100 border-none shadow-none">
            <CardHeader className="text-center border-b border-gray-800">
                <h1 className="text-2xl font-bold">Chat with AI</h1>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-hidden bg-gray-800 p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${
                                msg.user === 'You' ? 'text-right' : 'text-left'
                            }`}
                        >
                            <div className={`inline-block max-w-[80%] ${
                                msg.user === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
                            } rounded-lg p-3`}>
                                <p className="font-semibold">{msg.user}</p>
                                <ReactMarkdown 
                                    rehypePlugins={[rehypeHighlight]}  
                                    className="text-sm break-words whitespace-pre-wrap"
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-4 bg-gray-800 border-t border-gray-700">
                <div className="flex w-full space-x-2">
                    <Input
                        className="flex-grow bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter Message'
                    />
                    <Button 
                        onClick={sendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}