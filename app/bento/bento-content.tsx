"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSettings } from "@/contexts/settings-context"
import { MobilePreview } from "@/components/mobile-preview"
import { BentoBlock } from "@/components/bento/bento-block"
import { BentoBlockEditor } from "@/components/bento/bento-block-editor"
import {
  Share2,
  Eye,
  Settings,
  Plus,
  Youtube,
  MapPin,
  Music,
  Video,
  Link,
  MessageSquareQuote,
  ImageIcon,
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Calendar,
  Mail,
  Clock,
} from "lucide-react"

// Block type definitions
export type BlockSize = "1x1" | "1x2" | "2x1" | "2x2"
export type BlockType =
  | "profile"
  | "youtube"
  | "map"
  | "music"
  | "video"
  | "link"
  | "note"
  | "photo"
  | "instagram"
  | "twitter"
  | "github"
  | "linkedin"
  | "calendar"
  | "email"
  | "clock"

export interface BentoBlockItem {
  id: string
  type: BlockType
  title: string
  content: string
  size: BlockSize
  color?: string
  url?: string
  image?: string
  active: boolean
}

export function BentoContent() {
  const { displayName, bio } = useSettings()
  const [editingBlock, setEditingBlock] = useState<BentoBlockItem | null>(null)

  // Block type configurations
  const blockTypes: Record<BlockType, { icon: React.ReactNode; label: string; description: string }> = {
    profile: {
      icon: (
        <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 text-white">
          {displayName
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        </div>
      ),
      label: "Profile",
      description: "Your profile information",
    },
    youtube: {
      icon: <Youtube className="text-red-500" />,
      label: "YouTube",
      description: "Add a YouTube channel or video",
    },
    map: {
      icon: <MapPin className="text-blue-500" />,
      label: "Map",
      description: "Show a location on a map",
    },
    music: {
      icon: <Music className="text-green-500" />,
      label: "Music",
      description: "Share your favorite music",
    },
    video: {
      icon: <Video className="text-orange-500" />,
      label: "Video",
      description: "Embed a video from any platform",
    },
    link: {
      icon: <Link className="text-gray-700 dark:text-gray-300" />,
      label: "Link",
      description: "Add a custom link",
    },
    note: {
      icon: <MessageSquareQuote className="text-blue-400" />,
      label: "Note",
      description: "Add a text note or quote",
    },
    photo: {
      icon: <ImageIcon className="text-amber-500" />,
      label: "Photo",
      description: "Share a photo or image",
    },
    instagram: {
      icon: <Instagram className="text-pink-600" />,
      label: "Instagram",
      description: "Connect your Instagram",
    },
    twitter: {
      icon: <Twitter className="text-blue-400" />,
      label: "Twitter",
      description: "Connect your Twitter",
    },
    github: {
      icon: <Github className="text-gray-800 dark:text-gray-200" />,
      label: "GitHub",
      description: "Show your GitHub profile",
    },
    linkedin: {
      icon: <Linkedin className="text-blue-700" />,
      label: "LinkedIn",
      description: "Connect your LinkedIn",
    },
    calendar: {
      icon: <Calendar className="text-violet-500" />,
      label: "Calendar",
      description: "Schedule meetings",
    },
    email: {
      icon: <Mail className="text-red-400" />,
      label: "Email",
      description: "Add your email contact",
    },
    clock: {
      icon: <Clock className="text-teal-500" />,
      label: "Clock",
      description: "Show your local time",
    },
  }

  // Initial blocks
  const [blocks, setBlocks] = useState<BentoBlockItem[]>([
    {
      id: "profile",
      type: "profile",
      title: displayName || "Your Name",
      content: bio || "Your bio...",
      size: "2x1",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      active: true,
    },
    {
      id: "youtube",
      type: "youtube",
      title: "YouTube",
      content: "Subscribe to my channel",
      size: "1x1",
      color: "bg-red-50 dark:bg-red-900/20",
      url: "https://youtube.com",
      active: true,
    },
    {
      id: "note",
      type: "note",
      title: "Note",
      content: "Vomy Chat - Connect, Share, and Thrive Together!",
      size: "2x1",
      color: "bg-blue-50 dark:bg-blue-900/20",
      active: true,
    },
    {
      id: "photo",
      type: "photo",
      title: "Photo",
      content: "My latest adventure",
      size: "1x1",
      color: "bg-amber-50 dark:bg-amber-900/20",
      image: "/placeholder.svg?height=200&width=200",
      active: true,
    },
  ])

  // Handle adding a new block
  const handleAddBlock = (type: BlockType) => {
    const newBlock: BentoBlockItem = {
      id: `block-${Date.now()}`,
      type,
      title: blockTypes[type].label,
      content: blockTypes[type].description,
      size: "1x1",
      color: getDefaultColorForType(type),
      active: true,
    }

    setBlocks([...blocks, newBlock])
    setEditingBlock(newBlock)
  }

  // Get default color based on block type
  const getDefaultColorForType = (type: BlockType): string => {
    const colorMap: Record<BlockType, string> = {
      profile: "bg-gradient-to-r from-purple-500 to-pink-500",
      youtube: "bg-red-50 dark:bg-red-900/20",
      map: "bg-blue-50 dark:bg-blue-900/20",
      music: "bg-green-50 dark:bg-green-900/20",
      video: "bg-orange-50 dark:bg-orange-900/20",
      link: "bg-gray-50 dark:bg-gray-800",
      note: "bg-blue-50 dark:bg-blue-900/20",
      photo: "bg-amber-50 dark:bg-amber-900/20",
      instagram: "bg-pink-50 dark:bg-pink-900/20",
      twitter: "bg-blue-50 dark:bg-blue-900/20",
      github: "bg-gray-50 dark:bg-gray-800",
      linkedin: "bg-blue-50 dark:bg-blue-900/20",
      calendar: "bg-violet-50 dark:bg-violet-900/20",
      email: "bg-red-50 dark:bg-red-900/20",
      clock: "bg-teal-50 dark:bg-teal-900/20",
    }

    return colorMap[type]
  }

  // Handle updating a block
  const handleUpdateBlock = (updatedBlock: BentoBlockItem) => {
    setBlocks(blocks.map((block) => (block.id === updatedBlock.id ? updatedBlock : block)))
    setEditingBlock(null)
  }

  // Handle removing a block
  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
    if (editingBlock?.id === id) {
      setEditingBlock(null)
    }
  }

  // Handle editing a block
  const handleEditBlock = (block: BentoBlockItem) => {
    setEditingBlock(block)
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Bento</h1>
          <p className="page-description">Create a beautiful grid layout for your profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="action-button">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="action-button">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" className="primary-button">
            <Share2 className="h-4 w-4 mr-2" />
            Share my Bento
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid-layout-2-1">
        {/* Bento grid editor */}
        <div>
          {/* Profile section */}
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="avatar avatar-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {displayName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {displayName || "Your Name"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">{bio || "Your bio..."}</p>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {blocks
              .filter((block) => block.active)
              .map((block) => (
                <BentoBlock
                  key={block.id}
                  block={block}
                  onEdit={() => handleEditBlock(block)}
                  onRemove={() => handleRemoveBlock(block.id)}
                  blockTypes={blockTypes}
                />
              ))}

            {/* Add block button */}
            <Card className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gray-300 bg-transparent p-4 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 dark:hover:text-gray-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Add Block</span>
            </Card>
          </div>

          {/* Block type selection */}
          <div className="mt-8 section">
            <h3 className="section-title">Add a Block</h3>
            <div className="grid-cols-1-5">
              {Object.entries(blockTypes).map(([type, { icon, label }]) => (
                <Card
                  key={type}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4 transition-all hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800"
                  onClick={() => handleAddBlock(type as BlockType)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile preview */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="section-title">Preview</h3>
            <MobilePreview />
          </div>
        </div>
      </div>

      {/* Block editor modal */}
      {editingBlock && (
        <BentoBlockEditor
          block={editingBlock}
          onSave={handleUpdateBlock}
          onCancel={() => setEditingBlock(null)}
          blockTypes={blockTypes}
        />
      )}
    </div>
  )
}

