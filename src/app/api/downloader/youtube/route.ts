import { NextRequest } from 'next/server';
import ytdl from '@distube/ytdl-core';
import { PassThrough } from 'stream';

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^\x00-\x7F]/g, ''); // Replace non-ASCII characters with underscore
}

export async function POST(request: NextRequest) {
  const { url, format } = await request.json() as { url: string; format: 'mp3' | 'mp4' };

  if (!url) {
    return new Response(JSON.stringify({ message: 'URL is required' }), { status: 400 });
  }

  try {
    const isAudio = format === 'mp3';
    const contentType = isAudio ? 'audio/mpeg' : 'video/mp4';
    const filter = isAudio ? 'audioonly' : 'videoandaudio';
    
    const info = await ytdl.getInfo(url);
    const originalFileName = `${info.videoDetails.title}.${isAudio ? 'mp3' : 'mp4'}`;
    const sanitizedFileName = sanitizeFileName(originalFileName);

    const stream = ytdl(url, {
      filter,
      quality: 'highestaudio',
    });

    const passThrough = new PassThrough();
    stream.pipe(passThrough);

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${sanitizedFileName}"`,
    });

    return new Response(new ReadableStream({
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
    return new Response(JSON.stringify({ message: 'Error downloading video: ' + (error as Error).message }), { status: 500 });
  }
}