import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import ytdl from '@distube/ytdl-core';
import { PassThrough } from 'stream';

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^\x00-\x7F]/g, ''); // Replace non-ASCII characters with empty string
}

export async function GET () {
  return NextResponse.json({
    message: "ok",
  }, {status: 200});
}

export async function POST(request: NextRequest) {
  const { url, format } = (await request.json()) as { url: string; format: 'mp3' | 'mp4' };

  if (!url) {
    return new NextResponse(JSON.stringify({ message: 'URL is required' }), { status: 400 });
  }

  try {
    const isAudio = format === 'mp3';
    const contentType = isAudio ? 'audio/mpeg' : 'video/mp4';
    const filter = isAudio ? 'audioonly' : 'videoandaudio';

    // Use YouTube Data API to get video details
    const videoId = extractVideoId(url);
    const videoDetails = await getVideoDetails(videoId);

    const originalFileName = `${videoDetails.title}.${isAudio ? 'mp3' : 'mp4'}`;
    const sanitizedFileName = sanitizeFileName(originalFileName);

    const stream = ytdl(url, {
      filter,
      quality: isAudio ? 'highestaudio' : 'highest',
    });

    const passThrough = new PassThrough();
    stream.pipe(passThrough);

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${sanitizedFileName}"`,
    });

    return new NextResponse(new ReadableStream({
      start(controller) {
        passThrough.on('data', (chunk) => controller.enqueue(chunk));
        passThrough.on('end', () => controller.close());
        passThrough.on('error', (err) => controller.error(err));
      },
    }), {
      headers,
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    return new NextResponse(JSON.stringify({ message: 'Error downloading video: ' + (error as Error).message }), { status: 500 });
  }
}

// Helper to extract video ID from URL
function extractVideoId(url: string): string {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get('v');
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  return videoId;
}

// Use YouTube Data API to get video details
async function getVideoDetails(videoId: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('YouTube API key not set');
  }

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
  });

  const response = await youtube.videos.list({
    id: [videoId],
    part: ['snippet'],
  });

  const video = response.data.items?.[0];
  if (!video) {
    throw new Error('Video not found');
  }

  return {
    title: video.snippet?.title || 'download',
  };
}