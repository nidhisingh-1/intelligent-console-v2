"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Brain, Zap, Clock, ArrowRight } from "lucide-react"

interface Prediction {
  label: string
  current: string
  predicted7d: string
  predicted14d: string
  predicted30d: string
  trend: "improving" | "declining" | "stable"
  confidence: number
}

const predictions: Prediction[] = [
  {
    label: "Total Capital at Risk",
    current: "$412K",
    predicted7d: "$386K",
    predicted14d: "$348K",
    predicted30d: "$284K",
    trend: "improving",
    confidence: 87,
  },
  {
    label: "Daily Burn Rate",
    current: "$12.6K",
    predicted7d: "$11.8K",
    predicted14d: "$10.4K",
    predicted30d: "$9.2K",
    trend: "improving",
    confidence: 82,
  },
  {
    label: "Velocity Score",
    current: "72",
    predicted7d: "74",
    predicted14d: "78",
    predicted30d: "81",
    trend: "improving",
    confidence: 79,
  },
  {
    label: "Vehicles in Critical",
    current: "9",
    predicted7d: "7",
    predicted14d: "5",
    predicted30d: "3",
    trend: "improving",
    confidence: 74,
  },
]

interface Scenario {
  name: string
  description: string
  marginalImpact: string
  isNegative: boolean
  icon: React.ElementType
}

const scenarios: Scenario[] = [
  {
    name: "Do Nothing",
    description: "Continue current trajectory with no new actions",
    marginalImpact: "-$18,400 margin loss over 30d",
    isNegative: true,
    icon: Clock,
  },
  {
    name: "Recommended Actions",
    description: "Execute all 5 AI-recommended priority actions",
    marginalImpact: "+$11,974 margin protected",
    isNegative: false,
    icon: Brain,
  },
  {
    name: "Maximum Acceleration",
    description: "Launch campaigns + upgrade media on all eligible vehicles",
    marginalImpact: "+$24,600 margin protected",
    isNegative: false,
    icon: Zap,
  },
]

export function PredictiveEngine() {
  const [activeScenario, setActiveScenario] = React.useState(1)

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-gray-900">
            Predictive Engine
          </span>
          <span className="text-[10px] text-gray-400">
            Powered by inventory pattern analysis
          </span>
        </div>
      </div>

      {/* Scenario selector */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-3">
          Compare Scenarios
        </p>
        <div className="grid grid-cols-3 gap-2">
          {scenarios.map((scenario, i) => {
            const Icon = scenario.icon
            const isActive = i === activeScenario
            return (
              <button
                key={scenario.name}
                onClick={() => setActiveScenario(i)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all",
                  isActive
                    ? "bg-gray-50 border-gray-300"
                    : "bg-white border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-800">
                    {scenario.name}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-2">
                  {scenario.description}
                </p>
                <span
                  className={cn(
                    "text-[11px] font-bold",
                    scenario.isNegative ? "text-red-600" : "text-gray-800"
                  )}
                >
                  {scenario.marginalImpact}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Predictions grid */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-3">
          {predictions.map((pred) => (
            <div
              key={pred.label}
              className="p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  {pred.label}
                </span>
                <span className="text-[10px] text-gray-300">
                  {pred.confidence}% conf.
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-900 tabular-nums">
                  {pred.current}
                </span>
                <span className="text-[10px] text-gray-400">today</span>
              </div>

              <div className="flex items-center gap-1">
                {[
                  { label: "7d", value: pred.predicted7d },
                  { label: "14d", value: pred.predicted14d },
                  { label: "30d", value: pred.predicted30d },
                ].map((period, idx) => (
                  <React.Fragment key={period.label}>
                    {idx > 0 && (
                      <ArrowRight className="h-3 w-3 text-gray-200 flex-shrink-0" />
                    )}
                    <div className="flex-1 text-center px-2 py-1.5 rounded-lg bg-white border border-gray-100">
                      <p className="text-xs font-bold tabular-nums text-gray-700">
                        {period.value}
                      </p>
                      <p className="text-[9px] text-gray-300 mt-0.5">
                        {period.label}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
