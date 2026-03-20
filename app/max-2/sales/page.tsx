"use client"

import {
  SalesSummary,
  SalesAppointments,
  SalesActionItems,
  SalesReports,
  LeadFunnel,
  VehicleInquiries,
  FollowUpOpportunities,
  DemandNotInStock,
} from "@/components/max-2/sales"

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sales operations — pipeline, appointments, action items, and performance
        </p>
      </div>

      <SalesSummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesAppointments />
        <SalesActionItems />
      </div>

      <SalesReports />

      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Demand & Pipeline</h2>
        <LeadFunnel />
        <div className="mt-6">
          <VehicleInquiries />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <FollowUpOpportunities />
          <DemandNotInStock />
        </div>
      </div>
    </div>
  )
}
