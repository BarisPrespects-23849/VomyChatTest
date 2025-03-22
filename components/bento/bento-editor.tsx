"use client"

import { useSettings } from "@/contexts/settings-context"
import { BentoBlock } from "@/components/bento/bento-block"
import type { BentoBlockItem, BlockType } from "@/components/bento/bento-types"
import { blockTypeConfig } from "@/components/bento/bento-config"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BentoEditorProps {
  blocks: BentoBlockItem[]
  onAddBlock: (type: BlockType) => void
  onEditBlock: (block: BentoBlockItem) => void
  onRemoveBlock: (id: string) => void
}

export function BentoEditor({ blocks, onAddBlock, onEditBlock, onRemoveBlock }: BentoEditorProps) {
  const { displayName, bio } = useSettings()
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="space-y-8">
      {/* Profile section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-bold text-white shrink-0">
          {displayName
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{displayName || "Your Name"}</h2>
          <p className="text-gray-500 dark:text-gray-400">{bio || "Your bio..."}</p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks
          .filter((block) => block.active)
          .map((block) => (
            <BentoBlock
              key={block.id}
              block={block}
              onEdit={() => onEditBlock(block)}
              onRemove={() => onRemoveBlock(block.id)}
              isMobile={isMobile}
            />
          ))}

        {/* Add block button */}
        <Card className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gray-300 bg-transparent p-4 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 dark:hover:text-gray-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-center">Add Block</span>
        </Card>
      </div>

      {/* Block type selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Add a Block</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Object.entries(blockTypeConfig).map(([type, { icon, label }]) => (
            <Card
              key={type}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4 transition-all hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800"
              onClick={() => onAddBlock(type as BlockType)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                {icon}
              </div>
              <span className="text-sm font-medium text-center">{label}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

