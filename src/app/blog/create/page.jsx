import React from 'react';
import { redirect } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PenIcon } from "lucide-react";

export const metadata = {
  title: "Blog - Create",
  description: "Create Your Very Own Blog",
};

async function handlePost(formData) {
  "use server";

  const { title, content } = Object.fromEntries(formData); // Capture data from the form.

  // Posting the Form data
  const { data: blog_data, status } = await axios.post(`${process.env.NEXT_URL}/api/blog`, {
    title: title,
    content: content,
  });

  if (blog_data === null || blog_data.blog_id === null) {
    console.log("Error Retrieving Posted Data!") // This should rarely happen!
    return
  }

  if (status !== 200) {
    console.log("Unexpected status code") // This should always return 200.
    return
  }

  return redirect(`/blog/${blog_data.blog_id}`); // Redirects to the given blog id.
}

export default function CreateBlog() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center flex items-center justify-center text-white">
            <PenIcon className="w-8 h-8 mr-2 text-indigo-400" />
            Create a New Blog Post
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Share your thoughts with the world
          </CardDescription>
        </CardHeader>
        <form action={handlePost}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-200">Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Enter your blog post title"
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-200">Content</Label>
              <Textarea
                id="content"
                name="content"
                required
                placeholder="Write your blog post here..."
                className="min-h-[200px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Publish Blog Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}