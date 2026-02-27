"use client"

import * as React from "react"
import { RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { ROIDashboard } from "@/components/roi/roi-dashboard"
import { TimeRangeSelector } from "@/components/roi/time-range-selector"
import { TrendsSection } from "@/components/roi/trends-section"
import { AgentBreakdown } from "@/components/roi/agent-breakdown"
import { OpportunitiesSection } from "@/components/roi/opportunities-section"

import {
  mockBusinessSummary,
  mockSalesPipeline,
  mockServicePipeline,
  mockTrendsData,
  mockAgentBreakdown,
  mockOpportunities,
} from "@/lib/roi-mocks"

import type { TimeRange } from "@/services/roi/roi.types"
import { getTimeRangeLabel } from "@/services/roi/roi.types"

export default function ROIDashboardPage() {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('mtd')
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastUpdated] = React.useState(new Date())

  const timeLabel = getTimeRangeLabel(timeRange)

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Your Spyne ROI</h1>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <RefreshCw className="h-3 w-3" />
                Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              </p>
            </div>
            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          </div>
        </header>

        {/* Main Dashboard - Single Cohesive View */}
        <main className="px-6 py-6">
          <ROIDashboard 
            businessSummary={mockBusinessSummary}
            salesPipeline={mockSalesPipeline}
            servicePipeline={mockServicePipeline}
            opportunities={mockOpportunities}
            timeLabel={timeLabel}
            isLoading={isLoading}
          />
          
          {/* Optional: Expandable sections for details */}
          <div className="mt-6 space-y-3">
            <TrendsSection 
              data={mockTrendsData}
              isLoading={isLoading}
            />
            
            <AgentBreakdown 
              data={mockAgentBreakdown}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
