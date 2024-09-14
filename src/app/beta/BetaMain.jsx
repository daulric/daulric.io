'use client';

import { useState, useEffect } from 'react';
import BetaPage from "./BetaPage"
import links from "./links"

import AuthFormPage from "./AuthenticationForm"

export default function BetaHome() {
  const [isAuthed, setAuthed] = useState(false);
  const [cookieStore, setCookies] = useState({})

  useEffect(() => {
    let cookies = document.cookie.split(';');
    let temp_store = {}

    cookies.forEach(cookie => {
      let [name, value] = cookie.split('=')
      console.log(name, value)
      temp_store[name] = value
    })

    setCookies(temp_store)
  }, [setCookies])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Welcome To Beta Testing</h1>
        <h2 className="text-2xl font-semibold text-center text-blue-400">Access Preview Features on this Site</h2>
        { isAuthed || cookieStore["beta_access"] ? (
          <BetaPage links={links} />
        ) : (
          <AuthFormPage setAuthed={setAuthed} />
        )}
      </div>
    </div>
  );
}