"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTheme } from "next-themes"

type NotificationPreferences = {
  emailProfileViews: boolean
  emailLinkClicks: boolean
  emailPurchases: boolean
  emailMarketing: boolean
  pushAll: boolean
  pushMilestones: boolean
  pushEarnings: boolean
}

type AppearancePreferences = {
  animations: boolean
  reducedMotion: boolean
}

// Update the ThemeSettings type to include imageUrl and button styling properties
type ThemeSettings = {
  profileLayout: "classic" | "hero"
  themeColor: string
  customBackground?: string
  customTextColor?: string
  buttonStyle?: string
  buttonShadow?: boolean | string
  fontFamily?: string
  backgroundType?: string
  backgroundOpacity?: number
  imageUrl?: string
  buttonColor?: string
  buttonTextColor?: string
  buttonBorder?: string
}

type SettingsContextType = {
  // Profile settings
  displayName: string
  setDisplayName: (name: string) => void
  username: string
  setUsername: (username: string) => void
  bio: string
  setBio: (bio: string) => void
  website: string
  setWebsite: (website: string) => void
  profileImage: string | null
  setProfileImage: (image: string | null) => void

  // Account settings
  email: string
  setEmail: (email: string) => void
  twoFactorEnabled: boolean
  setTwoFactorEnabled: (enabled: boolean) => void

  // Appearance settings
  theme: string
  setTheme: (theme: string) => void
  appearancePreferences: AppearancePreferences
  setAppearancePreference: (key: keyof AppearancePreferences, value: boolean) => void

  // Theme settings
  themeSettings: ThemeSettings
  setThemeSettings: (settings: Partial<ThemeSettings>) => void

  // Notification settings
  notificationPreferences: NotificationPreferences
  setNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => void

  // General settings functions
  saveSettings: () => Promise<void>
  resetSettings: () => void
  isSaving: boolean
  hasChanges: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, theme: currentTheme, setTheme: setCurrentTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Profile settings
  const [displayName, setDisplayName] = useState("peer Cena")
  const [username, setUsername] = useState("peer_cena")
  const [bio, setBio] = useState("write here")
  const [website, setWebsite] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Account settings
  const [email, setEmail] = useState("peer.cena@example.com")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Appearance settings
  const [theme, setThemeState] = useState("light")
  const [appearancePreferences, setAppearancePreferences] = useState<AppearancePreferences>({
    animations: true,
    reducedMotion: false,
  })

  // Theme settings
  // Update the initial themeSettings state to use burgundy-amber as default
  const [themeSettings, setThemeSettingsState] = useState<ThemeSettings>({
    profileLayout: "classic",
    themeColor: "burgundy-amber",
    customBackground: "linear-gradient(135deg, #5f1722, #e67e22)",
    customTextColor: "#ffffff",
    buttonStyle: "soft",
    buttonShadow: false,
    fontFamily: "default",
    backgroundType: "image",
    backgroundOpacity: 100,
    imageUrl: "/images/themes/burgundy-amber.png",
    buttonColor: "rgba(255, 255, 255, 0.2)",
    buttonTextColor: "#ffffff",
    buttonBorder: "none",
  })

  // Notification settings
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    emailProfileViews: true,
    emailLinkClicks: true,
    emailPurchases: true,
    emailMarketing: false,
    pushAll: true,
    pushMilestones: true,
    pushEarnings: true,
  })

  // Update theme settings
  const setThemeSettings = (settings: Partial<ThemeSettings>) => {
    // Use functional update to avoid dependency on previous state
    setThemeSettingsState((prev) => {
      // Only update if values actually changed
      const hasChanged = Object.entries(settings).some(([key, value]) => prev[key as keyof ThemeSettings] !== value)

      if (!hasChanged) {
        return prev // Return previous state if nothing changed
      }

      return {
        ...prev,
        ...settings,
      }
    })

    setHasChanges(true)
  }

  // Update theme state when resolved theme changes
  useEffect(() => {
    if (resolvedTheme && theme === "system") {
      // Update internal state but don't change the actual theme setting
      setThemeState("system")
    }
  }, [resolvedTheme, theme])

  // Load settings from localStorage on initial render
  useEffect(() => {
    // First check for theme specifically to ensure it loads quickly
    const savedTheme = localStorage.getItem("vomyChat_theme")
    if (savedTheme) {
      setThemeState(savedTheme)
      setCurrentTheme(savedTheme)

      // Apply theme class immediately
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    const savedSettings = localStorage.getItem("vomyChat_settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)

        // Profile settings
        if (parsedSettings.displayName) setDisplayName(parsedSettings.displayName)
        if (parsedSettings.username) setUsername(parsedSettings.username)
        if (parsedSettings.bio) setBio(parsedSettings.bio)
        if (parsedSettings.website) setWebsite(parsedSettings.website)
        if (parsedSettings.profileImage) setProfileImage(parsedSettings.profileImage)

        // Account settings
        if (parsedSettings.email) setEmail(parsedSettings.email)
        if (parsedSettings.twoFactorEnabled !== undefined) setTwoFactorEnabled(parsedSettings.twoFactorEnabled)

        // Appearance settings
        if (parsedSettings.theme) {
          setThemeState(parsedSettings.theme)
          setCurrentTheme(parsedSettings.theme)
        }
        if (parsedSettings.appearancePreferences) {
          setAppearancePreferences(parsedSettings.appearancePreferences)
        }

        // Theme settings
        if (parsedSettings.themeSettings) {
          setThemeSettingsState(parsedSettings.themeSettings)
        }

        // Notification settings
        if (parsedSettings.notificationPreferences) {
          setNotificationPreferences(parsedSettings.notificationPreferences)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    // Mark as no changes after initial load
    setHasChanges(false)
  }, [setCurrentTheme])

  // Track changes
  useEffect(() => {
    setHasChanges(true)
  }, [
    displayName,
    username,
    bio,
    website,
    profileImage,
    email,
    twoFactorEnabled,
    theme,
    appearancePreferences,
    themeSettings,
    notificationPreferences,
  ])

  // Set theme when theme state changes
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme)
    setCurrentTheme(newTheme)

    // Force the theme class on the document for immediate visual feedback
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Save to localStorage immediately for persistence
    localStorage.setItem("vomyChat_theme", newTheme)
  }

  // Update appearance preferences
  const setAppearancePreference = (key: keyof AppearancePreferences, value: boolean) => {
    setAppearancePreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Update notification preferences
  const setNotificationPreference = (key: keyof NotificationPreferences, value: boolean) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Save all settings
  const saveSettings = async () => {
    setIsSaving(true)

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Save to localStorage
      const settingsToSave = {
        displayName,
        username,
        bio,
        website,
        profileImage,
        email,
        twoFactorEnabled,
        theme,
        appearancePreferences,
        themeSettings,
        notificationPreferences,
      }

      localStorage.setItem("vomyChat_settings", JSON.stringify(settingsToSave))
      setHasChanges(false)

      return Promise.resolve()
    } catch (error) {
      console.error("Error saving settings:", error)
      return Promise.reject(error)
    } finally {
      setIsSaving(false)
    }
  }

  // Reset all settings to defaults
  const resetSettings = () => {
    // Profile settings
    setDisplayName("peer Cena")
    setUsername("peer_cena")
    setBio("write here")
    setWebsite("")
    setProfileImage(null)

    // Account settings
    setEmail("peer.cena@example.com")
    setTwoFactorEnabled(false)

    // Appearance settings
    setTheme("light")
    setAppearancePreferences({
      animations: true,
      reducedMotion: false,
    })

    // Theme settings
    setThemeSettingsState({
      profileLayout: "classic",
      themeColor: "burgundy-amber",
      customBackground: "linear-gradient(135deg, #5f1722, #e67e22)",
      customTextColor: "#ffffff",
      buttonStyle: "soft",
      buttonShadow: false,
      fontFamily: "default",
      backgroundType: "image",
      backgroundOpacity: 100,
      imageUrl: "/images/themes/burgundy-amber.png",
      buttonColor: "rgba(255, 255, 255, 0.2)",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
    })

    // Notification settings
    setNotificationPreferences({
      emailProfileViews: true,
      emailLinkClicks: true,
      emailPurchases: true,
      emailMarketing: false,
      pushAll: true,
      pushMilestones: true,
      pushEarnings: true,
    })
  }

  const value = {
    // Profile settings
    displayName,
    setDisplayName,
    username,
    setUsername,
    bio,
    setBio,
    website,
    setWebsite,
    profileImage,
    setProfileImage,

    // Account settings
    email,
    setEmail,
    twoFactorEnabled,
    setTwoFactorEnabled,

    // Appearance settings
    theme,
    setTheme,
    appearancePreferences,
    setAppearancePreference,

    // Theme settings
    themeSettings,
    setThemeSettings,

    // Notification settings
    notificationPreferences,
    setNotificationPreference,

    // General settings functions
    saveSettings,
    resetSettings,
    isSaving,
    hasChanges,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

