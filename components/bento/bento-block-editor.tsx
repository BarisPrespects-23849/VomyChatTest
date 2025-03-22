"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { BentoBlockItem } from "./bento-types"
import { preventBodyScroll } from "@/lib/utils"

interface BentoBlockEditorProps {
  block: BentoBlockItem
  onSave: (block: BentoBlockItem) => void
  onCancel: () => void
}

export function BentoBlockEditor({ block, onSave, onCancel }: BentoBlockEditorProps) {
  const [editedBlock, setEditedBlock] = useState<BentoBlockItem>({ ...block })
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleChange = (field: keyof BentoBlockItem, value: any) => {
    setEditedBlock({ ...editedBlock, [field]: value })
  }

  const handleSave = () => {
    onSave(editedBlock)
  }

  // Ensure dialog is visible when opened
  useEffect(() => {
    // Prevent body scrolling when dialog is open
    preventBodyScroll(true)

    // Ensure dialog is in view
    const timer = setTimeout(() => {
      if (dialogRef.current) {
        // Scroll to dialog if needed
        const rect = dialogRef.current.getBoundingClientRect()
        const isInView =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        if (!isInView) {
          // If dialog is not in view, scroll to it
          window.scrollTo({
            top: window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2,
            behavior: "smooth",
          })
        }
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      preventBodyScroll(false)
    }
  }, [])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent ref={dialogRef} className="w-[95vw] max-w-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              {/* Icon would be here */}
            </div>
            Edit {editedBlock.type.charAt(0).toUpperCase() + editedBlock.type.slice(1)} Block
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={editedBlock.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={editedBlock.content}
              onChange={(e) => handleChange("content", e.target.value)}
              rows={3}
            />
          </div>

          {(editedBlock.type === "link" ||
            editedBlock.type === "youtube" ||
            editedBlock.type === "music" ||
            editedBlock.type === "video") && (
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={editedBlock.url || ""}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://"
              />
            </div>
          )}

          {editedBlock.type === "photo" && (
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={editedBlock.image || ""}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://"
              />
              <p className="text-xs text-gray-500">Enter an image URL or upload an image</p>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Block Size</Label>
            <RadioGroup
              value={editedBlock.size}
              onValueChange={(value) => handleChange("size", value)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2 rounded-md border border-gray-200 p-2 dark:border-gray-800">
                <RadioGroupItem value="1x1" id="size-1x1" />
                <Label htmlFor="size-1x1" className="cursor-pointer">
                  Small (1×1)
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-200 p-2 dark:border-gray-800">
                <RadioGroupItem value="2x1" id="size-2x1" />
                <Label htmlFor="size-2x1" className="cursor-pointer">
                  Wide (2×1)
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-200 p-2 dark:border-gray-800">
                <RadioGroupItem value="1x2" id="size-1x2" />
                <Label htmlFor="size-1x2" className="cursor-pointer">
                  Tall (1×2)
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-200 p-2 dark:border-gray-800">
                <RadioGroupItem value="2x2" id="size-2x2" />
                <Label htmlFor="size-2x2" className="cursor-pointer">
                  Large (2×2)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

