"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { useSettings } from "@/contexts/settings-context"
import { useMediaQuery } from "@/hooks/use-media-query"

export function SettingsTabs() {
  const { hasChanges } = useSettings()
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <TabsList className={`grid ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-4"} w-full max-w-3xl`}>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          {isMobile ? (
            <>
              <TabsTrigger value="appearance">Theme</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </>
          )}
        </TabsList>

        {hasChanges && (
          <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Unsaved changes
          </span>
        )}
      </div>

      <TabsContent value="profile">
        <Card className="overflow-hidden">
          <ProfileSettings />
        </Card>
      </TabsContent>

      <TabsContent value="account">
        <Card className="overflow-hidden">
          <AccountSettings />
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card className="overflow-hidden">
          <AppearanceSettings />
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="overflow-hidden">
          <NotificationSettings />
        </Card>
      </TabsContent>
    </Tabs>
  )
}

