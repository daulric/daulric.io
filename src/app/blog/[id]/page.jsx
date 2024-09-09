import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unstable_noStore as noStore } from "next/cache"
import axios from "axios"
import Markdown from 'react-markdown';
import LikeButton from "./LikeButton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar } from 'lucide-react'

export const metadata = {
  title: "Post",
}

async function getBlogPost(id) {
  noStore()

  const {data : blog, status} = await axios.get(`${process.env.NEXT_URL}/api/blog`, {
    params: {
      id: id,
    }
  })

  if (status !== 200) {
    return null
  }

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
    <div className="bg-gray-900 text-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center text-gray-100">{blog.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-gray-400 mt-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{date.toUTCString()}</span>
              </div>
              <LikeButton id={params.id} />
            </div>
          </CardHeader>
          <Separator className="bg-gray-700" />
          <CardContent className="pt-6">
            <Markdown className="prose prose-invert max-w-none whitespace-pre-line text-gray-100">
              {blog.content}
            </Markdown>
          </CardContent>
          <Separator className="bg-gray-700" />
          <CardFooter className="justify-center pt-6">
            <Button variant="ghost" asChild className="text-blue-400 hover:text-blue-300 hover:bg-gray-700">
              <Link href="/blog">
                ← Back to all blogs
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}