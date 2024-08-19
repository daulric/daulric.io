import { NextRequest } from 'next/server';
import ytdl from 'ytdl-core';
import { PassThrough } from 'stream';
import pump from "pump"; // Or another stream handling library

export async function POST(request: NextRequest) {
    const { url, format } = await request.json();

    if (!url) {
        return new Response(JSON.stringify({ message: 'URL is required' }), { status: 400 });
    }

    try {
        const videoInfo = await ytdl.getInfo(url);
        const videoTitle = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, '');
        const fileName = `${videoTitle}.${format}`;

        // Set up response headers
        const responseHeaders = new Headers();
        responseHeaders.set('Content-Disposition', `attachment; filename="${fileName}"`);
        responseHeaders.set('Content-Type', format === 'mp3' ? 'audio/mpeg' : 'video/mp4');

        // Create a ReadableStream from ytdl
        const stream = ytdl(url, {
            filter: format === 'mp3' ? 'audioonly' : 'videoandaudio',
            quality: format === 'mp3' ? 'highestaudio' : 'highest',
        });

        // Create a PassThrough stream to properly handle the stream piping
        const passThrough = new PassThrough();

        // Use pump to ensure complete data transfer
        await pump(stream, passThrough);

        // Return a new Response object with the PassThrough stream
        return new Response(passThrough as any, {
            headers: responseHeaders,
        });
    } catch (error) {
        console.error('Error downloading video:', error);
        return new Response(JSON.stringify({ message: 'Error downloading video' }), { status: 500 });
    }
}