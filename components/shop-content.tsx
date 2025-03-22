"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Product {
  id: number
  title: string
  price: number
  image: string
  active: boolean
}

interface ProductDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
}

function ProductDialog({ product, isOpen, onClose, onSave }: ProductDialogProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now(),
      title: "New Product",
      price: 19.99,
      image: "/placeholder.svg?height=200&width=200",
      active: true,
    },
  )

  const handleChange = (field: keyof Product, value: any) => {
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
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Product Name</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price.toString()}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                placeholder="19.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
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
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ShopContent() {
  const [products, setProducts] = useState<Product[]>([])
  const isMobile = useMediaQuery("(max-width: 640px)")

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addProduct = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const editProduct = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const toggleProductActive = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, active: !product.active } : product)))
  }

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === product.id ? product : p)))
    } else {
      // Add new product
      setProducts([...products, product])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-800 p-1 text-yellow-600 dark:text-yellow-300 shrink-0">
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
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">
              There are no visible products on your Shop
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              Add at least one visible product to display the Shop tab on your Linktree.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={addProduct}
        className="w-full bg-purple-600 py-6 hover:bg-purple-700 transition-colors duration-300"
      >
        <PlusIcon className="mr-2 h-5 w-5" />
        Add
      </Button>

      {products.length === 0 ? (
        <div className="rounded-lg border border-yellow-200 bg-white p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
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
              className="h-10 w-10 text-gray-300 dark:text-gray-600"
            >
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              <path d="M2 7h20" />
              <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
            </svg>
            <h3 className="text-lg font-medium">Add products to collection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop products into this collection.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700 shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{product.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    className="rounded bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => editProduct(product)}
                  >
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
                      className="h-4 w-4 dark:text-gray-300"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button className="relative" onClick={() => toggleProductActive(product.id)}>
                    <div
                      className={`h-6 w-10 rounded-full ${product.active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"} transition-colors duration-300`}
                    >
                      <div
                        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${product.active ? "translate-x-4" : ""}`}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Title</span>
            <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
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
                className="h-4 w-4"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 dark:text-gray-400">{products.length} Products</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">0.0% CTR</span>
            <button className="relative">
              <div className="h-6 w-10 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
              </div>
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Add a title to this collection.</p>
      </div>

      <ProductDialog
        product={editingProduct}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  )
}

