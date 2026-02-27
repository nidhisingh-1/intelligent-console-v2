"use client"

import * as React from "react"
import { Bot, PhoneIncoming, PhoneOutgoing, Car, Wrench, Star } from "lucide-react"
import { CollapsibleSection } from "./collapsible-section"
import { Badge } from "@/components/ui/badge"
import type { AgentBreakdownSummary } from "@/services/roi/roi.types"

interface AgentBreakdownProps {
  data: AgentBreakdownSummary
  isLoading?: boolean
}

export function AgentBreakdown({ data, isLoading }: AgentBreakdownProps) {
  if (isLoading) {
    return (
      <CollapsibleSection
        title="AI Agent Performance"
        icon={<Bot className="h-4 w-4 text-violet-600" />}
        summary="Loading..."
        defaultOpen={false}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-gray-200 rounded" />
          <div className="h-16 bg-gray-200 rounded" />
        </div>
      </CollapsibleSection>
    )
  }

  const summary = (
    <span>
      {data.activeAgents} agents • {data.totalCallsHandled.toLocaleString()} calls • {data.overallQualificationRate}% qualified
    </span>
  )

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  // Group agents
  const salesInbound = data.agents.find(a => a.type === 'sales' && a.direction === 'inbound')
  const salesOutbound = data.agents.find(a => a.type === 'sales' && a.direction === 'outbound')
  const serviceInbound = data.agents.find(a => a.type === 'service' && a.direction === 'inbound')
  const serviceOutbound = data.agents.find(a => a.type === 'service' && a.direction === 'outbound')

  const AgentCard = ({ agent, label, typeIcon, directionIcon, bgColor }: { 
    agent: typeof data.agents[0] | undefined
    label: string
    typeIcon: React.ReactNode
    directionIcon: React.ReactNode
    bgColor: string
  }) => {
    if (!agent) return null
    
    return (
      <div className={`p-3 rounded-lg ${bgColor} border`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            {typeIcon}
            {directionIcon}
            <span className="text-sm font-medium text-gray-900">{label}</span>
          </div>
          {agent.customerRating && (
            <div className="flex items-center gap-0.5 text-amber-600">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-xs font-medium">{agent.customerRating}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900">{agent.callsHandled}</p>
            <p className="text-[10px] text-gray-500">Calls</p>
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-600">{agent.qualificationRate}%</p>
            <p className="text-[10px] text-gray-500">Qualified</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{agent.transferred + agent.callbacksArranged}</p>
            <p className="text-[10px] text-gray-500">Leads</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-700">{formatTime(agent.avgHandleTime)}</p>
            <p className="text-[10px] text-gray-500">Avg Time</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CollapsibleSection
      title="AI Agent Performance"
      icon={<Bot className="h-4 w-4 text-violet-600" />}
      summary={summary}
      defaultOpen={false}
    >
      <div className="space-y-4">
        {/* Sales Agents */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Car className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Sales Agents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AgentCard 
              agent={salesInbound}
              label="Inbound"
              typeIcon={<Car className="h-3.5 w-3.5 text-blue-600" />}
              directionIcon={<PhoneIncoming className="h-3 w-3 text-emerald-500" />}
              bgColor="bg-blue-50 border-blue-100"
            />
            <AgentCard 
              agent={salesOutbound}
              label="Outbound"
              typeIcon={<Car className="h-3.5 w-3.5 text-blue-600" />}
              directionIcon={<PhoneOutgoing className="h-3 w-3 text-blue-500" />}
              bgColor="bg-blue-50 border-blue-100"
            />
          </div>
        </div>

        {/* Service Agents */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Service Agents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AgentCard 
              agent={serviceInbound}
              label="Inbound"
              typeIcon={<Wrench className="h-3.5 w-3.5 text-orange-600" />}
              directionIcon={<PhoneIncoming className="h-3 w-3 text-emerald-500" />}
              bgColor="bg-orange-50 border-orange-100"
            />
            <AgentCard 
              agent={serviceOutbound}
              label="Outbound"
              typeIcon={<Wrench className="h-3.5 w-3.5 text-orange-600" />}
              directionIcon={<PhoneOutgoing className="h-3 w-3 text-blue-500" />}
              bgColor="bg-orange-50 border-orange-100"
            />
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <PhoneIncoming className="h-3 w-3 text-emerald-500" />
            Inbound (customer calls in)
          </span>
          <span className="flex items-center gap-1">
            <PhoneOutgoing className="h-3 w-3 text-blue-500" />
            Outbound (AI calls out)
          </span>
        </div>
        <span>Overall: <strong className="text-emerald-600">{data.overallQualificationRate}%</strong> qualification</span>
      </div>
    </CollapsibleSection>
  )
}
