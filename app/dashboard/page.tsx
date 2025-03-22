"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProfileCard } from "@/components/profile-card"
import { ProfileLinks } from "@/components/profile-links"
import { MobilePreview } from "@/components/mobile-preview"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* This div creates proper spacing from the sidebar */}
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">My Linktree</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/theme"
              className="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="dark:text-white transition-colors duration-300">Theme</span>
            </Link>
            <button className="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
              <span className="dark:text-white transition-colors duration-300">Share</span>
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium dark:text-white transition-colors duration-300">Analytics</h2>
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 transition-colors duration-300">
              <span className="sr-only">Expand</span>
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-2">
            <div className="space-y-6">
              {/* Profile Card */}
              <ProfileCard />

              {/* Links section */}
              <ProfileLinks />
            </div>
          </div>
          <div className="hidden md:block">
            <MobilePreview />
          </div>
        </div>
      </div>
    </div>
  )
}

