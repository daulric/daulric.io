import Link from 'next/link';
import { notFound } from 'next/navigation';
import "./style.css"

export default function MessageStatus({ params }) {
  const { status } = params;

  let message, bgColor, icon;

  switch (status) {
    case 'success':
      message = 'Message sent successfully!';
      icon = '✅';
      break;
    case 'failed':
      message = 'Message not sent. Please try again.';
      icon = '❌';
      break;
    default:
      notFound();
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl">{icon}</span>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">{message}</h1>
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-block bg-blue-100 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            id="page-btn"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}