import { MobilePreview } from "@/components/mobile-preview"
import type { BentoBlockItem } from "@/components/bento/bento-types"
import { blockTypeConfig } from "@/components/bento/bento-config"
import { useSettings } from "@/contexts/settings-context"

interface BentoPreviewProps {
  blocks: BentoBlockItem[]
}

export function BentoPreview({ blocks }: BentoPreviewProps) {
  const { displayName, bio } = useSettings()

  return (
    <div className="mx-auto max-w-[280px]">
      <MobilePreview>
        <div className="flex flex-col items-center p-4">
          <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="flex h-full w-full items-center justify-center text-white">
              {displayName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>
          <h2 className="mb-1 text-xl font-bold">{displayName || "Your Name"}</h2>
          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">{bio || "Your bio here"}</p>

          <div className="grid w-full grid-cols-2 gap-3">
            {blocks
              .filter((block) => block.active)
              .map((block) => (
                <div
                  key={block.id}
                  className={`${block.size === "2x1" || block.size === "2x2" ? "col-span-2" : "col-span-1"} 
                            ${block.size === "1x2" || block.size === "2x2" ? "row-span-2" : "row-span-1"}
                            ${block.color} rounded-lg p-3 shadow-sm`}
                  style={{ minHeight: block.size.includes("2") ? "120px" : "80px" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      {blockTypeConfig[block.type].icon}
                    </div>
                    <h3 className="text-sm font-medium truncate">{block.title}</h3>
                  </div>
                  <p className="mt-1 text-xs opacity-80 line-clamp-2">{block.content}</p>
                  {block.image && (
                    <div className="mt-2 h-12 w-full overflow-hidden rounded">
                      <img
                        src={block.image || "/placeholder.svg"}
                        alt={block.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </MobilePreview>
    </div>
  )
}

