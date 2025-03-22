"use client"

import { useState, useEffect } from "react"
import { BentoHeader } from "@/components/bento/bento-header"
import { BentoEditor } from "@/components/bento/bento-editor"
import { BentoPreview } from "@/components/bento/bento-preview"
import { BentoBlockEditor } from "@/components/bento/bento-block-editor"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { BentoBlockItem, BlockType } from "@/components/bento/bento-types"
import { blockTypeConfig } from "@/components/bento/bento-config"
import { useSettings } from "@/contexts/settings-context"
import { preventBodyScroll } from "@/lib/utils"

export function BentoLayout() {
  const { displayName, bio } = useSettings()
  const [editingBlock, setEditingBlock] = useState<BentoBlockItem | null>(null)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

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
    // Scroll to top before opening dialog to ensure it's visible
    window.scrollTo({ top: 0, behavior: "smooth" })

    const newBlock: BentoBlockItem = {
      id: `block-${Date.now()}`,
      type,
      title: blockTypeConfig[type].label,
      content: blockTypeConfig[type].description,
      size: "1x1",
      color: getDefaultColorForType(type),
      active: true,
    }

    setBlocks([...blocks, newBlock])

    // Short delay to ensure smooth scrolling before opening dialog
    setTimeout(() => {
      setEditingBlock(newBlock)
    }, 300)
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
    // Scroll to top before opening dialog to ensure it's visible
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Short delay to ensure smooth scrolling before opening dialog
    setTimeout(() => {
      setEditingBlock(block)
    }, 300)
  }

  // Toggle mobile preview
  const toggleMobilePreview = () => {
    setShowMobilePreview(!showMobilePreview)
  }

  // Manage body scroll when dialog is open
  useEffect(() => {
    preventBodyScroll(!!editingBlock)
    return () => preventBodyScroll(false)
  }, [editingBlock])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <BentoHeader
        isMobile={isMobile}
        showMobilePreview={showMobilePreview}
        toggleMobilePreview={toggleMobilePreview}
      />

      {/* Mobile preview (only shown when toggled on mobile) */}
      {isMobile && showMobilePreview && (
        <div className="mb-8">
          <BentoPreview blocks={blocks} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="lg:col-span-2 xl:col-span-3">
          <BentoEditor
            blocks={blocks}
            onAddBlock={handleAddBlock}
            onEditBlock={handleEditBlock}
            onRemoveBlock={handleRemoveBlock}
          />
        </div>

        {/* Desktop/Tablet preview */}
        {!isMobile && (
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
              <BentoPreview blocks={blocks} />
            </div>
          </div>
        )}
      </div>

      {/* Block editor modal */}
      {editingBlock && (
        <BentoBlockEditor block={editingBlock} onSave={handleUpdateBlock} onCancel={() => setEditingBlock(null)} />
      )}
    </div>
  )
}

