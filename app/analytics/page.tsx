import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { AnalyticsPerformance } from "@/components/analytics/analytics-performance"
import { AnalyticsLinks } from "@/components/analytics/analytics-links"
import { AnalyticsDevices } from "@/components/analytics/analytics-devices"

export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <AnalyticsHeader />

      <div className="space-y-8">
        <AnalyticsOverview />
        <AnalyticsPerformance />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AnalyticsLinks />
          <AnalyticsDevices />
        </div>
      </div>
    </div>
  )
}

