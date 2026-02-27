"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import type { RevenueKPI, TimeRange } from "@/services/roi/roi.types"
import { getTimeRangeLabel } from "@/services/roi/roi.types"

interface HeroRevenueCardProps {
  data: RevenueKPI
  timeRange: TimeRange
  isLoading?: boolean
}

export function HeroRevenueCard({ data, timeRange, isLoading }: HeroRevenueCardProps) {
  const isPositive = data.changePercent >= 0
  const timeLabel = getTimeRangeLabel(timeRange)

  if (isLoading) {
    return (
      <Card className="col-span-2 relative overflow-hidden bg-white border border-gray-100 shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />
        <CardContent className="pt-8 pb-6 px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-40" />
            <div className="h-12 bg-gray-200 rounded w-32" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data.value)

  return (
    <Card className="col-span-2 md:col-span-2 relative overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />
      
      <CardContent className="pt-8 pb-6 px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Title with dynamic time range */}
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Revenue Generated ({timeLabel})
            </p>
            
            {/* Big number */}
            <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {formattedValue}
            </p>
            
            {/* Delta badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              isPositive 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {isPositive ? '+' : ''}{data.changePercent.toFixed(1)}% vs last period
              </span>
            </div>
          </div>
          
          {/* Icon */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50">
            <DollarSign className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
