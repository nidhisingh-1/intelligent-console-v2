"use client"

import * as React from "react"
import { 
  Car, 
  Wrench, 
  PhoneForwarded, 
  ArrowRight, 
  DollarSign,
  PhoneIncoming,
  PhoneOutgoing 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SalesPipeline, ServicePipeline, QuadrantMetrics } from "@/services/roi/roi.types"

interface PipelineComparisonProps {
  salesPipeline: SalesPipeline
  servicePipeline: ServicePipeline
  isLoading?: boolean
}

function QuadrantRow({ 
  label, 
  icon, 
  data, 
  outcomeLabel 
}: { 
  label: string
  icon: React.ReactNode
  data: QuadrantMetrics
  outcomeLabel: string
}) {
  const closeRate = ((data.dealsClosed / data.leadsDelivered) * 100).toFixed(0)
  
  return (
    <div className="flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-1.5 w-20">
        {icon}
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="flex items-center gap-2 flex-1 text-sm">
        <span className="text-gray-500">{data.leadsDelivered} leads</span>
        <ArrowRight className="h-3 w-3 text-gray-300" />
        <span className="font-medium text-gray-900">{data.dealsClosed} {outcomeLabel}</span>
        <span className="text-xs text-gray-400">({closeRate}%)</span>
      </div>
      <span className="font-semibold text-gray-900">
        ${data.revenue >= 1000000 
          ? `${(data.revenue / 1000000).toFixed(1)}M` 
          : `${(data.revenue / 1000).toFixed(0)}K`}
      </span>
    </div>
  )
}

export function PipelineComparison({ salesPipeline, servicePipeline, isLoading }: PipelineComparisonProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-5">
          <div className="h-32 bg-gray-100 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const totalLeads = salesPipeline.transfersAndCallbacks + servicePipeline.transfersAndCallbacks
  const totalDeals = salesPipeline.carsSold + servicePipeline.repairOrdersCompleted
  const totalRevenue = salesPipeline.revenue + servicePipeline.revenue

  return (
    <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="font-medium text-gray-900 text-sm">Leads Delivered → Deals Closed</span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><PhoneIncoming className="h-3 w-3" /> Inbound</span>
            <span className="flex items-center gap-1"><PhoneOutgoing className="h-3 w-3" /> Outbound</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Sales Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Car className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Sales</span>
              <span className="text-xs text-gray-400">({salesPipeline.transfersAndCallbacks} leads → {salesPipeline.carsSold} sold)</span>
              <span className="ml-auto font-semibold text-blue-600">
                ${(salesPipeline.revenue / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="space-y-1.5 ml-6">
              <QuadrantRow 
                label="Inbound" 
                icon={<PhoneIncoming className="h-3.5 w-3.5 text-emerald-500" />}
                data={salesPipeline.inbound}
                outcomeLabel="sold"
              />
              <QuadrantRow 
                label="Outbound" 
                icon={<PhoneOutgoing className="h-3.5 w-3.5 text-blue-500" />}
                data={salesPipeline.outbound}
                outcomeLabel="sold"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Service Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Service</span>
              <span className="text-xs text-gray-400">({servicePipeline.transfersAndCallbacks} leads → {servicePipeline.repairOrdersCompleted} ROs)</span>
              <span className="ml-auto font-semibold text-orange-600">
                ${(servicePipeline.revenue / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="space-y-1.5 ml-6">
              <QuadrantRow 
                label="Inbound" 
                icon={<PhoneIncoming className="h-3.5 w-3.5 text-emerald-500" />}
                data={servicePipeline.inbound}
                outcomeLabel="ROs"
              />
              <QuadrantRow 
                label="Outbound" 
                icon={<PhoneOutgoing className="h-3.5 w-3.5 text-blue-500" />}
                data={servicePipeline.outbound}
                outcomeLabel="ROs"
              />
            </div>
          </div>
        </div>

        {/* Footer - Total */}
        <div className="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-violet-200">Total:</span>
            <span><strong>{totalLeads}</strong> leads delivered</span>
            <ArrowRight className="h-3 w-3 text-violet-300" />
            <span><strong>{totalDeals}</strong> deals closed</span>
          </div>
          <span className="text-xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</span>
        </div>
      </CardContent>
    </Card>
  )
}
