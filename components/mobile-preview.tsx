'use client'

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { ProfileCard } from "@/components/profile-card"
import { useSettings } from "@/contexts/settings-context"
import React from "react"

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number): string => {
  // Simple color adjustment for demo purposes
  if (color.startsWith("#")) {
    const hex = color.slice(1)
    const r = Math.min(255, Math.max(0, Number.parseInt(hex.slice(0, 2), 16) + amount))
    const g = Math.min(255, Math.max(0, Number.parseInt(hex.slice(2, 4), 16) + amount))
    const b = Math.min(255, Math.max(0, Number.parseInt(hex.slice(4, 6), 16) + amount))
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }
  return color
}

// Update the getBackgroundStyle function to handle image-based themes
const getBackgroundStyle = (settings: any) => {
  // Default style
  const style: React.CSSProperties = {
    background: "linear-gradient(to bottom, #9333ea, #e11d48)",
  }

  // Apply theme color if set
  if (settings.themeColor === "teal") {
    style.background = "linear-gradient(135deg, #0ea5e9, #22d3ee)"
  } else if (settings.themeColor === "yellow") {
    style.background = "linear-gradient(135deg, #eab308, #fde047)"
  } else if (settings.themeColor === "pink") {
    style.background = "linear-gradient(135deg, #ec4899, #f9a8d4)"
  } else if (settings.themeColor === "green") {
    style.background = "linear-gradient(135deg, #16a34a, #86efac)"
  } else if (settings.themeColor === "dark") {
    style.background = "linear-gradient(135deg, #1e293b, #475569)"
  } else if (settings.themeColor === "rainbow") {
    style.background = "linear-gradient(135deg, #ef4444, #f59e0b, #84cc16, #06b6d4, #8b5cf6)"
  } else if (settings.themeColor === "mountain-night") {
    style.backgroundImage = "url('/images/themes/mountain-night.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "starry-night") {
    style.backgroundImage = "url('/images/themes/starry-night.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "botanical") {
    style.backgroundImage = "url('/images/themes/botanical.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "sunset") {
    style.backgroundImage = "url('/images/themes/sunset.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "grid") {
    style.backgroundImage = "url('/images/themes/grid.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "geometric-gradient") {
    style.backgroundImage = "url('/images/themes/geometric-gradient.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "royal-purple") {
    style.backgroundImage = "url('/images/themes/royal-purple.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "tech-blue") {
    style.backgroundImage = "url('/images/themes/tech-blue.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "dotted-gradient") {
    style.backgroundImage = "url('/images/themes/dotted-gradient.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "pastel-waves") {
    style.backgroundImage = "url('/images/themes/pastel-waves.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "mint-outline") {
    style.backgroundImage = "url('/images/themes/mint-outline.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "peach-outline") {
    style.backgroundImage = "url('/images/themes/peach-outline.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "lemon-outline") {
    style.backgroundImage = "url('/images/themes/lemon-outline.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "notepad") {
    style.backgroundImage = "url('/images/themes/notepad.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "sunset-gradient") {
    style.backgroundImage = "url('/images/themes/sunset-gradient.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "blush-pink") {
    style.backgroundImage = "url('/images/themes/blush-pink.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "sunset-rays") {
    style.backgroundImage = "url('/images/themes/sunset-rays.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "mint-gold-grain") {
    style.backgroundImage = "url('/images/themes/mint-gold-grain.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "mushroom-pattern") {
    style.backgroundImage = "url('/images/themes/mushroom-pattern.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "burgundy-amber") {
    style.backgroundImage = "url('/images/themes/burgundy-amber.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "teal-purple") {
    style.backgroundImage = "url('/images/themes/teal-purple.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "teal-green") {
    style.backgroundImage = "url('/images/themes/teal-green.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "retro-waves") {
    style.backgroundImage = "url('/images/themes/retro-waves.png')"
    style.backgroundSize = "cover"
    style.backgroundPosition = "center"
  } else if (settings.themeColor === "custom") {
    // For custom themes
    if (settings.backgroundType === "gradient") {
      style.background = `linear-gradient(135deg, ${settings.customBackground}, ${adjustColor(settings.customBackground, 40)})`
    } else if (settings.backgroundType === "animated") {
      style.background = `linear-gradient(270deg, ${settings.customBackground}, ${adjustColor(settings.customBackground, 40)}, ${adjustColor(settings.customBackground, -40)})`
      style.backgroundSize = "600% 600%"
      style.animation = "gradient-animation 10s ease infinite"
    } else if (settings.backgroundType === "image" && settings.imageUrl) {
      style.backgroundImage = `url('${settings.imageUrl}')`
      style.backgroundSize = "cover"
      style.backgroundPosition = "center"
    } else {
      style.background = settings.customBackground
    }

    // Apply opacity
    if (settings.backgroundOpacity < 100) {
      const color = settings.customBackground
      const opacity = settings.backgroundOpacity / 100
      if (color.startsWith("#")) {
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)
        style.background = `rgba(${r}, ${g}, ${b}, ${opacity})`
      }
    }
  }

  return style
}

// Get font family style
const getFontFamilyStyle = (fontFamily: string) => {
  const fontMap: Record<string, string> = {
    default: "Inter, sans-serif",
    serif: "Georgia, serif",
    mono: "monospace",
    rounded: "system-ui, -apple-system, sans-serif",
    display: "'Playfair Display', serif",
  }
  return { fontFamily: fontMap[fontFamily || "default"] }
}

// Get social icon colors based on theme
const getSocialIconColors = (themeColor: string) => {
  // Default colors
  let backgroundColor = "#ffffff"
  let iconColor = "#333333"

  // Theme-specific colors
  switch (themeColor) {
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
    case "geometric-gradient":
      backgroundColor = "#ffffff"
      iconColor = "#000000"
      break
    case "royal-purple":
      backgroundColor = "#4a0080"
      iconColor = "#ffd700"
      break
    case "tech-blue":
      backgroundColor = "#3a56e4"
      iconColor = "#ffffff"
      break
    case "dotted-gradient":
      backgroundColor = "#1a237e"
      iconColor = "#ffffff"
      break
    case "pastel-waves":
      backgroundColor = "#4fc3f7"
      iconColor = "#ffffff"
      break
    case "mint-outline":
      backgroundColor = "transparent"
      iconColor = "#5c6855"
      break
    case "peach-outline":
      backgroundColor = "transparent"
      iconColor = "#b37c50"
      break
    case "lemon-outline":
      backgroundColor = "transparent"
      iconColor = "#b3a136"
      break
    case "notepad":
      backgroundColor = "#4da6ff"
      iconColor = "#ffffff"
      break
    case "sunset-gradient":
      backgroundColor = "rgba(255, 255, 255, 0.3)"
      iconColor = "#ffffff"
      break
    case "blush-pink":
      backgroundColor = "#ff8ba7"
      iconColor = "#ffffff"
      break
    case "sunset-rays":
      backgroundColor = "#ffd166"
      iconColor = "#9a4c40"
      break
    case "mint-gold-grain":
      backgroundColor = "#a9a16a"
      iconColor = "#ffffff"
      break
    case "mushroom-pattern":
      backgroundColor = "#ffffff"
      iconColor = "#9a4c40"
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
      // Keep defaults
      break
  }
  return { backgroundColor, iconColor }
}

export function MobilePreview() {
  const [activeLink, setActiveLink] = useState(0)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { themeSettings } = useSettings()

  // Run effect on mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize styles to avoid unnecessary re-renders
  const memoizedBackgroundStyle = React.useMemo(() => getBackgroundStyle(themeSettings), [themeSettings])
  const memoizedFontStyle = React.useMemo(() => getFontFamilyStyle(themeSettings.fontFamily || "default"), [themeSettings.fontFamily])

  // Get social icon colors
  const { backgroundColor: socialBgColor, iconColor: socialIconColor } = getSocialIconColors(themeSettings.themeColor)

  const links = [
    {
      title: "Vomy Chat - Connect, Share, and Thrive Together!",
      url: "https://vomychat.com",
    },
    {
      title: "Join Our Community",
      url: "https://vomychat.com/community",
    },
    {
      title: "Premium Features",
      url: "https://vomychat.com/premium",
    },
  ]

  // Button style based on theme settings
  const getButtonStyle = () => {
    let buttonClass = "rounded-md"
    if (themeSettings.buttonStyle === "rounded") buttonClass = "rounded-full"
    else if (themeSettings.buttonStyle === "soft") buttonClass = "rounded-lg"
    else if (themeSettings.buttonStyle === "square") buttonClass = "rounded-none"
    if (themeSettings.buttonShadow) buttonClass += " shadow-md"
    return buttonClass
  }

  // Button colors based on theme settings and active state
  const getButtonColors = (index: number) => {
    const style: React.CSSProperties = {
      color: themeSettings.buttonTextColor || themeSettings.customTextColor || "white",
    }
    if (themeSettings.buttonColor) style.backgroundColor = themeSettings.buttonColor
    if (themeSettings.buttonBorder) style.border = `2px solid ${themeSettings.buttonBorder}`
    if (themeSettings.buttonShadow) style.boxShadow = themeSettings.buttonShadow

    // Example active state logic (you can extend this)
    if (activeLink === index) {
      style.backgroundColor = "rgba(255, 255, 255, 0.3)"
    }
    return style
  }

  if (!mounted) {
    // SSR/hydration placeholder
    return (
      <div className="relative mx-auto w-[280px] md:w-[320px] opacity-0">
        <div className="relative mx-auto h-[580px] w-[280px] rounded-[40px] border-[10px] border-gray-800 bg-black shadow-xl md:h-[640px] md:w-[320px]"></div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto w-[280px] md:w-[320px] transition-all duration-300">
      {/* iPhone Frame */}
      <div className="relative mx-auto h-[580px] w-[280px] overflow-hidden rounded-[40px] border-[10px] border-gray-800 bg-black shadow-xl md:h-[640px] md:w-[320px] transition-all duration-300">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-40 -translate-x-1/2 rounded-b-xl bg-black"></div>
        {/* Screen Content */}
        <div
          className={cn(
            "relative h-full w-full overflow-y-auto transition-colors duration-500",
            themeSettings.themeColor === "rainbow" ||
              (themeSettings.themeColor === "custom" && themeSettings.backgroundType === "animated")
              ? "animate-gradient-x"
              : ""
          )}
          style={{ ...memoizedBackgroundStyle, ...memoizedFontStyle }}
        >
          {themeSettings.themeColor === "notepad" && (
            <div className="absolute inset-0 flex justify-center items-start pt-12">
              <div className="w-[85%] h-[80%] bg-[#f9d56e] rounded-t-2xl rounded-b-lg shadow-md pt-8 pb-4 px-4 flex flex-col">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-16 h-8 bg-[#f9d56e] rounded-t-full"></div>
                <div className="flex-1 flex flex-col gap-3 mt-2">
                  {links.map((link, i) => (
                    <div
                      key={i}
                      className={cn(
                        "cursor-pointer p-3 text-center text-sm font-medium transition-all duration-300 hover:opacity-100",
                        getButtonStyle()
                      )}
                      style={getButtonColors(i)}
                      onClick={() => setActiveLink(i)}
                    >
                      {link.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Profile Header */}
          <div className={cn("pt-12 text-center", themeSettings.profileLayout === "hero" && "pt-0")}>
            <ProfileCard
              variant={themeSettings.profileLayout === "hero" ? "hero" : "compact"}
              showEditButtons={false}
              className="text-white [&_p]:text-white/70"
            />
          </div>
          {/* Social Icons */}
          <div className="flex justify-center mt-4 gap-2">
            {/* Instagram */}
            <div className="rounded-full p-2 transition-all duration-300" style={{ backgroundColor: socialBgColor }}>
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
                style={{ color: socialIconColor }}
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            {/* Email */}
            <div className="rounded-full p-2 transition-all duration-300" style={{ backgroundColor: socialBgColor }}>
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
                style={{ color: socialIconColor }}
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            {/* Facebook */}
            <div className="rounded-full p-2 transition-all duration-300" style={{ backgroundColor: socialBgColor }}>
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
                style={{ color: socialIconColor }}
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            {/* YouTube */}
            <div className="rounded-full p-2 transition-all duration-300" style={{ backgroundColor: socialBgColor }}>
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
                style={{ color: socialIconColor }}
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </div>
            {/* Add */}
            <div className="rounded-full p-2 transition-all duration-300" style={{ backgroundColor: socialBgColor }}>
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
                style={{ color: socialIconColor }}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
          {/* Links */}
          <div className="mt-6 px-4">
            {links.map((link, i) => (
              <div
                key={i}
                className={cn(
                  "mb-3 cursor-pointer p-3 text-center text-sm font-medium transition-all duration-300 hover:opacity-100",
                  getButtonStyle()
                )}
                style={getButtonColors(i)}
                onClick={() => setActiveLink(i)}
              >
                {link.title}
              </div>
            ))}
          </div>
          {/* End of Screen Content */}
        </div>
      </div>
    </div>
  )
}
