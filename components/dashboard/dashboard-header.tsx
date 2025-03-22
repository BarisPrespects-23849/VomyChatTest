"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useSettings } from "@/contexts/settings-context"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { notificationPreferences } = useSettings()

  // Calculate notification count based on preferences
  const getNotificationCount = () => {
    // Base count
    let count = 3

    // Reduce count if certain notification types are disabled
    if (!notificationPreferences.emailProfileViews) count--
    if (!notificationPreferences.pushMilestones) count--

    return Math.max(0, count)
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
          Welcome back! Here's an overview of your Vomy Chat performance.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select className="rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 transition-colors duration-300">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>All time</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <ThemeToggle size="icon" />

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
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
              className="h-5 w-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {getNotificationCount() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {getNotificationCount()}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 transition-colors duration-300">
              <NotificationCenter onClose={() => setShowNotifications(false)} />
            </div>
          )}
        </div>

        <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors duration-300">
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
            className="mr-2 h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Export Report
        </Button>
      </div>
    </div>
  )
}

