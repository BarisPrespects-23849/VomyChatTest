"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { MobilePreview } from "@/components/mobile-preview"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/contexts/settings-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function ThemePage() {
  const { themeSettings, setThemeSettings, saveSettings } = useSettings()
  const [activeTab, setActiveTab] = useState("themes")
  const [selectedTheme, setSelectedTheme] = useState(() => themeSettings.themeColor || "default")
  const [selectedProfileLayout, setSelectedProfileLayout] = useState(() => themeSettings.profileLayout || "classic")
  const [buttonStyle, setButtonStyle] = useState(() => themeSettings.buttonStyle || "rounded")
  const [buttonShadow, setButtonShadow] = useState(() => themeSettings.buttonShadow || false)
  const [customBgColor, setCustomBgColor] = useState(() => themeSettings.customBackground || "#9333ea")
  const [customTextColor, setCustomTextColor] = useState(() => themeSettings.customTextColor || "#ffffff")
  const [fontFamily, setFontFamily] = useState(() => themeSettings.fontFamily || "default")
  const [backgroundType, setBackgroundType] = useState(() => themeSettings.backgroundType || "solid")
  const [backgroundOpacity, setBackgroundOpacity] = useState(() => themeSettings.backgroundOpacity || 100)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTextColorPicker, setShowTextColorPicker] = useState(false)

  // Available themes with more aesthetic options
  const themes = [
    {
      id: "blush-pink",
      name: "Blush Pink",
      color: "#ffd1dc",
      textColor: "#d64161",
      description: "Soft pink with matching buttons",
      imageUrl: "/images/themes/blush-pink.png",
      buttonColor: "#ff8ba7",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      buttonShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    {
      id: "burgundy-amber",
      name: "Burgundy Amber",
      color: "linear-gradient(135deg, #5f1722, #e67e22)",
      textColor: "#ffffff",
      description: "Rich burgundy to amber gradient",
      imageUrl: "/images/themes/burgundy-amber.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      glassmorphism: true,
    },
    {
      id: "teal-purple",
      name: "Teal Purple",
      color: "linear-gradient(135deg, #20b2aa, #9370db)",
      textColor: "#ffffff",
      description: "Vibrant teal to purple gradient",
      imageUrl: "/images/themes/teal-purple.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      glassmorphism: true,
    },
    {
      id: "teal-green",
      name: "Teal Green",
      color: "linear-gradient(135deg, #20b2aa, #2ecc71)",
      textColor: "#ffffff",
      description: "Fresh teal to green gradient",
      imageUrl: "/images/themes/teal-green.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      glassmorphism: true,
    },
    {
      id: "retro-waves",
      name: "Retro Waves",
      color: "#f5e9c9",
      textColor: "#d35400",
      description: "Vintage style with abstract waves",
      imageUrl: "/images/themes/retro-waves.png",
      buttonColor: "#ff5722",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      buttonShadow: "0 4px 0 #f1c40f",
    },
    {
      id: "sunset-rays",
      name: "Sunset Rays",
      color: "#f9a66c",
      textColor: "#9a4c40",
      description: "Sunset with rays and clouds",
      imageUrl: "/images/themes/sunset-rays.png",
      buttonColor: "#ffd166",
      buttonTextColor: "#9a4c40",
      buttonBorder: "#ff9a8b",
      buttonStyle: "soft",
    },
    {
      id: "mint-gold-grain",
      name: "Mint Gold Grain",
      color: "#d4e7c5",
      textColor: "#5c6855",
      description: "Textured mint to gold gradient",
      imageUrl: "/images/themes/mint-gold-grain.png",
      buttonColor: "#a9a16a",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
    },
    {
      id: "mushroom-pattern",
      name: "Mushroom Pattern",
      color: "#ffd1dc",
      textColor: "#9a4c40",
      description: "Pink with mushroom illustrations",
      imageUrl: "/images/themes/mushroom-pattern.png",
      buttonColor: "#ffffff",
      buttonTextColor: "#9a4c40",
      buttonBorder: "#ff6b6b",
      buttonStyle: "soft",
    },
    {
      id: "mint-outline",
      name: "Mint Outline",
      color: "#dce4d0",
      textColor: "#5c6855",
      description: "Minimalist mint green with outlined buttons",
      imageUrl: "/images/themes/mint-outline.png",
      buttonColor: "transparent",
      buttonTextColor: "#5c6855",
      buttonBorder: "#a8b49c",
      buttonStyle: "soft",
    },
    {
      id: "peach-outline",
      name: "Peach Outline",
      color: "#ffdab9",
      textColor: "#b37c50",
      description: "Soft peach with outlined buttons",
      imageUrl: "/images/themes/peach-outline.png",
      buttonColor: "transparent",
      buttonTextColor: "#b37c50",
      buttonBorder: "#e8a87c",
      buttonStyle: "soft",
    },
    {
      id: "lemon-outline",
      name: "Lemon Outline",
      color: "#fffacd",
      textColor: "#b3a136",
      description: "Light yellow with outlined buttons",
      imageUrl: "/images/themes/lemon-outline.png",
      buttonColor: "transparent",
      buttonTextColor: "#b3a136",
      buttonBorder: "#e6d74a",
      buttonStyle: "soft",
    },
    {
      id: "notepad",
      name: "Notepad",
      color: "#4da6ff",
      textColor: "#333333",
      description: "Blue background with yellow notepad",
      imageUrl: "/images/themes/notepad.png",
      buttonColor: "#4da6ff",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      notepadStyle: true,
    },
    {
      id: "sunset-gradient",
      name: "Sunset Gradient",
      color: "linear-gradient(135deg, #5e1f2d, #d35400)",
      textColor: "#ffffff",
      description: "Rich gradient with frosted buttons",
      imageUrl: "/images/themes/sunset-gradient.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: "soft",
      glassmorphism: true,
    },
    {
      id: "geometric-gradient",
      name: "Geometric Gradient",
      color: "#ff3366",
      textColor: "#000000",
      description: "Vibrant gradient with geometric shapes",
      imageUrl: "/images/themes/geometric-gradient.png",
      buttonColor: "#ffffff",
      buttonTextColor: "#000000",
      buttonBorder: "#000000",
      buttonShadow: "0 2px 0 #000000",
    },
    {
      id: "royal-purple",
      name: "Royal Purple",
      color: "#4a0080",
      textColor: "#ffffff",
      description: "Deep purple with gold accents",
      imageUrl: "/images/themes/royal-purple.png",
      buttonColor: "#ffffff",
      buttonTextColor: "#4a0080",
      buttonBorder: "#ffd700",
      buttonShadow: "0 3px 0 #ffd700",
    },
    {
      id: "tech-blue",
      name: "Tech Blue",
      color: "#3a56e4",
      textColor: "#ffffff",
      description: "Blue with tech-inspired elements",
      imageUrl: "/images/themes/tech-blue.png",
      buttonColor: "#ffffff",
      buttonTextColor: "#3a56e4",
      buttonBorder: "#ff66cc",
      buttonShadow: "0 1px 0 #ff66cc",
    },
    {
      id: "dotted-gradient",
      name: "Dotted Gradient",
      color: "#ff3333",
      textColor: "#ffffff",
      description: "Red-orange gradient with dot pattern",
      imageUrl: "/images/themes/dotted-gradient.png",
      buttonColor: "#1a237e",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
    },
    {
      id: "pastel-waves",
      name: "Pastel Waves",
      color: "#4fc3f7",
      textColor: "#333333",
      description: "Soft blue with pink wave accents",
      imageUrl: "/images/themes/pastel-waves.png",
      buttonColor: "#ffffff",
      buttonTextColor: "#4fc3f7",
      buttonBorder: "none",
      buttonShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    {
      id: "botanical",
      name: "Botanical",
      color: "#e8f0e9",
      textColor: "#2c4c56",
      description: "Elegant botanical theme with leaves",
      imageUrl: "/images/themes/botanical.png",
      buttonColor: "#2c4c56",
      buttonTextColor: "#ffffff",
    },
    {
      id: "sunset",
      name: "Sunset",
      color: "#f8b195",
      textColor: "#7d4e57",
      description: "Warm sunset with golden rays",
      imageUrl: "/images/themes/sunset.png",
      buttonColor: "#ffd166",
      buttonTextColor: "#7d4e57",
      buttonBorder: "#f67e7d",
    },
    {
      id: "grid",
      name: "Grid",
      color: "#1a1a1a",
      textColor: "#ffffff",
      description: "Futuristic grid pattern",
      imageUrl: "/images/themes/grid.png",
      buttonColor: "transparent",
      buttonTextColor: "#ffffff",
      buttonBorder: "#ffffff",
    },
    {
      id: "mountain-night",
      name: "Mountain Night",
      color: "#1a1a2e",
      textColor: "white",
      description: "Serene night mountain landscape",
      imageUrl: "/images/themes/mountain-night.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
    },
    {
      id: "starry-night",
      name: "Starry Night",
      color: "#0f172a",
      textColor: "white",
      description: "Beautiful starry night sky",
      imageUrl: "/images/themes/starry-night.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
    },
    {
      id: "custom",
      name: "CREATE YOUR OWN",
      color: "white",
      textColor: "black",
      borderStyle: "dashed",
      description: "Design your own custom theme",
      imageUrl: null,
    },
    {
      id: "default",
      name: "Default",
      color: "linear-gradient(135deg, #9333ea, #e11d48)",
      textColor: "white",
      description: "Classic purple to red gradient",
    },
    {
      id: "teal",
      name: "Ocean",
      color: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
      textColor: "white",
      description: "Calming blue teal gradient",
    },
    {
      id: "yellow",
      name: "Sunshine",
      color: "linear-gradient(135deg, #eab308, #fde047)",
      textColor: "white",
      description: "Bright and cheerful yellow",
    },
    {
      id: "pink",
      name: "Bubblegum",
      color: "linear-gradient(135deg, #ec4899, #f9a8d4)",
      textColor: "white",
      description: "Playful pink gradient",
    },
    {
      id: "green",
      name: "Forest",
      color: "linear-gradient(135deg, #16a34a, #86efac)",
      textColor: "white",
      description: "Natural green gradient",
    },
  ]

  // Font options
  const fonts = [
    { id: "default", name: "Default", family: "Inter, sans-serif" },
    { id: "serif", name: "Serif", family: "Georgia, serif" },
    { id: "mono", name: "Monospace", family: "monospace" },
    { id: "rounded", name: "Rounded", family: "system-ui, -apple-system, sans-serif" },
    { id: "display", name: "Display", family: "'Playfair Display', serif" },
  ]

  // Button style options
  const buttonStyles = [
    { id: "rounded", name: "Rounded", preview: "rounded-full" },
    { id: "soft", name: "Soft", preview: "rounded-lg" },
    { id: "square", name: "Square", preview: "rounded-none" },
  ]

  // Background types
  const backgroundTypes = [
    { id: "solid", name: "Solid Color" },
    { id: "gradient", name: "Gradient" },
    { id: "image", name: "Image" },
    { id: "animated", name: "Animated" },
  ]

  // Apply theme changes to settings context
  useEffect(() => {
    // Only update settings when user explicitly changes a value
    // This prevents the infinite update loop
    const timer = setTimeout(() => {
      setThemeSettings({
        profileLayout: selectedProfileLayout,
        themeColor: selectedTheme,
        customBackground: customBgColor,
        customTextColor: customTextColor,
        buttonStyle: buttonStyle,
        buttonShadow: buttonShadow,
        fontFamily: fontFamily,
        backgroundType: backgroundType,
        backgroundOpacity: backgroundOpacity,
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [
    selectedProfileLayout,
    selectedTheme,
    customBgColor,
    customTextColor,
    buttonStyle,
    buttonShadow,
    fontFamily,
    backgroundType,
    backgroundOpacity,
    setThemeSettings,
  ])

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)

    // Find the selected theme
    const theme = themes.find((t) => t.id === themeId)

    // If selecting a predefined theme, update background type accordingly
    if (themeId !== "custom" && theme) {
      if (theme.imageUrl) {
        // For image-based themes, update the settings to use the image and its properties
        setThemeSettings({
          themeColor: themeId,
          backgroundType: "image",
          imageUrl: theme.imageUrl,
          buttonColor: theme.buttonColor,
          buttonTextColor: theme.buttonTextColor,
          buttonBorder: theme.buttonBorder,
          buttonShadow: theme.buttonShadow,
          customTextColor: theme.textColor,
          buttonStyle: theme.buttonStyle || buttonStyle,
        })
      } else if (themeId === "rainbow") {
        setBackgroundType("animated")
      } else {
        setBackgroundType("gradient")
      }
    }
  }

  // Handle profile layout selection
  const handleProfileLayoutSelect = (layout: string) => {
    setSelectedProfileLayout(layout as "classic" | "hero")
  }

  // Save theme settings
  const handleSaveTheme = async () => {
    await saveSettings()
  }

  // Get background style for theme preview
  const getThemeBackgroundStyle = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (!theme) return {}

    if (themeId === "custom") {
      return { background: customBgColor }
    }

    // If the theme has an image, we'll handle it in the JSX
    if (theme.imageUrl) {
      return {}
    }

    return { background: theme.color }
  }

  // Get animation class for theme preview
  const getThemeAnimationClass = (themeId: string) => {
    if (themeId === "rainbow" || (themeId === "custom" && backgroundType === "animated")) {
      return "animate-gradient-x"
    }
    return ""
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:flex-row transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold dark:text-white">Theme</h1>
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSaveTheme}>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-2 space-y-8">
            <Tabs defaultValue="themes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="themes">Themes</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
              </TabsList>

              {/* Themes Tab */}
              <TabsContent value="themes" className="space-y-6">
                <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
                  <h2 className="mb-4 text-lg font-semibold dark:text-white">Choose a Theme</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                          selectedTheme === theme.id
                            ? "border-purple-600 ring-2 ring-purple-300"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        } ${theme.id === "custom" ? "border-dashed" : ""}`}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        {selectedTheme === theme.id && (
                          <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                        <div
                          className={`flex aspect-[3/5] flex-col items-center justify-between p-4 ${getThemeAnimationClass(theme.id)}`}
                          style={getThemeBackgroundStyle(theme.id)}
                        >
                          {theme.id === "custom" ? (
                            <div className="flex h-full w-full flex-col items-center justify-center text-center">
                              <p className="font-semibold">{theme.name}</p>
                              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{theme.description}</p>
                            </div>
                          ) : theme.imageUrl ? (
                            <div className="relative h-full w-full overflow-hidden rounded-md">
                              <img
                                src={theme.imageUrl || "/placeholder.svg"}
                                alt={theme.name}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 flex flex-col justify-between p-4">
                                <div className="flex justify-end">
                                  <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                  </div>
                                </div>
                                <div className="space-y-2 w-full">
                                  <div
                                    className="h-10 w-full rounded-full"
                                    style={{
                                      backgroundColor: theme.buttonColor || "rgba(255, 255, 255, 0.2)",
                                      border: theme.buttonBorder ? `2px solid ${theme.buttonBorder}` : "none",
                                      boxShadow: theme.buttonShadow || "none",
                                    }}
                                  ></div>
                                  <div
                                    className="h-10 w-full rounded-full"
                                    style={{
                                      backgroundColor: theme.buttonColor || "rgba(255, 255, 255, 0.2)",
                                      border: theme.buttonBorder ? `2px solid ${theme.buttonBorder}` : "none",
                                      boxShadow: theme.buttonShadow || "none",
                                    }}
                                  ></div>
                                  <div
                                    className="h-10 w-full rounded-full"
                                    style={{
                                      backgroundColor: theme.buttonColor || "rgba(255, 255, 255, 0.2)",
                                      border: theme.buttonBorder ? `2px solid ${theme.buttonBorder}` : "none",
                                      boxShadow: theme.buttonShadow || "none",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="mt-4 h-8 w-8 rounded-full bg-white/90"></div>
                              <div className="space-y-2 w-full">
                                <div className="h-3 w-full rounded-full bg-white/80"></div>
                                <div className="h-3 w-3/4 mx-auto rounded-full bg-white/80"></div>
                                <div className="h-6 w-full rounded-full bg-white/60"></div>
                                <div className="h-6 w-full rounded-full bg-white/60"></div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-2 text-center">
                          <p className="text-xs font-medium">{theme.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTheme === "custom" && (
                  <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold dark:text-white">Customize Your Theme</h2>

                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label className="mb-2 block">Background Type</Label>
                          <RadioGroup
                            value={backgroundType}
                            onValueChange={setBackgroundType}
                            className="flex flex-col space-y-2"
                          >
                            {backgroundTypes.map((type) => (
                              <div key={type.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={type.id} id={`bg-type-${type.id}`} />
                                <Label htmlFor={`bg-type-${type.id}`}>{type.name}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="mb-2 block">Background Color</Label>
                          <div className="flex items-center gap-2">
                            <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
                              <PopoverTrigger asChild>
                                <button
                                  className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-600"
                                  style={{ backgroundColor: customBgColor }}
                                  aria-label="Pick background color"
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-3" align="start">
                                <HexColorPicker color={customBgColor} onChange={setCustomBgColor} />
                              </PopoverContent>
                            </Popover>
                            <input
                              type="text"
                              value={customBgColor}
                              onChange={(e) => setCustomBgColor(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Text Color</Label>
                        <div className="flex items-center gap-2">
                          <Popover open={showTextColorPicker} onOpenChange={setShowTextColorPicker}>
                            <PopoverTrigger asChild>
                              <button
                                className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-600"
                                style={{ backgroundColor: customTextColor }}
                                aria-label="Pick text color"
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-3" align="start">
                              <HexColorPicker color={customTextColor} onChange={setCustomTextColor} />
                            </PopoverContent>
                          </Popover>
                          <input
                            type="text"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Background Opacity: {backgroundOpacity}%</Label>
                        <Slider
                          value={[backgroundOpacity]}
                          min={20}
                          max={100}
                          step={5}
                          onValueChange={(value) => setBackgroundOpacity(value[0])}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
                  <h2 className="mb-4 text-lg font-semibold dark:text-white">Font Style</h2>
                  <RadioGroup
                    value={fontFamily}
                    onValueChange={setFontFamily}
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {fonts.map((font) => (
                      <div key={font.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={font.id} id={`font-${font.id}`} />
                        <Label htmlFor={`font-${font.id}`} style={{ fontFamily: font.family }}>
                          {font.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
                  <h2 className="mb-6 text-lg font-semibold dark:text-white">Profile Layout</h2>
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedProfileLayout === "classic"
                          ? "border-purple-600"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleProfileLayoutSelect("classic")}
                    >
                      {selectedProfileLayout === "classic" && (
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                      <div className="flex flex-col items-center">
                        <div className="mb-2 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-red-500"></div>
                        <div className="h-4 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Classic</p>
                    </div>

                    <div
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedProfileLayout === "hero" ? "border-purple-600" : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleProfileLayoutSelect("hero")}
                    >
                      {selectedProfileLayout === "hero" && (
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                      <div className="flex flex-col items-center">
                        <div className="relative mb-2 h-20 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500">
                          <div className="absolute bottom-0 left-1/2 h-12 w-12 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-white p-1">
                            <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-500 to-red-500"></div>
                          </div>
                        </div>
                        <div className="mt-8 h-4 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Hero</p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        className="mr-2 h-5 w-5"
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
                        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                        <polygon points="12 15 17 21 7 21 12 15"></polygon>
                      </svg>
                      Edit image
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        className="mr-2 h-5 w-5"
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Edit display name and bio
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        className="mr-2 h-5 w-5"
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Add social icons
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Buttons Tab */}
              <TabsContent value="buttons" className="space-y-6">
                <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
                  <h2 className="mb-4 text-lg font-semibold dark:text-white">Button Style</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {buttonStyles.map((style) => (
                      <div
                        key={style.id}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          buttonStyle === style.id ? "border-purple-600" : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setButtonStyle(style.id)}
                      >
                        {buttonStyle === style.id && (
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                        <div className="flex flex-col items-center">
                          <div
                            className={`mb-2 h-10 w-full ${style.preview} bg-purple-600 flex items-center justify-center text-white text-xs`}
                          >
                            Button
                          </div>
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{style.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Label htmlFor="button-shadow">Button Shadow</Label>
                    <Switch id="button-shadow" checked={buttonShadow} onCheckedChange={setButtonShadow} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveTheme}>
                Save Theme
              </Button>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="hidden md:block">
            <div className="sticky top-20">
              <h2 className="mb-4 text-lg font-semibold dark:text-white">Preview</h2>
              <MobilePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

