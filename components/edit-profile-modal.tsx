"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/contexts/settings-context"
import { useToast } from "@/components/ui/use-toast"

interface EditProfileModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
}

export function EditProfileModal({ isOpen, onOpenChange, onSave }: EditProfileModalProps) {
  const { displayName, bio, setDisplayName, setBio, saveSettings, isSaving } = useSettings()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: displayName,
    bio: bio,
  })
  const [errors, setErrors] = useState({
    name: "",
    bio: "",
  })

  // Update form data when props change
  useEffect(() => {
    setFormData({
      name: displayName,
      bio: bio,
    })
  }, [displayName, bio, isOpen])

  const validateForm = () => {
    const newErrors = {
      name: "",
      bio: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    if (formData.bio.length > 160) {
      newErrors.bio = "Bio must be less than 160 characters"
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.bio
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Update context values
    setDisplayName(formData.name)
    setBio(formData.bio)

    try {
      await saveSettings()

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "success",
      })

      onOpenChange(false)
      if (onSave) onSave()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your name and bio information. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center">
                Name
                <span className="ml-1 text-xs text-muted-foreground">{formData.name.length}/50</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? "border-red-500" : ""}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio" className="flex items-center">
                Bio
                <span className="ml-1 text-xs text-muted-foreground">{formData.bio.length}/160</span>
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself"
                className={errors.bio ? "border-red-500" : ""}
                rows={3}
                aria-invalid={!!errors.bio}
                aria-describedby={errors.bio ? "bio-error" : undefined}
              />
              {errors.bio && (
                <p id="bio-error" className="text-xs text-red-500">
                  {errors.bio}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
              {isSaving ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditButton({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${className}`}
      aria-label="Edit profile"
    >
      <Pencil className="h-3 w-3" />
    </button>
  )
}

