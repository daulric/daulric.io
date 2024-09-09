import React from 'react';
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from 'lucide-react';

export const metadata = {
    title: "Blogs",
    description: "View Some Exciting / Boring Blogs"
};

const getBlogs = async () => {
    noStore();

    const { data, status } = await axios.get(`${process.env.NEXT_URL}/api/blog`, {
        params: {
            descending: true,
        }
    });

    if (status === 200) {
        return data;
    } else {
        throw new Error("daulric den blog server error");
    }
};

// Function to strip Markdown and limit content to 10 words
function getContentSnippet(content) {
    // Simple regex to remove common Markdown syntax
    const strippedContent = content.replace(/([_*#\[\]()]+)|\[.*?\]\(.*?\)/g, '').trim();
    const words = strippedContent.split(/\s+/);
    if (words.length <= 10) return strippedContent;
    return words.slice(0, 10).join(' ') + '...';
}

function BlogCard({ blog }) {
    const date = new Date(blog.timeCreated).toLocaleDateString();
    const readTime = `${Math.ceil(blog.content.split(' ').length / 200)} min read`;
    const contentSnippet = getContentSnippet(blog.content);

    return (
        <Card className="bg-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-700">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-100">{blog.title}</h3>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                        {blog.category}
                    </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {date}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {readTime}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="py-4">
                <p className="text-gray-300">{contentSnippet}</p>
            </CardContent>
            <CardFooter className="bg-gray-750 border-t border-gray-700">
                <Button variant="ghost" asChild className="text-blue-400 hover:text-blue-300 hover:bg-gray-700">
                    <Link href={`/blog/${blog.blog_id}`}>
                        Read more
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="bg-gray-900 min-h-screen">
            <section className="bg-gray-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">Anonymous Blogs</h1>
                        <p className="text-xl mb-8">List of Anonymous Blogs created by Random People</p>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/blog/create">
                                Create Anonymous Blog
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Latest Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <BlogCard blog={blog} key={blog.blog_id} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}