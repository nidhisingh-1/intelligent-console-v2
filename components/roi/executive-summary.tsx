"use client"

import * as React from "react"
import { TrendingUp, Sparkles, Car, Wrench, PhoneIncoming, PhoneOutgoing } from "lucide-react"
import type { BusinessSummary } from "@/services/roi/roi.types"

interface ExecutiveSummaryProps {
  data: BusinessSummary
  timeLabel: string
  isLoading?: boolean
}

export function ExecutiveSummary({ data, timeLabel, isLoading }: ExecutiveSummaryProps) {
  const formatCurrency = (value: number, compact = false) => {
    if (compact && value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    if (compact && value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-48" />
          <div className="h-16 bg-white/20 rounded w-64" />
        </div>
      </div>
    )
  }

  const inboundPercent = ((data.inboundCalls / data.totalCallsHandled) * 100).toFixed(0)
  const outboundPercent = ((data.outboundCalls / data.totalCallsHandled) * 100).toFixed(0)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-5 text-white shadow-xl overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-violet-200" />
          <span className="text-xs font-medium text-violet-200 uppercase tracking-wide">Revenue from AI-Captured Leads</span>
        </div>

        {/* Main Revenue + Stats Row */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-4xl font-bold tracking-tight">
                {formatCurrency(data.totalRevenue, true)}
              </h2>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="font-medium">+{data.totalRevenueChange}%</span>
              </div>
            </div>
            <p className="text-sm text-violet-200">
              {data.carsSold} cars + {data.repairOrdersCompleted} ROs from {data.totalLeadsDelivered} leads delivered • {timeLabel}
            </p>
          </div>

          {/* Compact KPIs */}
          <div className="flex items-center gap-2">
            {/* Call Direction Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <PhoneIncoming className="h-3.5 w-3.5 text-emerald-300" />
                  <span className="text-xs text-violet-200">In</span>
                  <span className="text-sm font-semibold">{data.inboundCalls}</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1">
                  <PhoneOutgoing className="h-3.5 w-3.5 text-blue-300" />
                  <span className="text-xs text-violet-200">Out</span>
                  <span className="text-sm font-semibold">{data.outboundCalls}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5 text-blue-300" />
                <span className="text-sm font-bold">{formatCurrency(data.salesRevenue, true)}</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-orange-300" />
                <span className="text-sm font-bold">{formatCurrency(data.serviceRevenue, true)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
