import type React from "react"
export default function AudienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:block md:w-64">
        {/* This is a placeholder div that takes up the same space as the sidebar */}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

