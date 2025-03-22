"use client"

import { useSettings } from "@/contexts/settings-context"

export function ProfileHeader() {
  const { displayName, profileImage } = useSettings()

  // Get initials for avatar fallback
  const getInitials = () => {
    return displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex items-center gap-2 border-b p-4 dark:border-gray-800 transition-colors duration-300">
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-red-500">
        {profileImage ? (
          <img src={profileImage || "/placeholder.svg"} alt={displayName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-semibold text-white">{getInitials()}</span>
        )}
      </div>
      <span className="font-medium dark:text-white transition-colors duration-300">{displayName}</span>
    </div>
  )
}

