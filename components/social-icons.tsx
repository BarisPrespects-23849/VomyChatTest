"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import { useSettings } from "@/contexts/settings-context"

interface SocialIconsProps {
  variant?: "default" | "compact"
}

export function SocialIcons({ variant = "default" }: SocialIconsProps) {
  const { themeSettings } = useSettings()

  // Get social icon colors based on theme
  const getSocialIconColors = () => {
    // Default colors
    let backgroundColor = "#f3f4f6"
    let iconColor = "#4b5563"

    // Theme-specific colors
    switch (themeSettings.themeColor) {
      case "teal":
        backgroundColor = "#0ea5e9"
        iconColor = "#ffffff"
        break
      case "yellow":
        backgroundColor = "#fde047"
        iconColor = "#854d0e"
        break
      case "pink":
        backgroundColor = "#f9a8d4"
        iconColor = "#831843"
        break
      case "green":
        backgroundColor = "#86efac"
        iconColor = "#14532d"
        break
      case "dark":
        backgroundColor = "#475569"
        iconColor = "#f8fafc"
        break
      case "rainbow":
        backgroundColor = "#8b5cf6"
        iconColor = "#ffffff"
        break
      case "mountain-night":
        backgroundColor = "#1e293b"
        iconColor = "#94a3b8"
        break
      case "starry-night":
        backgroundColor = "#312e81"
        iconColor = "#c7d2fe"
        break
      case "botanical":
        backgroundColor = "#2c4c56"
        iconColor = "#a8e890"
        break
      case "sunset":
        backgroundColor = "#ffd166"
        iconColor = "#7d4e57"
        break
      case "grid":
        backgroundColor = "rgba(255, 255, 255, 0.3)"
        iconColor = "#ffffff"
        break
      case "burgundy-amber":
        backgroundColor = "rgba(255, 255, 255, 0.3)"
        iconColor = "#ffffff"
        break
      case "teal-purple":
        backgroundColor = "rgba(255, 255, 255, 0.3)"
        iconColor = "#ffffff"
        break
      case "teal-green":
        backgroundColor = "rgba(255, 255, 255, 0.3)"
        iconColor = "#ffffff"
        break
      case "retro-waves":
        backgroundColor = "#ff5722"
        iconColor = "#ffffff"
        break
      default:
        // For dark mode, use darker background and lighter icon
        if (document.documentElement.classList.contains("dark")) {
          backgroundColor = "#374151"
          iconColor = "#e5e7eb"
        }
        break
    }

    return { backgroundColor, iconColor }
  }

  const { backgroundColor, iconColor } = getSocialIconColors()

  // Social media icons and their respective SVG paths
  const socialIcons = [
    {
      name: "Instagram",
      icon: (
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
          className="h-5 w-5 transition-colors duration-300"
          style={{ color: iconColor }}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Email",
      icon: (
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
          className="h-5 w-5 transition-colors duration-300"
          style={{ color: iconColor }}
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      icon: (
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
          className="h-5 w-5 transition-colors duration-300"
          style={{ color: iconColor }}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      icon: (
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
          className="h-5 w-5 transition-colors duration-300"
          style={{ color: iconColor }}
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
    {
      name: "Add",
      icon: <PlusIcon className="h-5 w-5 transition-colors duration-300" style={{ color: iconColor }} />,
    },
  ]

  return (
    <div className="flex gap-2">
      {socialIcons.map((social, index) => (
        <button
          key={index}
          className="rounded-full p-2 hover:opacity-80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          style={{ backgroundColor }}
          aria-label={social.name}
        >
          {social.icon}
        </button>
      ))}
    </div>
  )
}

