import { Sidebar } from "@/components/sidebar"
import { EarningsHeader } from "@/components/earnings/earnings-header"
import { EarningsOverview } from "@/components/earnings/earnings-overview"
import { EarningsHistory } from "@/components/earnings/earnings-history"
import { EarningsProducts } from "@/components/earnings/earnings-products"

export default function EarningsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <EarningsHeader />

        <div className="space-y-8">
          <EarningsOverview />
          <EarningsProducts />
          <EarningsHistory />
        </div>
      </div>
    </div>
  )
}

