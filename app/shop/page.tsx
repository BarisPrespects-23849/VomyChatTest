import { ShopContent } from "@/components/shop-content"
import { MobilePreview } from "@/components/mobile-preview"

export default function ShopPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Shop</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex-1 sm:flex-none rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300">
            Edit
          </button>
          <button className="flex-1 sm:flex-none rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300">
            My Products
          </button>
          <button className="flex-1 sm:flex-none flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300">
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <div className="lg:col-span-2 xl:col-span-3">
          <ShopContent />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
            <MobilePreview />
          </div>
        </div>
      </div>
    </div>
  )
}

