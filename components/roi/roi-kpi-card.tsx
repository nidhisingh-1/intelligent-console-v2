"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { KPIMetric } from "@/services/roi/roi.types"

interface ROIKPICardProps {
  title: string
  data: KPIMetric
  icon: React.ReactNode
  format?: 'number' | 'percent' | 'currency'
  accentColor: string
  tooltip?: string
  isLoading?: boolean
}

export function ROIKPICard({ 
  title, 
  data, 
  icon, 
  format = 'number',
  accentColor,
  tooltip,
  isLoading 
}: ROIKPICardProps) {
  const isPositive = data.changePercent >= 0

  const formatValue = (value: number) => {
    if (format === 'percent') {
      return `${value.toFixed(1)}%`
    }
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    }
    return value.toLocaleString()
  }

  const formatChange = () => {
    if (format === 'percent') {
      return `${isPositive ? '+' : ''}${data.change.toFixed(1)}pp`
    }
    return `${isPositive ? '+' : ''}${data.change}`
  }

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-sm">
        <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />
        <CardContent className="pt-6 pb-5 px-5">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="relative overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
      title={tooltip}
    >
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />
      
      <CardContent className="pt-6 pb-5 px-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            {/* Title */}
            <p className="text-sm font-medium text-gray-500">
              {title}
            </p>
            
            {/* Value */}
            <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {formatValue(data.value)}
            </p>
            
            {/* Delta */}
            <div className={`inline-flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{formatChange()}</span>
            </div>
          </div>
          
          {/* Icon */}
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
