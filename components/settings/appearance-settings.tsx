"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/contexts/settings-context"
import { useToast } from "@/components/ui/use-toast"
import { Moon, Sun, Monitor } from "lucide-react"

export function AppearanceSettings() {
  const { theme, setTheme, appearancePreferences, setAppearancePreference, saveSettings, isSaving } = useSettings()

  const { toast } = useToast()

  // Apply reduced motion preference when it changes
  useEffect(() => {
    if (appearancePreferences.reducedMotion) {
      document.documentElement.classList.add("motion-reduce")
    } else {
      document.documentElement.classList.remove("motion-reduce")
    }
  }, [appearancePreferences.reducedMotion])

  // Apply animations preference when it changes
  useEffect(() => {
    if (!appearancePreferences.animations) {
      document.documentElement.classList.add("no-animations")
    } else {
      document.documentElement.classList.remove("no-animations")
    }
  }, [appearancePreferences.animations])

  const handleSave = async () => {
    try {
      await saveSettings()
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been saved successfully.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save appearance settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setTheme("system")
    setAppearancePreference("animations", true)
    setAppearancePreference("reducedMotion", false)

    toast({
      title: "Settings reset",
      description: "Appearance settings have been reset to defaults.",
      variant: "default",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how Vomy Chat looks on your devices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <Label
                htmlFor="light"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-purple-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Sun className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">Light</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <Label
                htmlFor="dark"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-purple-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Moon className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">Dark</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <Label
                htmlFor="system"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-purple-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Monitor className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">System</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="rounded-lg border p-4 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-medium">Theme Preview</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4 shadow-sm dark:border-gray-700">
              <h4 className="mb-2 font-medium text-card-foreground">Light Mode</h4>
              <p className="text-sm text-muted-foreground">Preview of light theme components</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default">
                  Primary
                </Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
              </div>
            </div>
            <div className="rounded-md border bg-card p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-card-foreground">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Preview of dark theme components</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default">
                  Primary
                </Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Customization</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Animations</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable animations throughout the interface</p>
            </div>
            <Switch
              id="animations"
              checked={appearancePreferences.animations}
              onCheckedChange={(checked) => setAppearancePreference("animations", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Reduce the amount of animations</p>
            </div>
            <Switch
              id="reduced-motion"
              checked={appearancePreferences.reducedMotion}
              onCheckedChange={(checked) => setAppearancePreference("reducedMotion", checked)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
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
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </>
  )
}

