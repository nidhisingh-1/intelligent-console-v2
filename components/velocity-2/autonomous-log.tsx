"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Bot,
  CheckCircle2,
  Zap,
  Camera,
  TrendingDown,
  ShieldAlert,
  Bell,
  Clock,
} from "lucide-react"

interface AutoAction {
  id: string
  action: string
  vehicle: string
  result: string
  time: string
  icon: React.ElementType
  savings?: string
}

const autoActions: AutoAction[] = [
  {
    id: "aa1",
    action: "Auto-flagged for priority review",
    vehicle: "2024 Nissan Rogue",
    result:
      "Moved to top of action queue after margin turned negative. Alert sent to dealer.",
    time: "Today, 8:14 AM",
    icon: ShieldAlert,
    savings: "$76/day exposure",
  },
  {
    id: "aa2",
    action: "Campaign performance optimized",
    vehicle: "2024 Honda Accord",
    result:
      "Increased bid by 15% on high-performing keywords. CTR improved from 3.2% to 3.8%.",
    time: "Today, 7:42 AM",
    icon: Zap,
    savings: "+18% CTR",
  },
  {
    id: "aa3",
    action: "Media upgrade reminder sent",
    vehicle: "2024 Ford F-150",
    result:
      'Vehicle on clone media for 38 days. Sent SMS: "Your F-150 would sell 18% faster with real photos."',
    time: "Today, 7:00 AM",
    icon: Camera,
  },
  {
    id: "aa4",
    action: "Stage transition tracked",
    vehicle: "2024 Ram 1500",
    result:
      "Moved from Fresh to Watch stage at 19 days. Campaign already active — no intervention needed.",
    time: "Yesterday, 11:30 PM",
    icon: Clock,
  },
  {
    id: "aa5",
    action: "Market price adjustment alert",
    vehicle: "2024 BMW X3",
    result:
      "Regional comparables shifted. Notified dealer that current price is competitive (3.2% above median, justified by trim).",
    time: "Yesterday, 4:15 PM",
    icon: TrendingDown,
  },
  {
    id: "aa6",
    action: "Daily inventory digest generated",
    vehicle: "Entire Lot",
    result:
      "Morning report emailed with 3 urgent actions, 2 campaign recommendations, and lot health summary.",
    time: "Yesterday, 6:00 AM",
    icon: Bell,
  },
]

export function AutonomousLog() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Bot className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900">
            Autonomous Actions
          </span>
        </div>
        <span className="text-[10px] text-gray-400 tabular-nums">
          {autoActions.length} actions in 24h
        </span>
      </div>

      {/* Log */}
      <div className="divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
        {autoActions.map((action) => {
          const Icon = action.icon
          return (
            <div
              key={action.id}
              className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-gray-700">
                      {action.action}
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-gray-300 flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-500 mb-0.5">
                    {action.vehicle}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {action.result}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] text-gray-300 tabular-nums">
                    {action.time}
                  </p>
                  {action.savings && (
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                      {action.savings}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
