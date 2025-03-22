"use client"

import { Bell, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useSettings } from "@/contexts/settings-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"

export function Navbar() {
  const { user, logout } = useAuth()
  const { displayName } = useSettings()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!user) return "VC"

    return user.displayName
      ? user.displayName
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()
      : user.username.substring(0, 2).toUpperCase()
  }

  return (
    <>
      <header className="navbar">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>

          {/* Logo - visible on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-red-500">
              <span className="text-sm font-semibold text-white">VC</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Vomy Chat
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:ml-auto">
          <ThemeToggle size="icon" />

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                <div className="avatar">
                  <span>{getInitials()}</span>
                </div>
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:inline-block transition-colors duration-300">
                  {user?.displayName || displayName || user?.username}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/earnings")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-header">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-red-500">
                <span className="text-sm font-semibold text-white">VC</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Vomy Chat</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="mobile-nav-content">
            <Sidebar isMobile={true} onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

