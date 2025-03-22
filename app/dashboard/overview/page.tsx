import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { MobilePreview } from "@/components/mobile-preview"

export default function DashboardOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-2 space-y-8">
            <DashboardMetrics />
            <DashboardCharts />
            <RecentActivity />
          </div>
          <div className="hidden md:block">
            <MobilePreview />
          </div>
        </div>
      </div>
    </div>
  )
}

