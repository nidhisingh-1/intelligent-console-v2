"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Activity,
  ShieldCheck,
  Target,
  BarChart3,
  Camera,
  Zap,
  Brain,
  MessageSquare,
  ArrowRight,
} from "lucide-react"

interface AgentEvent {
  id: string
  agent: string
  action: string
  detail: string
  time: string
  icon: React.ElementType
  handoff?: { to: string; reason: string }
  isNew?: boolean
}

const initialEvents: AgentEvent[] = [
  {
    id: "1",
    agent: "Margin Sentinel",
    action: "Detected margin breach",
    detail:
      "VW Tiguan crossed critical threshold — $320 remaining at $88/day burn. Auto-flagged for priority queue.",
    time: "2m ago",
    icon: ShieldCheck,
    handoff: { to: "Campaign Engine", reason: "Requesting Tier 3 campaign activation" },
  },
  {
    id: "2",
    agent: "Campaign Engine",
    action: "Accepted handoff from Margin Sentinel",
    detail:
      "Processing Tier 3 Maximum campaign for VW Tiguan. Targeting in-market shoppers within 25mi. Budget: $420.",
    time: "2m ago",
    icon: Zap,
  },
  {
    id: "3",
    agent: "Lead Optimizer",
    action: "Root cause analysis complete",
    detail:
      "Ford F-150 has 1,240 VDP views but only 2 leads (0.16% conv). Root cause: CTA below fold on mobile (78% of traffic). Recommending CTA repositioning + Tier 2 campaign.",
    time: "5m ago",
    icon: Target,
    handoff: { to: "Campaign Engine", reason: "Queue Tier 2 campaign with CTA optimization" },
  },
  {
    id: "4",
    agent: "Market Scanner",
    action: "Opportunity detected",
    detail:
      "Regional F-150 Lariat listings dropped 12% this week. Your F-150 is among only 3 listings in 30mi at this trim. Demand signal: strong.",
    time: "8m ago",
    icon: BarChart3,
    handoff: { to: "Lead Optimizer", reason: "High-demand vehicle — prioritize lead capture" },
  },
  {
    id: "5",
    agent: "Media Intelligence",
    action: "Photo performance audit complete",
    detail:
      "6 vehicles on clone media past optimal window. Real media upgrade on Hyundai Tucson increased CTR by 47% — pattern holds for remaining vehicles.",
    time: "12m ago",
    icon: Camera,
  },
  {
    id: "6",
    agent: "Aging Predictor",
    action: "Stage transition forecast updated",
    detail:
      "3 Watch vehicles projected to enter Risk within 5 days: Chevy Equinox (3d), Subaru Outback (5d), Ram 1500 (4d). Pre-emptive campaigns recommended.",
    time: "15m ago",
    icon: Brain,
    handoff: {
      to: "Campaign Engine",
      reason: "Pre-emptive Tier 1 campaigns on 3 transitioning vehicles",
    },
  },
  {
    id: "7",
    agent: "Margin Sentinel",
    action: "Break-even countdown update",
    detail:
      "Jeep Grand Cherokee: 8.4 days to break-even. Campaign scheduled to activate tomorrow — projected to extend runway by 6 days.",
    time: "22m ago",
    icon: ShieldCheck,
  },
]

const incomingEvents: AgentEvent[] = [
  {
    id: "new1",
    agent: "Market Scanner",
    action: "Price shift detected",
    detail:
      "BMW X3 competitor just reduced price by $1,400. Your listing is now 4.8% above market. Holding recommendation — your trim level justifies the premium.",
    time: "Just now",
    icon: BarChart3,
    isNew: true,
  },
  {
    id: "new2",
    agent: "Campaign Engine",
    action: "Campaign activated successfully",
    detail:
      "VW Tiguan Tier 3 Maximum campaign is now live. Targeting 2,400 in-market shoppers. First impression delivery expected within 30 minutes.",
    time: "Just now",
    icon: Zap,
    isNew: true,
  },
  {
    id: "new3",
    agent: "Lead Optimizer",
    action: "New lead captured",
    detail:
      'Honda Accord received a high-intent lead: "I\'d like to schedule a test drive this weekend." Source: campaign ad. Quality score: 92/100.',
    time: "Just now",
    icon: Target,
    isNew: true,
  },
]

export function LiveAgentFeed() {
  const [events, setEvents] = React.useState(initialEvents)
  const [incomingIdx, setIncomingIdx] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIncomingIdx((prev) => {
        if (prev < incomingEvents.length) {
          const newEvent = incomingEvents[prev]
          setEvents((prevEvents) => [newEvent, ...prevEvents])
          return prev + 1
        }
        return prev
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Activity className="h-4 w-4 text-gray-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Live Agent Activity
          </span>
          <span className="text-[10px] text-gray-400">
            6 agents · real-time
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-gray-500">
            All systems active
          </span>
        </div>
      </div>

      <div className="max-h-[460px] overflow-y-auto">
        {events.map((event) => {
          const Icon = event.icon
          return (
            <div
              key={event.id}
              className={cn(
                "px-5 py-3.5 border-b border-gray-50 transition-all",
                event.isNew
                  ? "bg-blue-50/30 border-l-2 border-l-blue-400 animate-in slide-in-from-top-2 duration-500"
                  : "hover:bg-gray-50/50"
              )}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-bold text-gray-700">
                      {event.agent}
                    </span>
                    <span className="text-[10px] text-gray-300">·</span>
                    <span className="text-[11px] font-medium text-gray-500">
                      {event.action}
                    </span>
                    {event.isNew && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {event.detail}
                  </p>

                  {event.handoff && (
                    <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-violet-50/50 border border-violet-100">
                      <MessageSquare className="h-3 w-3 text-violet-400 flex-shrink-0" />
                      <span className="text-[10px] text-violet-600">
                        <span className="font-bold">→ {event.handoff.to}:</span>{" "}
                        {event.handoff.reason}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-300 flex-shrink-0 mt-1 tabular-nums">
                  {event.time}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
