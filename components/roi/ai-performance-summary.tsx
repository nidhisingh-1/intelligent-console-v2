"use client"

import * as React from "react"
import { 
  Bot, 
  Phone, 
  PhoneMissed, 
  Clock, 
  DollarSign,
  PhoneIncoming,
  PhoneOutgoing,
  Car,
  Wrench
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { BusinessSummary, AgentBreakdownSummary } from "@/services/roi/roi.types"

interface AIPerformanceSummaryProps {
  businessSummary: BusinessSummary
  agentBreakdown: AgentBreakdownSummary
  isLoading?: boolean
}

export function AIPerformanceSummary({ businessSummary, agentBreakdown, isLoading }: AIPerformanceSummaryProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="animate-pulse space-y-3">
            <div className="h-5 bg-gray-200 rounded w-48" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate "what if" scenarios
  const industryMissedCallRate = 0.30
  const avgCostPerMissedCall = 200
  const avgHourlyWage = 18
  const hoursEquivalent = Math.round((businessSummary.totalCallsHandled * 3) / 60)
  
  const callsYouWouldHaveMissed = Math.round(businessSummary.totalCallsHandled * industryMissedCallRate)
  const revenueAtRisk = Math.round(callsYouWouldHaveMissed * avgCostPerMissedCall)
  const laborCostSaved = Math.round(hoursEquivalent * avgHourlyWage)

  // Get agent stats by type
  const salesInboundAgent = agentBreakdown.agents.find(a => a.type === 'sales' && a.direction === 'inbound')
  const salesOutboundAgent = agentBreakdown.agents.find(a => a.type === 'sales' && a.direction === 'outbound')
  const serviceInboundAgent = agentBreakdown.agents.find(a => a.type === 'service' && a.direction === 'inbound')
  const serviceOutboundAgent = agentBreakdown.agents.find(a => a.type === 'service' && a.direction === 'outbound')

  return (
    <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-violet-600" />
            <span className="font-medium text-gray-900 text-sm">AI Agent Coverage</span>
          </div>
          <span className="text-xs text-gray-400">What your AI agents protected</span>
        </div>

        {/* Risk Avoided Stats */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
          <div className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <Phone className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs text-gray-500">Answered</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{businessSummary.totalCallsHandled.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-600">100% answer rate</p>
          </div>
          
          <div className="p-3 bg-red-50/50">
            <div className="flex items-center gap-1 mb-1">
              <PhoneMissed className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-gray-500">Would've Missed</span>
            </div>
            <p className="text-lg font-bold text-red-600">~{callsYouWouldHaveMissed}</p>
            <p className="text-[10px] text-red-500">Without AI</p>
          </div>
          
          <div className="p-3 bg-amber-50/50">
            <div className="flex items-center gap-1 mb-1">
              <DollarSign className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-xs text-gray-500">Protected</span>
            </div>
            <p className="text-lg font-bold text-amber-700">${(revenueAtRisk / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-amber-600">At-risk revenue</p>
          </div>
          
          <div className="p-3 bg-violet-50/50">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3.5 w-3.5 text-violet-600" />
              <span className="text-xs text-gray-500">Hours Saved</span>
            </div>
            <p className="text-lg font-bold text-violet-700">{hoursEquivalent}hrs</p>
            <p className="text-[10px] text-violet-600">≈ ${laborCostSaved.toLocaleString()}</p>
          </div>
        </div>

        {/* Agent Breakdown Grid: 2x2 (Inbound/Outbound × Sales/Service) */}
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3">Calls handled by agent type</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Sales Inbound */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-1">
                <Car className="h-3.5 w-3.5 text-blue-600" />
                <PhoneIncoming className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Sales Inbound</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{salesInboundAgent?.callsHandled || 0}</p>
            </div>

            {/* Sales Outbound */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-1">
                <Car className="h-3.5 w-3.5 text-blue-600" />
                <PhoneOutgoing className="h-3 w-3 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Sales Outbound</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{salesOutboundAgent?.callsHandled || 0}</p>
            </div>

            {/* Service Inbound */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
              <div className="flex items-center gap-1">
                <Wrench className="h-3.5 w-3.5 text-orange-600" />
                <PhoneIncoming className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Service Inbound</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{serviceInboundAgent?.callsHandled || 0}</p>
            </div>

            {/* Service Outbound */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
              <div className="flex items-center gap-1">
                <Wrench className="h-3.5 w-3.5 text-orange-600" />
                <PhoneOutgoing className="h-3 w-3 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Service Outbound</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{serviceOutboundAgent?.callsHandled || 0}</p>
            </div>
          </div>
        </div>

        {/* Subtle footer */}
        <div className="px-5 py-2 bg-gray-50 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">
            Industry avg: ~30% of calls go unanswered. Your AI ensures every customer gets a response.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
