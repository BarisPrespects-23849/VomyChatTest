"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, Link2Icon, ImageIcon, TextIcon, GlobeIcon, TrashIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface LinkItem {
  id: number
  title: string
  url: string
  active: boolean
}

interface LinkDialogProps {
  link: LinkItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (link: LinkItem) => void
}

function LinkDialog({ link, isOpen, onClose, onSave }: LinkDialogProps) {
  const [formData, setFormData] = useState<LinkItem>(
    link || {
      id: Date.now(),
      title: "New Link",
      url: "https://",
      active: true,
    },
  )

  const handleChange = (field: keyof LinkItem, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{link ? "Edit Link" : "Add New Link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Link Title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleChange("active", checked)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ProfileLinks() {
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: 1,
      title: "Vomy Chat - Connect, Share, and Thrive Together!",
      url: "http://vomychat.com",
      active: true,
    },
  ])

  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addLink = () => {
    setEditingLink(null)
    setIsDialogOpen(true)
  }

  const editLink = (link: LinkItem) => {
    setEditingLink(link)
    setIsDialogOpen(true)
  }

  const toggleLinkActive = (id: number) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, active: !link.active } : link)))
  }

  const deleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const handleSaveLink = (link: LinkItem) => {
    if (editingLink) {
      // Update existing link
      setLinks(links.map((l) => (l.id === link.id ? link : l)))
    } else {
      // Add new link
      setLinks([...links, link])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={addLink}
        className="w-full bg-purple-600 py-6 hover:bg-purple-700 transition-colors duration-300"
      >
        <PlusIcon className="mr-2 h-5 w-5" />
        Add
      </Button>

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="cursor-move dark:text-gray-300 transition-colors duration-300">
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
                    className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-300"
                  >
                    <circle cx="9" cy="5" r="1" />
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="9" cy="19" r="1" />
                    <circle cx="15" cy="5" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <circle cx="15" cy="19" r="1" />
                  </svg>
                </button>
                <span className="font-medium dark:text-white transition-colors duration-300">{link.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleLinkActive(link.id)} className="relative">
                  <div
                    className={`h-6 w-10 rounded-full ${link.active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"} transition-colors duration-300`}
                  >
                    <div
                      className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${link.active ? "translate-x-4" : ""}`}
                    ></div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <GlobeIcon className="h-4 w-4" />
              <span>{link.url}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="rounded bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                onClick={() => editLink(link)}
              >
                <TextIcon className="h-4 w-4 dark:text-gray-300 transition-colors duration-300" />
              </button>
              <button className="rounded bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                <ImageIcon className="h-4 w-4 dark:text-gray-300 transition-colors duration-300" />
              </button>
              <button className="rounded bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                <Link2Icon className="h-4 w-4 dark:text-gray-300 transition-colors duration-300" />
              </button>
              <div className="flex-1"></div>
              <button
                onClick={() => deleteLink(link.id)}
                className="rounded bg-gray-100 dark:bg-gray-700 p-1 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <LinkDialog
        link={editingLink}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveLink}
      />
    </div>
  )
}

