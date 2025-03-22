"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

type TemplateCategory = {
  id: string
  name: string
}

type TemplateImage = {
  id: string
  name: string
  src: string
  alt: string
  category: string
}

export function TemplateGallery({ onSelect }: { onSelect: (templateId: string) => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories: TemplateCategory[] = [
    { id: "all", name: "All Templates" },
    { id: "minimal", name: "Minimal" },
    { id: "colorful", name: "Colorful" },
    { id: "gradient", name: "Gradient" },
    { id: "dark", name: "Dark" },
    { id: "professional", name: "Professional" },
  ]

  const templateImages: TemplateImage[] = [
    {
      id: "color-grid",
      name: "Color Grid",
      src: "/placeholder.svg?height=60&width=60",
      alt: "Color grid template",
      category: "colorful",
    },
    {
      id: "minimal-white",
      name: "Minimal White",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Minimal white template",
      category: "minimal",
    },
    {
      id: "dark-mode",
      name: "Dark Mode",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Dark mode template",
      category: "dark",
    },
    {
      id: "sunset",
      name: "Sunset",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Sunset gradient template",
      category: "gradient",
    },
    {
      id: "pastel",
      name: "Pastel",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Pastel colors template",
      category: "colorful",
    },
    {
      id: "neon",
      name: "Neon",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Neon colors template",
      category: "colorful",
    },
    {
      id: "deep-blue",
      name: "Deep Blue",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Deep blue template",
      category: "dark",
    },
    {
      id: "pattern",
      name: "Pattern",
      src: "/placeholder.svg?height=60&width=40",
      alt: "Pattern template",
      category: "professional",
    },
  ]

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    onSelect(templateId)
  }

  const filteredTemplates =
    activeCategory === "all"
      ? templateImages
      : templateImages.filter((template) => template.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Template Images</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeCategory === category.id ? "bg-white text-[#10b981]" : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                selectedTemplate === template.id ? "border-white" : "border-transparent hover:border-white/50"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#10b981]">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <Image
                src={template.src || "/placeholder.svg"}
                alt={template.alt}
                width={60}
                height={60}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 p-4">
          <h3 className="text-lg font-medium text-white mb-3">Layout Options</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-white/10 rounded border border-white/20 hover:border-white/50 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 p-4">
          <h3 className="text-lg font-medium text-white mb-3">Color Schemes</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-full bg-gradient-to-br from-white/40 to-white/10 border border-white/20 hover:border-white/50 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 p-4 col-span-1">
          <h3 className="text-lg font-medium text-white mb-3">Mobile Preview</h3>
          <div className="aspect-[9/16] bg-white/10 rounded-lg border border-white/20 mx-auto max-w-[120px]"></div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 p-4 col-span-2">
          <h3 className="text-lg font-medium text-white mb-3">Desktop Preview</h3>
          <div className="aspect-[16/9] bg-white/10 rounded-lg border border-white/20"></div>
        </div>
      </div>
    </div>
  )
}

