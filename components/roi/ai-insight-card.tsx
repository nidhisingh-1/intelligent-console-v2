"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import type { AIInsight } from "@/services/roi/roi.types"

interface AIInsightCardProps {
  insight: AIInsight
  onViewDetails?: () => void
  isLoading?: boolean
}

export function AIInsightCard({ insight, onViewDetails, isLoading }: AIInsightCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-blue-100/50 shadow-sm">
        <CardContent className="py-4 px-5">
          <div className="animate-pulse flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-200 rounded-lg" />
            <div className="flex-1 h-5 bg-blue-200 rounded" />
            <div className="h-4 w-24 bg-blue-200 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="py-4 px-5">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          
          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              <span className="text-blue-600 font-semibold">AI Insight:</span>{' '}
              {insight.message}
            </p>
          </div>
          
          {/* CTA */}
          {onViewDetails && (
            <button
              type="button"
              onClick={onViewDetails}
              className="flex-shrink-0 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
            >
              View details
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
