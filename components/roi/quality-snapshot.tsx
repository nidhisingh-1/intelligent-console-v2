"use client"

import * as React from "react"
import { ShieldCheck, TrendingUp, TrendingDown, Minus, CheckCircle2, AlertCircle } from "lucide-react"
import { CollapsibleSection } from "./collapsible-section"
import type { QualitySnapshot as QualitySnapshotType } from "@/services/roi/roi.types"

interface QualitySnapshotProps {
  data: QualitySnapshotType
  isLoading?: boolean
}

export function QualitySnapshot({ data, isLoading }: QualitySnapshotProps) {
  if (isLoading) {
    return (
      <CollapsibleSection
        title="Quality Check"
        icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
        summary="Loading..."
        defaultOpen={false}
      >
        <div className="animate-pulse grid grid-cols-2 gap-3">
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
        </div>
      </CollapsibleSection>
    )
  }

  const summary = data.overallHealthy ? (
    <span className="flex items-center gap-1.5 text-emerald-600">
      <CheckCircle2 className="h-4 w-4" />
      All systems healthy
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-amber-600">
      <AlertCircle className="h-4 w-4" />
      {data.issueCount} issue{data.issueCount > 1 ? 's' : ''} need{data.issueCount === 1 ? 's' : ''} attention
    </span>
  )

  const getMetricStatus = (value: number, threshold: { good: number; warning: number }, isLowerBetter: boolean = false) => {
    if (isLowerBetter) {
      if (value <= threshold.good) return 'good'
      if (value <= threshold.warning) return 'warning'
      return 'critical'
    }
    if (value >= threshold.good) return 'good'
    if (value >= threshold.warning) return 'warning'
    return 'critical'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-50 border-emerald-200 text-emerald-700'
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-700'
      case 'critical': return 'bg-red-50 border-red-200 text-red-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const formatValue = (key: string, value: number) => {
    if (key === 'avgHandleTime') {
      const mins = Math.floor(value / 60)
      const secs = value % 60
      return `${mins}m ${secs}s`
    }
    if (key === 'customerSatisfaction') {
      return `${value.toFixed(1)}/5`
    }
    return `${value.toFixed(1)}%`
  }

  const metrics = [
    { 
      key: 'qualificationRate', 
      ...data.metrics.qualificationRate, 
      isLowerBetter: false,
    },
    { 
      key: 'avgHandleTime', 
      ...data.metrics.avgHandleTime, 
      isLowerBetter: true, // Lower handle time is better
    },
    { 
      key: 'customerSatisfaction', 
      ...data.metrics.customerSatisfaction, 
      isLowerBetter: false,
    },
    { 
      key: 'transferSuccessRate', 
      ...data.metrics.transferSuccessRate, 
      isLowerBetter: false,
    },
  ]

  return (
    <CollapsibleSection
      title="Quality Check"
      icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
      summary={summary}
      defaultOpen={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const status = getMetricStatus(metric.value, metric.threshold, metric.isLowerBetter)
          const statusColor = getStatusColor(status)
          
          return (
            <div 
              key={metric.key}
              className={`p-4 rounded-lg border ${statusColor}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{metric.name}</p>
                  <p className="text-2xl font-bold mt-1">{formatValue(metric.key, metric.value)}</p>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
            </div>
          )
        })}
      </div>
    </CollapsibleSection>
  )
}
