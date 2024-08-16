'use client'

import { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-gray-800 py-8 px-6 shadow-md rounded-lg sm:px-10">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-100">
          Login to Notifications
        </h2>
        <form onSubmit={handleSubmit} className="mb-0 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-600 px-3 py-2 rounded-lg shadow-sm bg-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}