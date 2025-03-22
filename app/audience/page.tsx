import { Sidebar } from "@/components/sidebar"
import { AudienceHeader } from "@/components/audience/audience-header"
import { AudienceOverview } from "@/components/audience/audience-overview"
import { AudienceDemographics } from "@/components/audience/audience-demographics"
import { AudienceGrowth } from "@/components/audience/audience-growth"
import { AudienceEngagement } from "@/components/audience/audience-engagement"

export default function AudiencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <AudienceHeader />

        <div className="space-y-8">
          <AudienceOverview />
          <div className="grid gap-8 md:grid-cols-2">
            <AudienceDemographics />
            <AudienceGrowth />
          </div>
          <AudienceEngagement />
        </div>
      </div>
    </div>
  )
}

