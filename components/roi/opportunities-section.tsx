"use client"

import * as React from "react"
import { Lightbulb, DollarSign, ArrowRight, CalendarX, Moon, PhoneForwarded, Zap } from "lucide-react"
import { CollapsibleSection } from "./collapsible-section"
import { Button } from "@/components/ui/button"
import type { OpportunitiesSummary, Opportunity } from "@/services/roi/roi.types"

interface OpportunitiesSectionProps {
  data: OpportunitiesSummary
  isLoading?: boolean
}

const getCategoryIcon = (category: Opportunity['category']) => {
  switch (category) {
    case 'low_show_rate': return <CalendarX className="h-4 w-4" />
    case 'after_hours_volume': return <Moon className="h-4 w-4" />
    case 'callback_followup': return <PhoneForwarded className="h-4 w-4" />
    case 'peak_optimization': return <Zap className="h-4 w-4" />
    default: return <Lightbulb className="h-4 w-4" />
  }
}

const getCategoryColor = (category: Opportunity['category']) => {
  switch (category) {
    case 'low_show_rate': return 'bg-red-50 border-red-200 text-red-600'
    case 'after_hours_volume': return 'bg-purple-50 border-purple-200 text-purple-600'
    case 'callback_followup': return 'bg-teal-50 border-teal-200 text-teal-600'
    case 'peak_optimization': return 'bg-amber-50 border-amber-200 text-amber-600'
    default: return 'bg-blue-50 border-blue-200 text-blue-600'
  }
}

export function OpportunitiesSection({ data, isLoading }: OpportunitiesSectionProps) {
  if (isLoading) {
    return (
      <CollapsibleSection
        title="Opportunities"
        icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
        summary="Loading..."
        defaultOpen={false}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
        </div>
      </CollapsibleSection>
    )
  }

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data.totalPotentialRevenue)

  const summary = (
    <span className="flex items-center gap-1.5 text-amber-600">
      <DollarSign className="h-4 w-4" />
      {formattedTotal} potential revenue identified
    </span>
  )

  return (
    <CollapsibleSection
      title="Opportunities"
      icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
      summary={summary}
      defaultOpen={false}
    >
      <div className="space-y-3">
        {data.opportunities.map((opp) => {
          const categoryColor = getCategoryColor(opp.category)
          const formattedRevenue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(opp.potentialRevenue)
          
          return (
            <div 
              key={opp.id}
              className={`p-4 rounded-lg border ${categoryColor}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/80">
                    {getCategoryIcon(opp.category)}
                  </div>
                  <div>
                    <p className="font-semibold">{opp.title}</p>
                    <p className="text-sm opacity-80 mt-0.5">{opp.description}</p>
                    <p className="text-sm font-medium mt-2">
                      Potential: {formattedRevenue}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-shrink-0 bg-white hover:bg-gray-50"
                >
                  {opp.actionLabel}
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Total summary */}
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-700">Total Potential Revenue</p>
            <p className="text-2xl font-bold text-amber-800">{formattedTotal}</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            Review All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  )
}
