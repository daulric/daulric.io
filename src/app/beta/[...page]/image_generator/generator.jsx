"use client";

import { useState } from "react";
import  Image from "next/image"

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('/api/placeholder/512/512');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    // Simulate image generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In a real application, you would call your AI image generation API here
    setImageUrl(`/api/placeholder/512/512?text=${encodeURIComponent(prompt)}`);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 space-y-4 bg-gray-900 text-white rounded-lg">
        <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Generated AI Image"
            className="w-full h-full object-cover"
            priority
            width={512}
            height={512}
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleGenerateImage} 
            disabled={isGenerating}
            className={`flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h1m0 0h16m-16 0v4m0-4v-1a1 1 0 011-1h10a1 1 0 011 1v1m0 0v4m0 0H4m1-4h1m5 0h1m1 0h1m5 0h1m0 0v4m0-4v-1a1 1 0 00-1-1h-1m0 0v-2a1 1 0 00-1-1h-1m0 0h-1m0 0h-1m0 0h-1m-4 0H8a1 1 0 00-1 1v2m0 0H6a1 1 0 00-1 1v1"
              />
            </svg>
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
