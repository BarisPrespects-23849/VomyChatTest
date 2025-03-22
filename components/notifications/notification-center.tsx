"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSettings } from "@/contexts/settings-context"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Milestone Reached!",
    message: "Congratulations! You've reached 10,000 total views on your Vomy Chat.",
    time: "10 minutes ago",
    read: false,
    type: "success",
  },
  {
    id: "n2",
    title: "Payment Processed",
    message: "Your monthly payout of $245.87 has been processed and will arrive in 2-3 business days.",
    time: "2 hours ago",
    read: false,
    type: "info",
  },
  {
    id: "n3",
    title: "Traffic Spike Detected",
    message: "Your profile is experiencing unusually high traffic. Check your analytics for more details.",
    time: "5 hours ago",
    read: false,
    type: "warning",
  },
  {
    id: "n4",
    title: "New Feature Available",
    message: "We've added new analytics features to help you track your audience better.",
    time: "1 day ago",
    read: true,
    type: "info",
  },
  {
    id: "n5",
    title: "Link Performance Alert",
    message: "Your 'Premium Features' link has seen a 25% drop in clicks this week.",
    time: "2 days ago",
    read: true,
    type: "error",
  },
]

export function NotificationCenter({ onClose }: { onClose: () => void }) {
  const { notificationPreferences } = useSettings()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Filter notifications based on user preferences
  useEffect(() => {
    let filteredNotifications = [...mockNotifications]

    // If email notifications for purchases are disabled, filter out payment notifications
    if (!notificationPreferences.emailPurchases) {
      filteredNotifications = filteredNotifications.filter(
        (n) => !(n.title.includes("Payment") || n.message.includes("payout")),
      )
    }

    // If push notifications for milestones are disabled, filter out milestone notifications
    if (!notificationPreferences.pushMilestones) {
      filteredNotifications = filteredNotifications.filter((n) => !n.title.includes("Milestone"))
    }

    setNotifications(filteredNotifications)
  }, [notificationPreferences])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getIconForType = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return (
          <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )
      case "warning":
        return (
          <div className="rounded-full bg-yellow-100 p-2 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
          </div>
        )
      case "error":
        return (
          <div className="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-400 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" x2="9" y1="9" y2="15" />
              <line x1="9" x2="15" y1="9" y2="15" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="p-4 dark:text-gray-200 transition-colors duration-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </div>

        <TabsContent value="all" className="mt-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 rounded-lg border p-3 transition-colors duration-300 ${
                    notification.read
                      ? "bg-white dark:bg-gray-800 dark:border-gray-700"
                      : "bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {getIconForType(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {notification.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                No unread notifications
              </p>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="flex gap-3 rounded-lg border bg-blue-50 p-3 dark:bg-blue-900/20 dark:border-blue-900/30 transition-colors duration-300"
                    onClick={() => markAsRead(notification.id)}
                  >
                    {getIconForType(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          {notification.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

