"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Shield,
  Gauge,
  BarChart3,
  Zap,
  Camera,
  Globe,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

interface HealthDimension {
  label: string
  score: number
  maxScore: number
  trend: "up" | "down" | "stable"
  icon: React.ElementType
  detail: string
}

const dimensions: HealthDimension[] = [
  {
    label: "Capital Health",
    score: 68,
    maxScore: 100,
    trend: "up",
    icon: Shield,
    detail: "$412K at risk, trending down",
  },
  {
    label: "Turn Velocity",
    score: 72,
    maxScore: 100,
    trend: "up",
    icon: Gauge,
    detail: "5.6d faster than market avg",
  },
  {
    label: "Lead Generation",
    score: 64,
    maxScore: 100,
    trend: "down",
    icon: BarChart3,
    detail: "648 leads MTD, -3% vs last month",
  },
  {
    label: "Campaign ROI",
    score: 81,
    maxScore: 100,
    trend: "up",
    icon: Zap,
    detail: "Active campaigns avg 2.4x ROAS",
  },
  {
    label: "Media Quality",
    score: 56,
    maxScore: 100,
    trend: "stable",
    icon: Camera,
    detail: "38% real media coverage (target: 70%)",
  },
  {
    label: "Web Conversion",
    score: 78,
    maxScore: 100,
    trend: "up",
    icon: Globe,
    detail: "4.8% lead CVR, above benchmark",
  },
]

function getBarShade(score: number) {
  if (score >= 75) return "bg-gray-800"
  if (score >= 50) return "bg-gray-500"
  return "bg-gray-300"
}

export function DealerPulse() {
  const overallScore = Math.round(
    dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  )

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Dealer Health Pulse
          </span>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              {overallScore}
              <span className="text-xs text-gray-400 font-normal">/100</span>
            </p>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="px-5 py-4 space-y-3.5">
        {dimensions.map((dim) => {
          const Icon = dim.icon
          const pct = (dim.score / dim.maxScore) * 100
          const TrendIcon =
            dim.trend === "up" ? ArrowUp : dim.trend === "down" ? ArrowDown : Minus

          return (
            <div key={dim.label} className="group">
              <div className="flex items-center gap-3">
                <Icon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      {dim.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <TrendIcon
                        className={cn(
                          "h-3 w-3",
                          dim.trend === "down" ? "text-red-500" : "text-gray-400"
                        )}
                      />
                      <span className="text-xs font-bold tabular-nums text-gray-700">
                        {dim.score}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", getBarShade(dim.score))}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {dim.detail}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
