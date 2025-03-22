"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { cn } from "@/lib/utils"

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const { setTheme: setSettingsTheme } = useSettings()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Ensure hydration completes before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update settings context when theme changes
  useEffect(() => {
    if (mounted && theme) {
      setSettingsTheme(theme)
    }
  }, [theme, mounted, setSettingsTheme])

  // Handle theme change with animation
  const handleThemeChange = (newTheme: string) => {
    setIsAnimating(true)

    // Dispatch custom event for theme change
    window.dispatchEvent(new Event("themechange"))

    // Set the theme
    setTheme(newTheme)

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  // Get the next theme in the cycle: light -> dark -> system -> light
  const getNextTheme = () => {
    if (theme === "light") return "dark"
    if (theme === "dark") return "system"
    return "light"
  }

  // Toggle through themes in sequence
  const cycleTheme = () => {
    handleThemeChange(getNextTheme())
  }

  if (!mounted) {
    // Return placeholder during SSR/hydration
    return (
      <div
        className={cn(
          "relative h-10 w-[88px] rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300",
          className,
        )}
      />
    )
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex h-10 w-[88px] cursor-pointer items-center rounded-full p-1 transition-colors duration-300",
          "bg-gray-200 dark:bg-gray-800",
          "border border-transparent hover:border-gray-300 dark:hover:border-gray-700",
          "shadow-sm",
          isAnimating && "pointer-events-none",
        )}
        onClick={cycleTheme}
        role="button"
        tabIndex={0}
        aria-label={`Switch to ${getNextTheme()} mode, currently ${theme} mode`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            cycleTheme()
          }
        }}
      >
        {/* Icons container */}
        <div className="relative flex h-full w-full items-center justify-between px-2">
          {/* Sun icon */}
          <Sun
            className={cn(
              "h-4 w-4 transition-all duration-300",
              theme === "light" ? "text-amber-500" : "text-gray-500 dark:text-gray-400",
            )}
          />

          {/* Moon icon */}
          <Moon
            className={cn(
              "h-4 w-4 transition-all duration-300",
              theme === "dark" ? "text-indigo-400" : "text-gray-500 dark:text-gray-400",
            )}
          />

          {/* System icon */}
          <Monitor
            className={cn(
              "absolute left-1/2 h-4 w-4 -translate-x-1/2 transition-all duration-300",
              theme === "system" ? "text-purple-500 opacity-100" : "opacity-0",
            )}
          />
        </div>

        {/* Sliding indicator */}
        <div
          className={cn(
            "absolute left-1 top-1 h-8 w-8 rounded-full transition-all duration-300 ease-spring",
            "bg-white dark:bg-gray-900",
            "shadow-sm",
            "flex items-center justify-center",
            theme === "light" && "translate-x-0",
            theme === "dark" && "translate-x-[48px]",
            theme === "system" && "translate-x-[24px]",
            isAnimating && "scale-90",
          )}
        >
          {/* Active icon inside the slider */}
          {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
          {theme === "dark" && <Moon className="h-4 w-4 text-indigo-400" />}
          {theme === "system" && <Monitor className="h-4 w-4 text-purple-500" />}
        </div>
      </div>

      {/* Theme label - visually hidden but available for screen readers */}
      <span className="sr-only">
        {theme === "light" ? "Light mode active" : theme === "dark" ? "Dark mode active" : "System theme active"}
      </span>
    </div>
  )
}

