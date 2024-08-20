import Link from 'next/link'

export default function NotFound({text, status, linkText, link}: {text?: string, status?: string, linkText?: string, link?: string}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold">{status ? status : 404}</h1>
      <br/>
      <p className="mt-2 text-xl font-semibold">{ text ? text : "Sorry, the page you're looking for isn't here."}</p>
      <br/>
      <Link href={link ? link : "/"} className="mt-4 text-lg font-semibold underline hover:text-gray-400">
        {linkText ? linkText : "Go back home"}
      </Link>
    </div>
  )
}