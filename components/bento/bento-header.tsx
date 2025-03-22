"use client"

import { Button } from "@/components/ui/button"
import { Eye, Settings, Share2 } from "lucide-react"

interface BentoHeaderProps {
  isMobile: boolean
  showMobilePreview: boolean
  toggleMobilePreview: () => void
}

export function BentoHeader({ isMobile, showMobilePreview, toggleMobilePreview }: BentoHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bento</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create a beautiful grid layout for your profile</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isMobile && (
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={toggleMobilePreview}>
              <Eye className="h-4 w-4 mr-2" />
              {showMobilePreview ? "Hide Preview" : "Show Preview"}
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1 sm:flex-none">
            <Share2 className="h-4 w-4 mr-2" />
            Share my Bento
          </Button>
        </div>
      </div>
    </div>
  )
}

