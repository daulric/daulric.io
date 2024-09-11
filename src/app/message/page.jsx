import { redirect } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      <Card className="max-w-md w-full bg-gray-800 text-white border border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-white">
            Send an Anonymous Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={SendMessage} className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="bg-gray-700 text-white placeholder-gray-500 border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={5}
                required
                className="bg-gray-700 text-white border-gray-600 placeholder-gray-500"
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
