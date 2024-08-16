"use client"
import { Fragment, useEffect } from "react"

export default function RequestNotificationAccess() {
    
    useEffect(() => {
        if ("Notification" in window) {
            if (Notification.permission === "granted") return;
            Notification.requestPermission()
        }
    }, [])

    return <Fragment />
}