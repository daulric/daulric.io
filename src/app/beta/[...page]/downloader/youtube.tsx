'use client';

import { useState } from 'react';

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<'mp3' | 'mp4'>('mp4');
  const [message, setMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
  
    try {
      const res = await fetch('api/downloader/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url, format: format }),
      });
  
      if (res.ok) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = res.headers.get('Content-Disposition')?.split('filename=')[1].replace(/"/g, '') || `download.${format}`;
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        setMessage("Download started!");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">YouTube Video Downloader</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-lg font-medium">YouTube Video URL</label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as 'mp3' | 'mp4')}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="mp4">MP4</option>
              <option value="mp3">MP3</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Download
          </button>
        </form>
        {message && <p className="text-center text-lg mt-4">{message}</p>}
      </div>
    </div>
  );
}
