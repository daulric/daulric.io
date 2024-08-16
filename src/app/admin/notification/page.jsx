'use client'

import { useState, useEffect } from 'react'
import NotificationForm from './NotifyForm'
import LoginForm from './LoginForm'

export default function NotificationsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (password) => {

    if (password === process.env.NEXT_PUBLIC_notify_pwd) {
      setIsLoggedIn(true)
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Notifications Dashboard</h1>
      {isLoggedIn ? (
        <NotificationForm onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}