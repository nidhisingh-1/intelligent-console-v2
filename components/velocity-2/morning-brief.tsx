"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface BriefInsight {
  type: "positive" | "warning" | "critical"
  text: string
  metric?: string
}

const todayInsights: BriefInsight[] = [
  {
    type: "positive",
    text: "Daily burn dropped 8.1% this month — your fastest improvement in 90 days.",
    metric: "$12,640/day",
  },
  {
    type: "warning",
    text: "3 vehicles cross from Watch to Risk today if no action is taken.",
    metric: "$288/day combined",
  },
  {
    type: "critical",
    text: "Nissan Rogue has been margin-negative for 6 days. Every day costs you $76.",
    metric: "-$240 total",
  },
  {
    type: "positive",
    text: "Hyundai Tucson's real media upgrade drove 5 appointments in 3 days — best performing vehicle.",
    metric: "5.6% CTR",
  },
]

const typeConfig = {
  positive: { icon: CheckCircle2, text: "text-gray-600" },
  warning: { icon: AlertTriangle, text: "text-gray-600" },
  critical: { icon: AlertTriangle, text: "text-red-600" },
}

export function MorningBrief() {
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {greeting}. Here&apos;s your inventory pulse.
            </h2>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              {" · "}AI analyzed 142 vehicles at{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span className="text-[11px] font-medium text-gray-400">
            4 insights today
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mx-6 mb-4 grid grid-cols-4 gap-3">
        {[
          { label: "Velocity Score", value: "72", delta: "+4.2", positive: true },
          { label: "Daily Burn", value: "$12.6K", delta: "-8.1%", positive: true },
          { label: "Capital at Risk", value: "$412K", delta: "-6.8%", positive: true },
          { label: "Vehicles at Risk", value: "33", delta: "-12%", positive: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100"
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-gray-900 tabular-nums">
                {stat.value}
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold flex items-center gap-0.5",
                  stat.positive ? "text-emerald-600" : "text-red-600"
                )}
              >
                {stat.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="px-6 pb-6 space-y-2">
        {todayInsights.map((insight, i) => {
          const config = typeConfig[insight.type]
          const Icon = config.icon
          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50",
                insight.type === "critical" && "border-red-200 bg-red-50/30"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 mt-0.5 flex-shrink-0",
                  insight.type === "critical" ? "text-red-500" : "text-gray-400"
                )}
              />
              <p className={cn("text-sm leading-relaxed flex-1", config.text)}>
                {insight.text}
              </p>
              {insight.metric && (
                <span
                  className={cn(
                    "text-xs font-bold tabular-nums flex-shrink-0",
                    insight.type === "critical" ? "text-red-600" : "text-gray-500"
                  )}
                >
                  {insight.metric}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
