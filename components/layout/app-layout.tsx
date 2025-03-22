"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

// Paths that should not show navigation
const publicPaths = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/about",
  "/features",
  "/pricing",
  "/contact",
  "/terms",
  "/privacy",
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()

  // Check if current path is a public path
  const isPublicPath =
    publicPaths.includes(pathname) || pathname.startsWith("/reset-password") || pathname.startsWith("/verify")

  // Determine if we should show navigation
  const showNavigation = isAuthenticated && !isPublicPath

  // For dashboard paths, we need a different layout
  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/earnings") ||
    pathname.startsWith("/audience") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/bento") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/social-planner") ||
    pathname.startsWith("/link-shortener") ||
    pathname.startsWith("/media-kit")

  if (isLoading) {
    // Loading spinner with improved styling
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (showNavigation) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className={`flex-1 ${isDashboardPath ? "md:ml-64" : ""} transition-all duration-300`}>{children}</main>
        </div>
      </div>
    )
  }

  // For public pages, render without navigation but with consistent styling
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">{children}</div>
}

