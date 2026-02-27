"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Target,
  X,
} from "lucide-react"

interface Anomaly {
  id: string
  type: "spike" | "drop" | "pattern" | "opportunity"
  title: string
  description: string
  detectedAt: string
  severity: "high" | "medium" | "info"
}

const anomalies: Anomaly[] = [
  {
    id: "a1",
    type: "spike",
    title: "Unusual VDP traffic spike on 3 vehicles",
    description:
      "Toyota Camry, Honda Accord, and Hyundai Tucson saw 2.4x normal VDP views in the last 6 hours. Likely driven by a competitor price change.",
    detectedAt: "45m ago",
    severity: "high",
  },
  {
    id: "a2",
    type: "drop",
    title: "Lead velocity declining across Watch stage",
    description:
      "Average lead velocity in Watch dropped from 3.1 to 2.4 leads/week over the past 7 days. Correlates with 4 vehicles running clone media past 20 days.",
    detectedAt: "2h ago",
    severity: "medium",
  },
  {
    id: "a3",
    type: "pattern",
    title: "Weekend pattern: SUVs convert 32% better",
    description:
      "Over the last 8 weekends, SUVs consistently convert at 32% higher rates than sedans. Your 4 at-risk SUVs may benefit from weekend-targeted campaigns.",
    detectedAt: "6h ago",
    severity: "info",
  },
  {
    id: "a4",
    type: "opportunity",
    title: "Market gap: Under-priced F-150 inventory in region",
    description:
      "Regional F-150 Lariat listings dropped 12% this week. Your Ford F-150 is among only 3 listings in a 30-mile radius at this trim.",
    detectedAt: "8h ago",
    severity: "high",
  },
]

const typeConfig = {
  spike: { icon: TrendingUp },
  drop: { icon: TrendingDown },
  pattern: { icon: Eye },
  opportunity: { icon: Target },
}

export function AnomalyAlerts() {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set())
  const visible = anomalies.filter((a) => !dismissed.has(a.id))

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-gray-900">
            Anomaly Detection
          </span>
        </div>
        <span className="text-[10px] text-gray-400 tabular-nums">
          {visible.length} active
        </span>
      </div>

      {/* Anomalies */}
      <div className="divide-y divide-gray-100">
        {visible.map((anomaly) => {
          const type = typeConfig[anomaly.type]
          const Icon = type.icon

          return (
            <div
              key={anomaly.id}
              className="px-5 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-gray-400" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-800">
                      {anomaly.title}
                    </span>
                    {anomaly.severity === "high" && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border text-red-600 bg-red-50 border-red-200">
                        HIGH
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {anomaly.description}
                  </p>
                  <span className="text-[10px] text-gray-300 tabular-nums">
                    Detected {anomaly.detectedAt}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setDismissed((prev) => new Set([...prev, anomaly.id]))
                  }
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <X className="h-3 w-3 text-gray-300" />
                </button>
              </div>
            </div>
          )
        })}

        {visible.length === 0 && (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-gray-400">
              No active anomalies — all patterns are normal.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
