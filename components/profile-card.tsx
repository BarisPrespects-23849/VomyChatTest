"use client"

import { useState } from "react"
import { EditButton, EditProfileModal } from "@/components/edit-profile-modal"
import { SocialIcons } from "@/components/social-icons"
import { useSettings } from "@/contexts/settings-context"

interface ProfileCardProps {
  variant?: "default" | "compact" | "hero"
  showEditButtons?: boolean
  className?: string
}

export function ProfileCard({ variant = "default", showEditButtons = true, className = "" }: ProfileCardProps) {
  const { displayName, bio, profileImage, themeSettings } = useSettings()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Get initials for avatar fallback
  const getInitials = () => {
    return displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  // Render hero layout
  if (variant === "hero" || themeSettings.profileLayout === "hero") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {/* Hero background with avatar */}
        <div className="relative mb-6 w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-red-500 pt-16">
          <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 translate-y-1/2 transform overflow-hidden rounded-full border-4 border-white dark:border-gray-800">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-red-500 text-white">
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold">{getInitials()}</span>
              )}
            </div>
            {showEditButtons && (
              <button
                className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={() => setIsEditModalOpen(true)}
                aria-label="Edit profile picture"
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
                  className="h-3 w-3"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Name and Bio with spacing for avatar */}
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-semibold dark:text-white transition-colors duration-300">{displayName}</h2>
            {showEditButtons && <EditButton onClick={() => setIsEditModalOpen(true)} />}
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{bio}</p>
            {showEditButtons && <EditButton onClick={() => setIsEditModalOpen(true)} />}
          </div>
        </div>

        {/* Social Icons */}
        <SocialIcons variant={variant} />

        {/* Edit Modal */}
        {showEditButtons && <EditProfileModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />}
      </div>
    )
  }

  // Default/compact layout
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Avatar */}
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-red-500">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {profileImage ? (
            <img src={profileImage || "/placeholder.svg"} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-semibold">{getInitials()}</span>
          )}
        </div>
        {showEditButtons && (
          <button
            className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit profile picture"
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
              className="h-3 w-3"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
        )}
      </div>

      {/* Name and Bio */}
      <div className="text-center">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold dark:text-white transition-colors duration-300">{displayName}</h2>
          {showEditButtons && <EditButton onClick={() => setIsEditModalOpen(true)} />}
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{bio}</p>
          {showEditButtons && <EditButton onClick={() => setIsEditModalOpen(true)} />}
        </div>
      </div>

      {/* Social Icons */}
      <SocialIcons variant={variant} />

      {/* Edit Modal */}
      {showEditButtons && <EditProfileModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />}
    </div>
  )
}

