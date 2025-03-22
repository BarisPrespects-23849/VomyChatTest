"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/contexts/settings-context"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const { notificationPreferences, setNotificationPreference, saveSettings, resetSettings, isSaving } = useSettings()

  const { toast } = useToast()

  const handleSave = async () => {
    try {
      await saveSettings()

      // Show notification settings saved toast
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved successfully.",
        variant: "success",
      })

      // If push notifications are enabled, request permission
      if (notificationPreferences.pushAll && "Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
          await Notification.requestPermission()
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    // Reset only notification preferences
    resetSettings()

    toast({
      title: "Settings reset",
      description: "Notification settings have been reset to defaults.",
      variant: "default",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications from Vomy Chat</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-profile-views">Profile Views</Label>
              <p className="text-xs text-gray-500">Get notified when someone views your profile</p>
            </div>
            <Switch
              id="email-profile-views"
              checked={notificationPreferences.emailProfileViews}
              onCheckedChange={(checked) => setNotificationPreference("emailProfileViews", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-link-clicks">Link Clicks</Label>
              <p className="text-xs text-gray-500">Get notified when someone clicks on your links</p>
            </div>
            <Switch
              id="email-link-clicks"
              checked={notificationPreferences.emailLinkClicks}
              onCheckedChange={(checked) => setNotificationPreference("emailLinkClicks", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-purchases">Purchases</Label>
              <p className="text-xs text-gray-500">Get notified when someone makes a purchase</p>
            </div>
            <Switch
              id="email-purchases"
              checked={notificationPreferences.emailPurchases}
              onCheckedChange={(checked) => setNotificationPreference("emailPurchases", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-marketing">Marketing</Label>
              <p className="text-xs text-gray-500">Receive marketing emails and promotions</p>
            </div>
            <Switch
              id="email-marketing"
              checked={notificationPreferences.emailMarketing}
              onCheckedChange={(checked) => setNotificationPreference("emailMarketing", checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Push Notifications</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-all">Enable Push Notifications</Label>
              <p className="text-xs text-gray-500">Receive push notifications on your devices</p>
            </div>
            <Switch
              id="push-all"
              checked={notificationPreferences.pushAll}
              onCheckedChange={(checked) => setNotificationPreference("pushAll", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-milestones">Milestones</Label>
              <p className="text-xs text-gray-500">Get notified when you reach important milestones</p>
            </div>
            <Switch
              id="push-milestones"
              checked={notificationPreferences.pushMilestones}
              onCheckedChange={(checked) => setNotificationPreference("pushMilestones", checked)}
              disabled={!notificationPreferences.pushAll}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-earnings">Earnings</Label>
              <p className="text-xs text-gray-500">Get notified about your earnings and payouts</p>
            </div>
            <Switch
              id="push-earnings"
              checked={notificationPreferences.pushEarnings}
              onCheckedChange={(checked) => setNotificationPreference("pushEarnings", checked)}
              disabled={!notificationPreferences.pushAll}
            />
          </div>

          {notificationPreferences.pushAll && Notification && Notification.permission === "denied" && (
            <div className="mt-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Notifications blocked</h3>
                  <p className="mt-1">
                    You've blocked notifications in your browser. Please update your browser settings to receive push
                    notifications.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isSaving}>
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

