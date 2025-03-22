"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AnalyticsOverview() {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    clickThroughRate: 0,
    avgTimeOnPage: 0,
  })

  // Simulate data loading and updates
  useEffect(() => {
    const initialStats = {
      totalViews: 12483,
      totalClicks: 3241,
      clickThroughRate: 25.96,
      avgTimeOnPage: 87,
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setStats(initialStats)
    }, 500)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) => {
        const newViews = prev.totalViews + Math.floor(Math.random() * 5)
        const newClicks = prev.totalClicks + Math.floor(Math.random() * 2)
        return {
          totalViews: newViews,
          totalClicks: newClicks,
          clickThroughRate: Number.parseFloat(((newClicks / newViews) * 100).toFixed(2)),
          avgTimeOnPage: prev.avgTimeOnPage + Math.floor(Math.random() * 3) - 1,
        }
      })
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
              <p className="mt-1 flex items-center text-xs text-green-600">
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
                  className="mr-1 h-3 w-3"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span>+20.1% from last week</span>
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3 text-purple-600">
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
                className="h-6 w-6"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.totalClicks.toLocaleString()}</h3>
              <p className="mt-1 flex items-center text-xs text-green-600">
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
                  className="mr-1 h-3 w-3"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span>+15.3% from last week</span>
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
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
                className="h-6 w-6"
              >
                <path d="M15 15H9v6l-7-7 7-7v6h6V6l7 7-7 7z" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Click-Through Rate</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.clickThroughRate}%</h3>
              <p className="mt-1 flex items-center text-xs text-green-600">
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
                  className="mr-1 h-3 w-3"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span>+2.5% from last month</span>
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
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
                className="h-6 w-6"
              >
                <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" />
                <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
                <path d="M18 22V5l-6-3-6 3v17" />
                <path d="M12 7v5" />
                <path d="M10 9h4" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Time on Page</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.avgTimeOnPage}s</h3>
              <p className="mt-1 flex items-center text-xs text-green-600">
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
                  className="mr-1 h-3 w-3"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span>+8.3% from last month</span>
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
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
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

