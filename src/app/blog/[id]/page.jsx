import { notFound } from 'next/navigation';
import Link from 'next/link';

import { PrismaClient } from "@prisma/client"

async function getBlogPost(id) {

  const data = new PrismaClient()

  let blog = await data.blog.findUnique({
      where: { blog_id: Number(id) },
  })

  if (!blog) {
    return null;
  }

  return blog;
}

export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-400 mb-6">
          <span>{String(blog.timeCreated)}</span>
        </div>
        <div className="prose prose-invert max-w-none whitespace-pre-line">
          <p>{blog.content}</p>
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