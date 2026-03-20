"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Brain,
  Search,
  Database,
  GitCompare,
  Lightbulb,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from "lucide-react"

type ThoughtType = "observation" | "query" | "analysis" | "comparison" | "insight" | "decision"

interface Thought {
  id: string
  type: ThoughtType
  content: string
  data?: string
  timestamp: string
  complete: boolean
}

const typeConfig: Record<ThoughtType, { icon: React.ElementType; color: string }> = {
  observation: { icon: Search, color: "text-gray-400" },
  query: { icon: Database, color: "text-blue-400" },
  analysis: { icon: Brain, color: "text-amber-400" },
  comparison: { icon: GitCompare, color: "text-violet-400" },
  insight: { icon: Lightbulb, color: "text-emerald-400" },
  decision: { icon: CheckCircle2, color: "text-gray-800" },
}

const thoughtStreams: Record<string, Thought[]> = {
  "Margin Sentinel": [
    {
      id: "t1",
      type: "observation",
      content: "VW Tiguan: 58 days on lot, $320 margin remaining",
      timestamp: "3m ago",
      complete: true,
    },
    {
      id: "t2",
      type: "query",
      content: "Querying burn rate history for this VIN...",
      data: "SELECT daily_burn, margin_remaining FROM vehicle_metrics WHERE vin = 'WVWZZZ3CZWE012345' ORDER BY date DESC LIMIT 14",
      timestamp: "3m ago",
      complete: true,
    },
    {
      id: "t3",
      type: "analysis",
      content: "Burn rate accelerating: $72/day (7d ago) → $88/day (now). At current rate, margin depletes in 3.6 days.",
      timestamp: "2m ago",
      complete: true,
    },
    {
      id: "t4",
      type: "comparison",
      content: "Cross-referencing with 847 similar Tiguans sold in region over 90 days. Vehicles that received campaigns at this stage recovered 62% of remaining margin on average.",
      timestamp: "2m ago",
      complete: true,
    },
    {
      id: "t5",
      type: "query",
      content: "Checking current regional Tiguan inventory...",
      data: "3 competing Tiguans sold this week in 50mi radius. Supply is thinning — demand signal is strong.",
      timestamp: "1m ago",
      complete: true,
    },
    {
      id: "t6",
      type: "insight",
      content: "This vehicle is 3.6 days from complete margin depletion, but regional demand is high. A Tier 3 Maximum campaign targeting in-market shoppers within 25mi has a 78% probability of generating a viable lead within 5 days.",
      timestamp: "1m ago",
      complete: true,
    },
    {
      id: "t7",
      type: "decision",
      content: "RECOMMENDATION: Activate Tier 3 Maximum campaign immediately. Projected outcome: prevent $5,104 total loss, capture remaining $320 margin + dealer holdback. Confidence: 94%.",
      timestamp: "Just now",
      complete: true,
    },
  ],
  "Lead Optimizer": [
    {
      id: "l1",
      type: "observation",
      content: "Ford F-150 Lariat: 1,240 VDP views in 14 days, only 2 leads (0.16% conversion)",
      timestamp: "8m ago",
      complete: true,
    },
    {
      id: "l2",
      type: "analysis",
      content: "Conversion rate is 8.5x below benchmark (1.36% for F-150 Lariats in this market). Investigating root cause...",
      timestamp: "7m ago",
      complete: true,
    },
    {
      id: "l3",
      type: "query",
      content: "Analyzing page heatmap and user behavior data...",
      data: "78% of visitors scroll past the CTA fold. Average time on page: 34s (healthy). Bounce from lead form: 89%.",
      timestamp: "6m ago",
      complete: true,
    },
    {
      id: "l4",
      type: "insight",
      content: "Root cause identified: visitors are engaged (low bounce, good dwell time) but the lead form placement is below fold on mobile. Clone media may also be reducing trust.",
      timestamp: "5m ago",
      complete: true,
    },
    {
      id: "l5",
      type: "comparison",
      content: "Comparing with 3 similar F-150 listings that converted at 2.4%...",
      timestamp: "3m ago",
      complete: true,
    },
    {
      id: "l6",
      type: "decision",
      content: "RECOMMENDATION: Launch Tier 2 campaign with CTA repositioning. Expected improvement: 0.16% → 1.8% conversion rate, +4-6 leads, save 5-8 days. Confidence: 88%.",
      timestamp: "Now",
      complete: false,
    },
  ],
}

export function AgentThinking() {
  const [activeAgent, setActiveAgent] = React.useState("Margin Sentinel")
  const [visibleCount, setVisibleCount] = React.useState(4)
  const agents = Object.keys(thoughtStreams)
  const thoughts = thoughtStreams[activeAgent] || []

  React.useEffect(() => {
    setVisibleCount(4)
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const max = thoughtStreams[activeAgent]?.length || 0
        return prev < max ? prev + 1 : prev
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [activeAgent])

  const visibleThoughts = thoughts.slice(0, visibleCount)

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Brain className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900">Agent Reasoning</span>
          <span className="text-[10px] text-gray-400">Chain of thought</span>
        </div>
      </div>

      {/* Agent tabs */}
      <div className="px-5 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
        {agents.map((agent) => (
          <button
            key={agent}
            onClick={() => setActiveAgent(agent)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
              activeAgent === agent
                ? "bg-gray-900 text-white"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
            )}
          >
            {agent}
          </button>
        ))}
      </div>

      {/* Thought stream */}
      <div className="px-5 py-4 space-y-0">
        {visibleThoughts.map((thought, i) => {
          const config = typeConfig[thought.type]
          const Icon = config.icon
          const isLast = i === visibleThoughts.length - 1

          return (
            <div key={thought.id} className="flex gap-3">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "p-1.5 rounded-lg border flex-shrink-0 z-10 bg-white",
                    thought.type === "decision"
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-100"
                  )}
                >
                  {!thought.complete && isLast ? (
                    <Loader2 className="h-3 w-3 text-amber-500 animate-spin" />
                  ) : (
                    <Icon className={cn("h-3 w-3", config.color)} />
                  )}
                </div>
                {!isLast && <div className="w-px flex-1 bg-gray-200 min-h-[16px]" />}
              </div>

              {/* Content */}
              <div className={cn("pb-4 flex-1 min-w-0", isLast && "pb-0")}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    {thought.type}
                  </span>
                  <span className="text-[9px] text-gray-300 tabular-nums">
                    {thought.timestamp}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    thought.type === "decision"
                      ? "text-gray-900 font-medium"
                      : "text-gray-600"
                  )}
                >
                  {thought.content}
                </p>
                {thought.data && (
                  <div className="mt-1.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                      {thought.data}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {visibleCount < thoughts.length && (
          <div className="flex items-center gap-2 ml-10 pt-2">
            <Loader2 className="h-3 w-3 text-gray-400 animate-spin" />
            <span className="text-[11px] text-gray-400">Agent is reasoning...</span>
          </div>
        )}
      </div>
    </div>
  )
}
