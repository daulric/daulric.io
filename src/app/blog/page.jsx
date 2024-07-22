import Link from "next/link"

export default function BlogPage() {
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
        </>
    )
}