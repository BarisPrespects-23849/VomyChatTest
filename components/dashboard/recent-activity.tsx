"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Generate random activity data
const generateActivityData = () => {
  const activities = [
    {
      type: "view",
      message: "Someone viewed your profile",
      icon: (
        <div className="rounded-full bg-purple-100 p-2 text-purple-600">
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      ),
    },
    {
      type: "click",
      message: "Someone clicked on your link",
      icon: (
        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
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
            <path d="M15 15H9v6l-7-7 7-7v6h6V6l7 7-7 7z" />
          </svg>
        </div>
      ),
    },
    {
      type: "purchase",
      message: "Someone purchased your product",
      icon: (
        <div className="rounded-full bg-green-100 p-2 text-green-600">
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
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
      ),
    },
    {
      type: "follow",
      message: "Someone followed you",
      icon: (
        <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M19 8v6" />
            <path d="M22 11h-6" />
          </svg>
        </div>
      ),
    },
  ]

  const result = []
  const now = new Date()

  for (let i = 0; i < 5; i++) {
    const minutesAgo = Math.floor(Math.random() * 60)
    const activity = activities[Math.floor(Math.random() * activities.length)]

    result.push({
      ...activity,
      id: `activity-${i}`,
      time: minutesAgo === 0 ? "just now" : `${minutesAgo} min ago`,
    })
  }

  return result
}

export function RecentActivity() {
  const [activities, setActivities] = useState(generateActivityData())

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Occasionally add a new activity
      if (Math.random() > 0.7) {
        const newActivities = [...activities]
        const newActivity = generateActivityData()[0]
        newActivity.time = "just now"
        newActivities.unshift(newActivity)

        if (newActivities.length > 5) {
          newActivities.pop()
        }

        setActivities(newActivities)
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [activities])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest activity on your Vomy Chat</CardDescription>
        </div>
        <Badge variant="outline" className="text-xs">
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={activity.id} className="flex items-center gap-4">
              {activity.icon}
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

