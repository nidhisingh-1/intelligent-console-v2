"use client"

import * as React from "react"
import { 
  Phone, 
  PhoneForwarded, 
  CalendarCheck,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Car,
  Wrench,
  PhoneIncoming,
  PhoneOutgoing,
  Bot
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { 
  BusinessSummary, 
  SalesPipeline, 
  ServicePipeline,
  OpportunitiesSummary 
} from "@/services/roi/roi.types"

interface ROIDashboardProps {
  businessSummary: BusinessSummary
  salesPipeline: SalesPipeline
  servicePipeline: ServicePipeline
  opportunities: OpportunitiesSummary
  timeLabel: string
  isLoading?: boolean
}

export function ROIDashboard({ 
  businessSummary, 
  salesPipeline, 
  servicePipeline, 
  opportunities,
  timeLabel,
  isLoading 
}: ROIDashboardProps) {
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value}`
  }

  const totalLeads = salesPipeline.transfersAndCallbacks + servicePipeline.transfersAndCallbacks
  const totalAppts = salesPipeline.appointmentsBooked + servicePipeline.appointmentsBooked
  const totalDeals = salesPipeline.carsSold + servicePipeline.repairOrdersCompleted
  const conversionRate = ((totalDeals / totalLeads) * 100).toFixed(0)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      
      {/* ========== SECTION 1: THE NUMBER THAT MATTERS ========== */}
      <Card className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-0 shadow-lg overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-violet-200 uppercase tracking-wide mb-1">
                Revenue from AI-Delivered Leads • {timeLabel}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">{formatCurrency(businessSummary.totalRevenue)}</span>
                <span className="flex items-center gap-1 text-emerald-300 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +{businessSummary.totalRevenueChange}%
                </span>
              </div>
              <p className="text-sm text-violet-200 mt-1">
                {businessSummary.carsSold} cars + {businessSummary.repairOrdersCompleted} ROs closed
              </p>
            </div>
            
            {/* Quick breakdown */}
            <div className="flex gap-3">
              <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-blue-200">
                  <Car className="h-3.5 w-3.5" />
                  <span className="text-xs">Sales</span>
                </div>
                <p className="text-lg font-bold">{formatCurrency(businessSummary.salesRevenue)}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-orange-200">
                  <Wrench className="h-3.5 w-3.5" />
                  <span className="text-xs">Service</span>
                </div>
                <p className="text-lg font-bold">{formatCurrency(businessSummary.serviceRevenue)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========== SECTION 2: THE SIMPLE FLOW ========== */}
      {/* AI handled calls → Delivered leads → Your team closed deals */}
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-4 divide-x divide-gray-100">
            {/* Step 1: Calls Handled */}
            <div className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mb-2">
                <Phone className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{businessSummary.totalCallsHandled.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Calls Handled</p>
              <p className="text-[10px] text-emerald-600 mt-1">100% answered</p>
            </div>
            
            {/* Step 2: Leads Delivered */}
            <div className="p-4 text-center bg-violet-50/50">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 mb-2">
                <PhoneForwarded className="h-5 w-5 text-violet-600" />
              </div>
              <p className="text-2xl font-bold text-violet-700">{totalLeads}</p>
              <p className="text-xs text-gray-500">Leads Delivered</p>
              <p className="text-[10px] text-violet-600 mt-1">to your team</p>
            </div>
            
            {/* Step 3: Appointments */}
            <div className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-2">
                <CalendarCheck className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalAppts}</p>
              <p className="text-xs text-gray-500">Appts Booked</p>
              <p className="text-[10px] text-gray-400 mt-1">{((totalAppts/totalLeads)*100).toFixed(0)}% of leads</p>
            </div>
            
            {/* Step 4: Deals Closed */}
            <div className="p-4 text-center bg-emerald-50/50">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-700">{totalDeals}</p>
              <p className="text-xs text-gray-500">Deals Closed</p>
              <p className="text-[10px] text-emerald-600 mt-1">{conversionRate}% close rate</p>
            </div>
          </div>
          
          {/* Breakdown row */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <PhoneIncoming className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-gray-600">Inbound:</span>
                <span className="font-medium">{businessSummary.inboundCalls}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneOutgoing className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-gray-600">Outbound:</span>
                <span className="font-medium">{businessSummary.outboundCalls}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">{salesPipeline.carsSold} sold</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-orange-500" />
                <span className="font-medium">{servicePipeline.repairOrdersCompleted} ROs</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========== SECTION 3: NEEDS ATTENTION ========== */}
      {opportunities.opportunities.length > 0 && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-900">Needs Attention</span>
              <span className="text-xs text-gray-400">({opportunities.opportunities.length} items)</span>
            </div>
            
            <div className="space-y-2">
              {opportunities.opportunities.slice(0, 3).map((opp) => (
                <div 
                  key={opp.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{opp.title}</p>
                    <p className="text-xs text-gray-500 truncate">{opp.description}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-sm font-semibold text-amber-600">
                      {formatCurrency(opp.potentialRevenue)}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </div>
              ))}
            </div>
            
            {opportunities.opportunities.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full mt-2 text-gray-500">
                View all {opportunities.opportunities.length} opportunities
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* ========== SECTION 4: AI DID THE WORK (subtle footer) ========== */}
      <div className="flex items-center justify-center gap-2 py-3 text-xs text-gray-400">
        <Bot className="h-3.5 w-3.5" />
        <span>AI agents answered 100% of calls • Industry average: ~30% go unanswered</span>
      </div>
    </div>
  )
}
