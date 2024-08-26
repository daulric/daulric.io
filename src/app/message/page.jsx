import { redirect } from "next/navigation"
import axios from "axios"

export const metadata = {
  title: "Message",
  description: "Send an Anonymous Message",
}

async function SendMessage(FormData) {
  "use server"
  const { name, message } = Object.fromEntries(FormData)

  

  const response = await axios.post(`${process.env.NEXT_URL}/api/message`, {
    name: name,
    message: message,
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.status === 500) {
    return redirect("/message/failed")
  }

  const data = response.data

  switch (data.success) {
    case true:
      return redirect("/message/success")
    
    case false:
      return redirect("/message/failed")

    default:
      return redirect("/message/failed")
  }
}


export default function MessagePage() {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Send an Anonymous Message
            </h2>
          </div>
          <form action={SendMessage} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }