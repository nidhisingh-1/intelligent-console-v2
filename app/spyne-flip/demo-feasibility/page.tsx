"use client"

import { DemoFeasibilityTable } from "@/components/spyne-flip/demo-feasibility-table"
import { mockDealerDemoFeasibility } from "@/lib/spyne-flip-mocks"

export default function DemoFeasibilityPage() {
  return (
    <div className="space-y-6">
      <DemoFeasibilityTable data={mockDealerDemoFeasibility} />
    </div>
  )
}
