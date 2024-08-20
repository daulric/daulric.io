'use client'

import { useState } from 'react'

export default function NotificationForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      new Notification(title, { body })
      setTitle('')
      setBody('')
    } else {
      alert("Notification permission not granted.")
    }
  }

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-bold text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 text-lg block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter Notification Title"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-lg font-bold text-gray-300">
            Content
          </label>
          <textarea
            id="body"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 block w-full text-lg rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter Notification Content"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={sendNotification} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Publish Notification
          </button>
        </div>
      </div>
    </div>
  )
}