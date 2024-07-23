import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { unstable_noStore as noStore } from "next/cache"

const getBlogs = async () => {
    noStore()
    const data = new PrismaClient()

    const blog_data = await data.blog.findMany()

    console.log(blog_data)
    blog_data.sort((a, b) => b.blog_id - a.blog_id)
    return blog_data
}

function GetBlogCard(blog) {
    return (
        <div key={blog.id} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{blog.title}</h3>
                <p className="text-gray-400 mb-4">{blog.content}</p>
                <Link href={`/blog/${blog.blog_id}`} className="text-blue-400 hover:text-blue-300 transition duration-300">
                    Read more
                </Link>
            </div>
        </div>
    )
}

export default async function BlogPage() {
    const blogs = await getBlogs()

    return (
        <>
            <section className="bg-gray-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">Anonymous Blogs</h1>
                        <p className="text-xl mb-8">List of Anonymous Blogs created by Random People</p>
                        <Link href="/blog/create" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Create Anonymous Blog
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Latest Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <GetBlogCard {...blog} key={blog.blog_id} />
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}