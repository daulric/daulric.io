import { redirect } from "next/navigation"

async function handlePost( FormData) {
  "use server"

  const { title, content } = Object.fromEntries(FormData)

  const data  = await fetch(`${process.env.NEXT_URL}/api/blog`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  if (data.ok) {
      const blog_data = await data.json()
      redirect(`/blog/${blog_data.blog_id}`)
  } else {
    throw new Error("Error Creating Post")
  }

}

export default function CreateBlog() {

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create a New Blog Post
          </h2>
        </div>
        <form action={handlePost} className="mt-8 space-y-6">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="content" className="sr-only">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="5"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Write your blog post here..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}