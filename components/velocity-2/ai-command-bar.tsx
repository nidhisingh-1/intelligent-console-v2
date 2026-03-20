"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ArrowUp,
  Sparkles,
  Database,
  Brain,
  Search,
  CheckCircle2,
  Loader2,
  Command,
} from "lucide-react"

const suggestions = [
  "Which vehicles need attention today?",
  "Show me margin bleeders over $100/day",
  "Launch campaigns on all critical vehicles",
  "Why is the F-150 not converting?",
  "Run full lot analysis and prioritize actions",
]

interface ToolCall {
  name: string
  icon: React.ElementType
  input: string
  result?: string
  complete: boolean
}

interface StreamingResponse {
  text: string
  toolCalls: ToolCall[]
  isStreaming: boolean
  actionable?: {
    label: string
    description: string
  }
}

const responseScenarios: Record<string, StreamingResponse> = {
  attention: {
    text: "Based on my analysis, 3 vehicles need immediate attention. I've ranked them by urgency and potential loss:\n\n① VW Tiguan (58 days, $320 margin left) — 3.6 days to depletion. I'm ready to activate a Tier 3 campaign.\n② Nissan Rogue (67 days, margin depleted) — losing $76/day. Price reduction recommended.\n③ Kia Sportage (41 days, no campaign) — momentum decelerating. Tier 1 campaign would protect margin.\n\nCombined daily burn: $260. Total recoverable: $7,834.",
    toolCalls: [
      {
        name: "query_inventory",
        icon: Database,
        input: "vehicles WHERE stage IN ('risk', 'critical') ORDER BY urgency_score DESC",
        result: "Found 12 vehicles in Risk/Critical stages",
        complete: true,
      },
      {
        name: "calculate_burn_rates",
        icon: Brain,
        input: "Modeling margin depletion curves for top 12 at-risk vehicles",
        result: "3 vehicles within 7 days of margin depletion",
        complete: true,
      },
      {
        name: "rank_by_impact",
        icon: Search,
        input: "Ranking by (potential_loss × probability × time_sensitivity)",
        result: "Top 3 ranked: VW Tiguan, Nissan Rogue, Kia Sportage",
        complete: true,
      },
    ],
    isStreaming: false,
    actionable: {
      label: "Execute all 3 recommendations",
      description: "Activate campaigns on Tiguan & Sportage, initiate price review on Rogue",
    },
  },
  launch: {
    text: "I've identified 4 critical vehicles that need campaigns activated. Here's what I'll do:\n\n① VW Tiguan — Tier 3 Maximum (94% confidence, prevents $5,104 loss)\n② Ford F-150 — Tier 2 Accelerated (88% confidence, +4-6 leads)\n③ Kia Sportage — Tier 1 Standard (82% confidence, protects momentum)\n④ Chevy Equinox — Tier 1 Standard (72% confidence, prevents stage transition)\n\nTotal projected recovery: $10,084. Should I execute all campaigns now, or would you like to review each one?",
    toolCalls: [
      {
        name: "scan_critical_inventory",
        icon: Database,
        input: "SELECT * FROM vehicles WHERE stage = 'critical' AND campaign_active = false",
        result: "4 critical vehicles with no active campaigns",
        complete: true,
      },
      {
        name: "campaign_optimizer",
        icon: Brain,
        input: "Running tier selection model on 4 candidates — optimizing for margin protection",
        result: "Optimal tiers: T3, T2, T1, T1 — combined budget: $1,240",
        complete: true,
      },
    ],
    isStreaming: false,
    actionable: {
      label: "Launch all 4 campaigns now",
      description: "I'll activate campaigns sequentially and report results in real-time",
    },
  },
  convert: {
    text: "I investigated the F-150 Lariat conversion issue. Here's my diagnosis:\n\nThe vehicle has strong traffic (1,240 VDP views) but terrible conversion (0.16% vs 1.36% benchmark). I traced the problem to two root causes:\n\n1. Lead form placement — it's below the fold on mobile, and 78% of visitors are on mobile\n2. Clone media trust gap — vehicles with real photos convert 24% better at this price point\n\nFixing both would likely increase conversion from 0.16% to ~1.8%, generating 4-6 additional leads this week. The campaign + media upgrade combination has a 91% success rate for similar F-150s.",
    toolCalls: [
      {
        name: "analyze_user_behavior",
        icon: Search,
        input: "Pulling heatmap and scroll depth data for VIN WBA73AK06R5A91823",
        result: "89% bounce from lead form, 78% mobile traffic, CTA below fold",
        complete: true,
      },
      {
        name: "benchmark_comparison",
        icon: Brain,
        input: "Comparing against 847 F-150 Lariat listings with >1,000 VDP views",
        result: "Median conversion: 1.36%. This VIN: 0.16% (8.5x below)",
        complete: true,
      },
      {
        name: "root_cause_analysis",
        icon: Database,
        input: "Correlating conversion gaps with media type, form placement, price position",
        result: "Primary: form placement (r=0.72), Secondary: clone media (r=0.48)",
        complete: true,
      },
    ],
    isStreaming: false,
    actionable: {
      label: "Fix both issues now",
      description: "Reposition CTA + queue real media upgrade for this vehicle",
    },
  },
  analysis: {
    text: "Full lot analysis complete. Here's your inventory at a glance:\n\n📊 142 vehicles monitored | Velocity Score: 72 (+4.2)\n🔥 Daily burn: $12,640 (down 8.1% this month)\n⚠️ 33 vehicles in Risk/Critical stages\n\nTop priorities (by dollar impact):\n1. Activate campaigns on 4 vehicles → save $10,084\n2. Upgrade media on 6 vehicles → accelerate turns by 4.2 days avg\n3. Price-optimize 2 critical units → recover $3,200\n\nIf you execute all recommendations, projected 30-day outcome: $24,600 in margin protected, velocity score reaching 81.",
    toolCalls: [
      {
        name: "full_lot_scan",
        icon: Database,
        input: "Scanning all 142 vehicles — margins, stages, campaigns, media, lead velocity",
        result: "Scan complete: 64 Fresh, 45 Watch, 24 Risk, 9 Critical",
        complete: true,
      },
      {
        name: "opportunity_ranker",
        icon: Brain,
        input: "Ranking all actionable opportunities by (dollar_impact × confidence × urgency)",
        result: "Identified 12 high-priority actions across 3 categories",
        complete: true,
      },
      {
        name: "scenario_modeler",
        icon: Search,
        input: "Modeling 30-day outcomes for recommended vs do-nothing scenarios",
        result: "Recommended: +$24,600 margin | Do nothing: -$18,400 loss",
        complete: true,
      },
    ],
    isStreaming: false,
    actionable: {
      label: "Execute full action plan",
      description: "Start with highest-impact actions and work down the priority list",
    },
  },
}

export function AICommandBar() {
  const [query, setQuery] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const [response, setResponse] = React.useState<StreamingResponse | null>(null)
  const [streamPhase, setStreamPhase] = React.useState<"tools" | "text" | "done" | null>(null)
  const [visibleToolIdx, setVisibleToolIdx] = React.useState(0)
  const [visibleText, setVisibleText] = React.useState("")
  const [showAction, setShowAction] = React.useState(false)
  const responseRef = React.useRef<StreamingResponse | null>(null)

  const getScenario = (q: string): StreamingResponse => {
    const lower = q.toLowerCase()
    if (lower.includes("attention") || lower.includes("need")) return responseScenarios.attention
    if (lower.includes("launch") || lower.includes("campaign")) return responseScenarios.launch
    if (lower.includes("why") || lower.includes("convert") || lower.includes("f-150"))
      return responseScenarios.convert
    return responseScenarios.analysis
  }

  const handleSubmit = (text: string) => {
    const q = text || query
    if (!q.trim()) return
    setQuery(q)
    const scenario = getScenario(q)
    responseRef.current = scenario
    setResponse(scenario)
    setStreamPhase("tools")
    setVisibleToolIdx(0)
    setVisibleText("")
    setShowAction(false)
  }

  React.useEffect(() => {
    if (streamPhase !== "tools" || !response) return
    if (visibleToolIdx >= response.toolCalls.length) {
      setStreamPhase("text")
      return
    }
    const timer = setTimeout(() => setVisibleToolIdx((p) => p + 1), 800)
    return () => clearTimeout(timer)
  }, [streamPhase, visibleToolIdx, response])

  React.useEffect(() => {
    if (streamPhase !== "text" || !response) return
    const fullText = response.text
    let idx = 0
    const interval = setInterval(() => {
      idx += 3
      if (idx >= fullText.length) {
        setVisibleText(fullText)
        setStreamPhase("done")
        setTimeout(() => setShowAction(true), 400)
        clearInterval(interval)
      } else {
        setVisibleText(fullText.slice(0, idx))
      }
    }, 12)
    return () => clearInterval(interval)
  }, [streamPhase, response])

  const isActive = streamPhase !== null && streamPhase !== "done"

  return (
    <div className="relative">
      <div
        className={cn(
          "relative rounded-2xl border transition-all duration-300",
          focused
            ? "border-gray-300 bg-gray-50/50 shadow-sm"
            : "border-gray-200 bg-gray-50/30"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex items-center gap-2 flex-shrink-0 text-gray-400">
            <Command className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(query)
            }}
            placeholder="Ask anything, or give a command... (e.g., 'Launch campaigns on all critical vehicles')"
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 text-sm outline-none"
          />
          <button
            onClick={() => handleSubmit(query)}
            className={cn(
              "p-2 rounded-xl transition-all",
              query.trim()
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-400"
            )}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {focused && !response && (
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSubmit(s)}
                className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {response && (
        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
          {/* Tool calls */}
          {response.toolCalls.length > 0 && (
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">
                Agent Actions
              </p>
              <div className="space-y-1.5">
                {response.toolCalls.slice(0, visibleToolIdx).map((tool, i) => {
                  const ToolIcon = tool.icon
                  const isLast = i === visibleToolIdx - 1 && streamPhase === "tools"
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white border border-gray-100"
                    >
                      <ToolIcon className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-gray-600">
                            {tool.name}
                          </span>
                          {isLast ? (
                            <Loader2 className="h-3 w-3 text-amber-500 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{tool.input}</p>
                        {tool.result && !isLast && (
                          <p className="text-[10px] text-gray-600 font-medium mt-0.5">
                            → {tool.result}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
                {streamPhase === "tools" && visibleToolIdx < response.toolCalls.length && (
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <Loader2 className="h-3 w-3 text-gray-400 animate-spin" />
                    <span className="text-[10px] text-gray-400">
                      Running {response.toolCalls[visibleToolIdx]?.name}...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Response text */}
          {(streamPhase === "text" || streamPhase === "done") && (
            <div className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {visibleText}
                    {streamPhase === "text" && (
                      <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-text-bottom" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actionable footer */}
          {showAction && response.actionable && (
            <div className="px-5 py-3 border-t border-gray-100 bg-white">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-700 text-white transition-all group">
                <div>
                  <p className="text-xs font-medium">{response.actionable.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {response.actionable.description}
                  </p>
                </div>
                <Sparkles className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
