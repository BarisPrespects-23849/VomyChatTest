// Improve the BentoBlock component for better interaction
"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { BentoBlockItem, BlockType } from "./bento-content"
import { cn } from "@/lib/utils"

interface BentoBlockProps {
  block: BentoBlockItem
  onEdit: () => void
  onDelete: () => void
  blockTypes: Record<BlockType, { icon: React.ReactNode; label: string; description: string }>
  isMobile: boolean
}

export function BentoBlock({ block, onEdit, onDelete, blockTypes, isMobile }: BentoBlockProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine grid span based on block size
  const getGridSpan = () => {
    if (isMobile) return ""

    switch (block.size) {
      case "1x1":
        return "col-span-1 row-span-1"
      case "1x2":
        return "col-span-1 row-span-2"
      case "2x1":
        return "col-span-2 row-span-1"
      case "2x2":
        return "col-span-2 row-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  // Determine aspect ratio based on block size
  const getAspectRatio = () => {
    if (isMobile) return "aspect-square"

    switch (block.size) {
      case "1x1":
        return "aspect-square"
      case "1x2":
        return "aspect-[1/2]"
      case "2x1":
        return "aspect-[2/1]"
      case "2x2":
        return "aspect-square"
      default:
        return "aspect-square"
    }
  }

  return (
    <Card
      className={cn(
        getGridSpan(),
        block.color || "bg-gray-50 dark:bg-gray-800",
        "relative overflow-hidden transition-all duration-300 group",
        "border border-gray-200 dark:border-gray-700",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("flex h-full w-full flex-col p-4", getAspectRatio())}>
        {/* Block content */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm">
              {blockTypes[block.type].icon}
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{block.title}</h3>
          </div>

          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Block content */}
        <div className="mt-2 flex-1 overflow-hidden">
          {block.type === "photo" && block.image ? (
            <div className="h-full w-full overflow-hidden rounded-md">
              <img src={block.image || "/placeholder.svg"} alt={block.title} className="h-full w-full object-cover" />
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">{block.content}</p>
          )}
        </div>

        {/* Hover overlay with edit and delete buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/5 dark:bg-black/20 opacity-0 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          <Button onClick={onEdit} variant="secondary" className="bg-white/90 dark:bg-gray-800/90 shadow-md">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="destructive"
            className="bg-red-500/90 hover:bg-red-600/90 text-white shadow-md"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

