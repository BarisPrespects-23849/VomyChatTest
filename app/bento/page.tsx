import type { Metadata } from "next"
import { BentoContent } from "@/components/bento/bento-content"

export const metadata: Metadata = {
  title: "Bento - Vomy Chat",
  description: "Create beautiful Bento grid layouts for your profile",
}

export default function BentoPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
      <div className="w-full max-w-[1600px] mx-auto">
        <BentoContent />
      </div>
    </div>
  )
}

