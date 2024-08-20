'use client'

import NotificationForm from './NotifyForm'

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Notifications Dashboard</h1>
        <NotificationForm/>
    </div>
  )
}