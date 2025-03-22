"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/contexts/settings-context"

export function ThemeToggle({
  variant = "default",
  size = "default",
}: {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}) {
  const { setTheme: setSettingsTheme } = useSettings()
  const { resolvedTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  // Ensure hydration completes before rendering to avoid mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update settings context when theme changes
  useEffect(() => {
    if (mounted && theme) {
      setSettingsTheme(theme)
    }
  }, [theme, mounted, setSettingsTheme])

  // Force a document class update when theme changes
  useEffect(() => {
    if (mounted && resolvedTheme) {
      if (resolvedTheme === "dark") {
        document.documentElement.classList.add("dark")

        // Force all bg-white elements to update
        document.querySelectorAll('.bg-white, .bg-gray-50, [class*="bg-white"]').forEach((el) => {
          el.classList.add("dark-mode-element")
        })
      } else {
        document.documentElement.classList.remove("dark")

        // Remove forced dark mode class
        document.querySelectorAll(".dark-mode-element").forEach((el) => {
          el.classList.remove("dark-mode-element")
        })
      }
    }
  }, [resolvedTheme, mounted])

  // Handle theme change with transition
  const handleThemeChange = (newTheme: string) => {
    // Dispatch custom event for theme change
    window.dispatchEvent(new Event("themechange"))

    // Add transition class
    setIsChanging(true)

    // Set the theme
    setTheme(newTheme)

    // Remove transition class after animation completes
    setTimeout(() => {
      setIsChanging(false)
    }, 500)
  }

  if (!mounted) {
    return (
      <Button variant={variant} size={size === "icon" ? "icon" : size} disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <div
      onClick={() => handleThemeChange(resolvedTheme === "light" ? "dark" : "light")}
      className={`flex h-10 items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === "outline"
          ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          : variant === "ghost"
            ? "hover:bg-accent hover:text-accent-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
      } ${isChanging ? "opacity-50" : "opacity-100"} transition-opacity duration-300 cursor-pointer`}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      {size !== "icon" && (
        <span className="ml-2">
          {resolvedTheme === "light" ? "Light" : resolvedTheme === "dark" ? "Dark" : "System"}
        </span>
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}

