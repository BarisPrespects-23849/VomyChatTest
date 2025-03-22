import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SettingsTabs />
      </div>
    </div>
  )
}

