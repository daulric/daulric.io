import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unstable_noStore as noStore } from "next/cache"

import Markdown from 'react-markdown';
import LikeButton from "./LikeButton"

export const metadata = {
  title: "Post",
}

async function getBlogPost(id) {
  noStore()

  const data = await fetch(`${process.env.NEXT_URL}/api/blog?id=${id}`, {
    method: "GET",
  })

  if (!data.ok) {
    return null
  }

  const blog = await data.json()

  if (!blog || blog.length === 0 ) {
    return null;
  }

  return blog[0];
}

export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound();
  }

  const date = new Date(String(blog.timeCreated))

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>
        <div className="flex items-center space-x-4 text-gray-400 mb-6">
          <span className="text-gray-400">{date.toUTCString()}</span>
          <LikeButton id={params.id} />
        </div>
        <div>
          <Markdown className="prose prose-invert max-w-none whitespace-pre-line" >
            {blog.content}
          </Markdown>
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition duration-300">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    </div>
  );
}