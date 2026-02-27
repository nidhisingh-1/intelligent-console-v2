"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Search,
  Brain,
  FileCheck,
  Loader2,
  CheckCircle2,
  Megaphone,
  Camera,
  TrendingDown,
  Zap,
  RotateCcw,
  ChevronRight,
} from "lucide-react"

type PipelineStage = "detected" | "reasoning" | "proposed" | "approved" | "executing" | "complete"

interface PipelineItem {
  id: string
  vehicle: string
  action: string
  actionType: "campaign" | "media" | "price" | "urgent"
  stage: PipelineStage
  agent: string
  reasoning: string[]
  confidence: number
  projectedSavings: string
  startedAt: string
  duration?: string
}

const actionTypeConfig = {
  campaign: { icon: Megaphone, label: "Campaign" },
  media: { icon: Camera, label: "Media" },
  price: { icon: TrendingDown, label: "Price" },
  urgent: { icon: Zap, label: "Urgent" },
}

const stages: { key: PipelineStage; label: string }[] = [
  { key: "detected", label: "Detected" },
  { key: "reasoning", label: "Reasoning" },
  { key: "proposed", label: "Proposed" },
  { key: "approved", label: "Approved" },
  { key: "executing", label: "Executing" },
  { key: "complete", label: "Complete" },
]

const initialPipeline: PipelineItem[] = [
  {
    id: "p1",
    vehicle: "2024 VW Tiguan SEL R-Line",
    action: "Activate Tier 3 Maximum campaign",
    actionType: "urgent",
    stage: "executing",
    agent: "Campaign Engine",
    reasoning: [
      "Detected: 58 days on lot, $320 margin remaining at $88/day burn",
      "Pattern match: Similar vehicles recovered 62% margin with Tier 3 campaigns",
      "Market scan: 3 competing Tiguans sold in region this week — demand confirmed",
      "Decision: Tier 3 Maximum campaign, targeting in-market shoppers within 25mi",
    ],
    confidence: 94,
    projectedSavings: "$5,104",
    startedAt: "3m ago",
    duration: "~2m remaining",
  },
  {
    id: "p2",
    vehicle: "2024 Ford F-150 Lariat",
    action: "Launch Tier 2 Accelerated campaign",
    actionType: "campaign",
    stage: "proposed",
    agent: "Lead Optimizer",
    reasoning: [
      "Detected: 1,240 VDP views but only 2 leads (0.16% conversion)",
      "Diagnosis: High visibility, low capture — likely CTA positioning issue",
      "Cross-check: Similar F-150s with campaigns convert at 2.4% avg",
      "Recommendation: Tier 2 campaign + CTA repositioning for max lead capture",
    ],
    confidence: 88,
    projectedSavings: "$2,360",
    startedAt: "8m ago",
  },
  {
    id: "p3",
    vehicle: "2024 Kia Sportage X-Pro",
    action: "Upgrade to real media",
    actionType: "media",
    stage: "reasoning",
    agent: "Media Intelligence",
    reasoning: [
      "Detected: 41 days on clone media with 3 leads — momentum present but decelerating",
      "Analyzing: Real media conversion rates for comparable SUVs in inventory...",
    ],
    confidence: 76,
    projectedSavings: "$1,680",
    startedAt: "12m ago",
  },
  {
    id: "p4",
    vehicle: "2024 Honda Accord Sport",
    action: "Increased campaign bid by 15%",
    actionType: "campaign",
    stage: "complete",
    agent: "Campaign Engine",
    reasoning: [
      "Detected: High-performing keywords showing increased competition",
      "Analysis: 15% bid increase projected to maintain position at $42 CPA",
      "Executed: Bid adjusted, CTR improved from 3.2% to 3.8%",
      "Result: 2 additional leads generated within 4 hours",
    ],
    confidence: 91,
    projectedSavings: "$860",
    startedAt: "42m ago",
    duration: "Completed in 8s",
  },
  {
    id: "p5",
    vehicle: "2024 Jeep Grand Cherokee",
    action: "Price optimization recommendation",
    actionType: "price",
    stage: "detected",
    agent: "Market Scanner",
    reasoning: [
      "Detected: Market comparables shifted — current price 2.8% above new median",
    ],
    confidence: 72,
    projectedSavings: "$1,890",
    startedAt: "Just now",
  },
]

export function ExecutionPipeline() {
  const [pipeline, setPipeline] = React.useState(initialPipeline)
  const [expandedId, setExpandedId] = React.useState<string | null>("p1")

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPipeline((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.8) {
            const stageIndex = stages.findIndex((s) => s.key === item.stage)
            if (stageIndex < stages.length - 1 && stageIndex >= 0) {
              return { ...item, stage: stages[stageIndex + 1].key }
            }
          }
          return item
        })
      )
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-gray-900">Execution Pipeline</span>
          <span className="text-[10px] text-gray-400">
            {pipeline.filter((p) => p.stage !== "complete").length} in flight
          </span>
        </div>
        <div className="flex items-center gap-2">
          {stages.map((stage) => {
            const count = pipeline.filter((p) => p.stage === stage.key).length
            return (
              <div
                key={stage.key}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100"
              >
                <span className="text-[9px] text-gray-400">{stage.label}</span>
                <span className="text-[10px] font-bold text-gray-600 tabular-nums">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {pipeline.map((item) => {
          const actionCfg = actionTypeConfig[item.actionType]
          const ActionIcon = actionCfg.icon
          const isExpanded = expandedId === item.id
          const stageIndex = stages.findIndex((s) => s.key === item.stage)

          return (
            <div key={item.id} className="px-5 py-4">
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {item.stage === "executing" || item.stage === "reasoning" ? (
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                        <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />
                      </div>
                    ) : item.stage === "complete" ? (
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                        <ActionIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {item.vehicle}
                      </span>
                      <span className="text-[10px] text-gray-400">via {item.agent}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.action}</p>

                    {/* Stage progress */}
                    <div className="flex items-center gap-1 mt-3">
                      {stages.map((stage, i) => (
                        <React.Fragment key={stage.key}>
                          {i > 0 && (
                            <div
                              className={cn(
                                "h-px flex-1",
                                i <= stageIndex ? "bg-gray-400" : "bg-gray-200"
                              )}
                            />
                          )}
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full flex-shrink-0",
                              i < stageIndex
                                ? "bg-gray-600"
                                : i === stageIndex
                                  ? "bg-gray-900 ring-2 ring-gray-200"
                                  : "bg-gray-200"
                            )}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-gray-400">
                        {stages[stageIndex]?.label}
                      </span>
                      <span className="text-[9px] text-gray-300">{item.startedAt}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs font-bold text-gray-700 tabular-nums">
                      {item.projectedSavings}
                    </p>
                    <p className="text-[10px] text-gray-400">{item.confidence}% conf</p>
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 text-gray-300 mt-2 transition-transform ml-auto",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="ml-14 mt-4 space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">
                      Agent Reasoning Chain
                    </p>
                    <div className="space-y-1.5">
                      {item.reasoning.map((step, i) => {
                        const isLast = i === item.reasoning.length - 1
                        const isInProgress =
                          isLast &&
                          (item.stage === "reasoning" || item.stage === "detected")
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <div className="flex flex-col items-center mt-1.5">
                              <div
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  isInProgress
                                    ? "bg-amber-400 animate-pulse"
                                    : "bg-gray-300"
                                )}
                              />
                              {i < item.reasoning.length - 1 && (
                                <div className="w-px h-4 bg-gray-200 mt-0.5" />
                              )}
                            </div>
                            <p
                              className={cn(
                                "text-[11px] leading-relaxed",
                                isInProgress ? "text-amber-600" : "text-gray-500"
                              )}
                            >
                              {step}
                              {isInProgress && (
                                <span className="inline-flex ml-1">
                                  <span className="animate-pulse">...</span>
                                </span>
                              )}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {item.stage === "proposed" && (
                    <div className="flex items-center gap-2 pt-2">
                      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-xs font-medium transition-all">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve & Execute
                      </button>
                      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-all">
                        Modify
                      </button>
                      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-medium transition-all">
                        <RotateCcw className="h-3 w-3" />
                        Dismiss
                      </button>
                    </div>
                  )}

                  {item.duration && (
                    <p className="text-[10px] text-gray-400">{item.duration}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
