"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Zap,
  Camera,
  Megaphone,
  TrendingDown,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  X,
  Loader2,
  RotateCcw,
  Pencil,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

type ActionState = "pending" | "approved" | "executing" | "completed" | "rejected" | "modified"

interface PriorityAction {
  id: string
  vehicle: string
  vin: string
  action: "launch-campaign" | "upgrade-media" | "price-optimize" | "urgent-sell"
  reason: string
  aiConfidence: number
  projectedImpact: string
  projectedDollars: number
  timeframe: string
  urgency: "critical" | "high" | "medium"
  agentSource: string
  state: ActionState
  modifiedNote?: string
}

const initialActions: PriorityAction[] = [
  {
    id: "1",
    vehicle: "2024 VW Tiguan SEL R-Line",
    vin: "WVWZZZ3CZWE012345",
    action: "urgent-sell",
    reason:
      "58 days on lot, $320 margin left, zero leads. At current burn, margin depletes in 3.6 days.",
    aiConfidence: 94,
    projectedImpact: "Prevent $5,104 total loss",
    projectedDollars: 5104,
    timeframe: "Immediate",
    urgency: "critical",
    agentSource: "Margin Sentinel",
    state: "pending",
  },
  {
    id: "2",
    vehicle: "2024 Ford F-150 Lariat",
    vin: "WBA73AK06R5A91823",
    action: "launch-campaign",
    reason:
      "38 days, $1,480 margin, 1,240 VDP views but only 2 leads. High visibility but no conversion.",
    aiConfidence: 88,
    projectedImpact: "+4-6 leads, save 5-8 days",
    projectedDollars: 2360,
    timeframe: "Today",
    urgency: "high",
    agentSource: "Lead Optimizer",
    state: "pending",
  },
  {
    id: "3",
    vehicle: "2024 Kia Sportage X-Pro",
    vin: "3CZRE5H53PM700001",
    action: "upgrade-media",
    reason:
      "41 days on clone media, 3 leads. Real media vehicles convert 24% faster. Momentum worth protecting.",
    aiConfidence: 82,
    projectedImpact: "+24% lead velocity",
    projectedDollars: 1680,
    timeframe: "This week",
    urgency: "high",
    agentSource: "Media Intelligence",
    state: "pending",
  },
  {
    id: "4",
    vehicle: "2024 Jeep Grand Cherokee Limited",
    vin: "1G1YY22G965108723",
    action: "price-optimize",
    reason:
      "44 days, $890 margin, price already reduced once. Market data shows 2.8% above comparable.",
    aiConfidence: 76,
    projectedImpact: "2x sale probability",
    projectedDollars: 1890,
    timeframe: "Next 3 days",
    urgency: "medium",
    agentSource: "Market Scanner",
    state: "pending",
  },
  {
    id: "5",
    vehicle: "2025 Chevy Equinox RS AWD",
    vin: "3GNKBERS1RS204512",
    action: "launch-campaign",
    reason:
      "22 days, approaching Watch→Risk boundary. 4 leads but decelerating.",
    aiConfidence: 72,
    projectedImpact: "+3-5 leads, save 4-6 days",
    projectedDollars: 940,
    timeframe: "This week",
    urgency: "medium",
    agentSource: "Aging Predictor",
    state: "pending",
  },
]

const actionConfig = {
  "launch-campaign": { icon: Megaphone, label: "Launch Campaign" },
  "upgrade-media": { icon: Camera, label: "Upgrade Media" },
  "price-optimize": { icon: TrendingDown, label: "Optimize Price" },
  "urgent-sell": { icon: Zap, label: "Urgent Action" },
}

const urgencyConfig = {
  critical: { label: "CRITICAL", className: "text-red-600 bg-red-50 border-red-200" },
  high: { label: "HIGH", className: "text-gray-600 bg-gray-50 border-gray-200" },
  medium: { label: "MEDIUM", className: "text-gray-500 bg-gray-50 border-gray-200" },
}

const stateLabels: Record<ActionState, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: "Pending Review", icon: Clock, color: "text-amber-500" },
  approved: { label: "Approved", icon: CheckCircle2, color: "text-blue-500" },
  executing: { label: "Executing...", icon: Loader2, color: "text-blue-500" },
  completed: { label: "Completed", icon: Check, color: "text-emerald-500" },
  rejected: { label: "Dismissed", icon: X, color: "text-gray-400" },
  modified: { label: "Modified", icon: Pencil, color: "text-violet-500" },
}

export function AIPriorityActions() {
  const [actions, setActions] = React.useState(initialActions)

  const pendingCount = actions.filter((a) => a.state === "pending").length
  const totalRecoverable = actions
    .filter((a) => a.state === "pending" || a.state === "approved")
    .reduce((s, a) => s + a.projectedDollars, 0)

  const updateState = (id: string, state: ActionState) => {
    setActions((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        if (state === "approved") {
          setTimeout(() => {
            setActions((p) =>
              p.map((aa) => (aa.id === id ? { ...aa, state: "executing" } : aa))
            )
            setTimeout(() => {
              setActions((p) =>
                p.map((aa) => (aa.id === id ? { ...aa, state: "completed" } : aa))
              )
            }, 3000)
          }, 500)
        }
        return { ...a, state }
      })
    )
  }

  const approveAll = () => {
    actions.forEach((a, i) => {
      if (a.state === "pending") {
        setTimeout(() => updateState(a.id, "approved"), i * 400)
      }
    })
  }

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-gray-900">
            AI Priority Actions
          </span>
          <span className="text-[10px] text-gray-400">
            {pendingCount} pending approval
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
            <DollarSign className="h-3 w-3 text-gray-500" />
            <span className="text-[11px] font-bold text-gray-700 tabular-nums">
              ${totalRecoverable.toLocaleString()} recoverable
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {actions.map((action, i) => {
          const config = actionConfig[action.action]
          const urgency = urgencyConfig[action.urgency]
          const Icon = config.icon
          const stateInfo = stateLabels[action.state]
          const StateIcon = stateInfo.icon
          const isDone = action.state === "completed" || action.state === "rejected"

          return (
            <div
              key={action.id}
              className={cn(
                "px-5 py-4 transition-all",
                isDone && "opacity-50",
                action.state === "executing" && "bg-blue-50/20"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-400">
                    {i + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {action.vehicle}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
                        urgency.className
                      )}
                    >
                      {urgency.label}
                    </span>
                    <span className={cn("flex items-center gap-1 text-[10px]", stateInfo.color)}>
                      <StateIcon className={cn("h-3 w-3", action.state === "executing" && "animate-spin")} />
                      {stateInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {action.reason}
                  </p>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1 text-gray-400">
                      <ShieldCheck className="h-3 w-3" />
                      {action.agentSource}
                    </span>
                    <span className="text-gray-400">
                      {action.aiConfidence}% confidence
                    </span>
                    <span className="text-gray-700 font-medium">
                      {action.projectedImpact}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="h-3 w-3" />
                      {action.timeframe}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {action.state === "pending" ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateState(action.id, "approved")}
                        className={cn(
                          "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all",
                          action.urgency === "critical"
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-gray-900 hover:bg-gray-700 text-white"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateState(action.id, "rejected")}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                      >
                        <X className="h-3.5 w-3.5 text-gray-400" />
                      </button>
                    </div>
                  ) : action.state === "executing" ? (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200">
                      <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                      <span className="text-xs font-medium text-blue-600">
                        Running...
                      </span>
                    </div>
                  ) : action.state === "completed" ? (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">Done</span>
                    </div>
                  ) : action.state === "rejected" ? (
                    <button
                      onClick={() => updateState(action.id, "pending")}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">Undo</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {pendingCount > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={approveAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-xs font-medium transition-all"
          >
            <Check className="h-3.5 w-3.5" />
            Approve all {pendingCount} actions
          </button>
          <span className="text-[10px] text-gray-400">
            AI agents will execute approved actions in priority order
          </span>
        </div>
      )}
    </div>
  )
}
