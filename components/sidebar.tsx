"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  LayoutGrid,
  Settings,
  ShoppingBag,
  Users,
  DollarSign,
  Calendar,
  LinkIcon,
  Package,
  Grid3x3,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { ProfileHeader } from "@/components/profile-header"

interface SidebarProps {
  isMobile?: boolean
  onItemClick?: () => void
}

export function Sidebar({ isMobile = false, onItemClick }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()

  const mainNavItems = [
    {
      name: "My Linktree",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "My Shop",
      href: "/shop",
      icon: ShoppingBag,
    },
    {
      name: "Earnings",
      href: "/earnings",
      icon: DollarSign,
    },
    {
      name: "Audience",
      href: "/audience",
      icon: Users,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Bento",
      href: "/bento",
      icon: Grid3x3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const toolsNavItems = [
    {
      name: "Social planner",
      href: "/social-planner",
      icon: Calendar,
    },
    {
      name: "Link shortener",
      href: "/link-shortener",
      icon: LinkIcon,
    },
    {
      name: "Media kit",
      href: "/media-kit",
      icon: Package,
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleItemClick = (e: React.MouseEvent, href: string) => {
    if (onItemClick) {
      e.preventDefault()
      router.push(href)
      onItemClick()
    }
  }

  const sidebarContent = (
    <>
      <ProfileHeader />

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Main</h2>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("sidebar-item", pathname === item.href && "sidebar-item-active")}
                  onClick={onItemClick ? (e) => handleItemClick(e, item.href) : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">TOOLS</h2>
            <div className="space-y-1">
              {toolsNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("sidebar-item", pathname === item.href && "sidebar-item-active")}
                  onClick={onItemClick ? (e) => handleItemClick(e, item.href) : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Logout button at bottom of sidebar */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 transition-colors duration-300">
        <button onClick={handleLogout} className="sidebar-item w-full">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  )

  if (isMobile) {
    return sidebarContent
  }

  return <aside className="sidebar">{sidebarContent}</aside>
}

