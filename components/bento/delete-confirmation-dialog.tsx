"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { BentoBlockItem, BlockType } from "./bento-content"

interface DeleteConfirmationDialogProps {
  block: BentoBlockItem
  onConfirm: () => void
  onCancel: () => void
  blockTypes: Record<BlockType, { icon: React.ReactNode; label: string; description: string }>
}

export function DeleteConfirmationDialog({ block, onConfirm, onCancel, blockTypes }: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500 dark:text-red-400">
            <Trash2 className="h-5 w-5" />
            Delete {block.title}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {blockTypes[block.type].label.toLowerCase()} block? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50 my-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm">
              {blockTypes[block.type].icon}
            </div>
            <h3 className="font-medium">{block.title}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{block.content}</p>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="flex-1 sm:flex-none">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

