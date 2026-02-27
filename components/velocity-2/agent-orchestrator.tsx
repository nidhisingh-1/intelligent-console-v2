"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ShieldCheck,
  Target,
  BarChart3,
  Camera,
  Zap,
  Brain,
  Loader2,
  CheckCircle2,
  Eye,
  Pause,
} from "lucide-react"

type AgentState = "thinking" | "executing" | "monitoring" | "idle" | "waiting"

interface Agent {
  id: string
  name: string
  role: string
  icon: React.ElementType
  state: AgentState
  currentTask: string
  actionsToday: number
  savingsToday: string
  lastAction: string
  confidence: number
}

const stateConfig: Record<AgentState, { label: string; color: string; dotColor: string }> = {
  thinking: {
    label: "Reasoning",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    dotColor: "bg-amber-500",
  },
  executing: {
    label: "Executing",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dotColor: "bg-blue-500",
  },
  monitoring: {
    label: "Monitoring",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  idle: {
    label: "Idle",
    color: "text-gray-500 bg-gray-50 border-gray-200",
    dotColor: "bg-gray-400",
  },
  waiting: {
    label: "Awaiting Approval",
    color: "text-violet-600 bg-violet-50 border-violet-200",
    dotColor: "bg-violet-500",
  },
}

const initialAgents: Agent[] = [
  {
    id: "sentinel",
    name: "Margin Sentinel",
    role: "Monitors margins, detects burn rate anomalies, triggers alerts",
    icon: ShieldCheck,
    state: "thinking",
    currentTask: "Analyzing VW Tiguan margin trajectory — 3.6 days to depletion",
    actionsToday: 4,
    savingsToday: "$1,240",
    lastAction: "Flagged Nissan Rogue for immediate review",
    confidence: 94,
  },
  {
    id: "lead",
    name: "Lead Optimizer",
    role: "Analyzes conversion patterns, recommends lead capture improvements",
    icon: Target,
    state: "executing",
    currentTask: "Repositioning CTA on Ford F-150 listing — 1,240 views, 0.16% conv",
    actionsToday: 3,
    savingsToday: "$860",
    lastAction: "Optimized Honda Accord keywords (+18% CTR)",
    confidence: 88,
  },
  {
    id: "market",
    name: "Market Scanner",
    role: "Scans competitor pricing, identifies market opportunities",
    icon: BarChart3,
    state: "monitoring",
    currentTask: "Scanning 2,400 listings within 50mi for price shifts",
    actionsToday: 2,
    savingsToday: "$2,100",
    lastAction: "Detected F-150 supply gap in region",
    confidence: 82,
  },
  {
    id: "media",
    name: "Media Intelligence",
    role: "Audits photo quality, triggers upgrade recommendations",
    icon: Camera,
    state: "waiting",
    currentTask: "Proposed real media upgrade for 6 vehicles — awaiting dealer approval",
    actionsToday: 1,
    savingsToday: "$480",
    lastAction: "Sent media upgrade SMS for Ford F-150",
    confidence: 76,
  },
  {
    id: "campaign",
    name: "Campaign Engine",
    role: "Manages campaign lifecycle, optimizes bids and budgets",
    icon: Zap,
    state: "executing",
    currentTask: "Increasing Honda Accord bid by 15% on high-performing keywords",
    actionsToday: 5,
    savingsToday: "$3,200",
    lastAction: "Auto-boosted Kia Sportage campaign budget",
    confidence: 91,
  },
  {
    id: "predictor",
    name: "Aging Predictor",
    role: "Forecasts stage transitions, predicts turn timelines",
    icon: Brain,
    state: "thinking",
    currentTask: "Modeling Watch→Risk transitions for 3 vehicles in next 5 days",
    actionsToday: 2,
    savingsToday: "$640",
    lastAction: "Predicted Ram 1500 stage transition in 4 days",
    confidence: 79,
  },
]

export function AgentOrchestrator() {
  const [agents, setAgents] = React.useState(initialAgents)
  const [selectedAgent, setSelectedAgent] = React.useState<string | null>(null)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          const states: AgentState[] = ["thinking", "executing", "monitoring", "waiting"]
          if (Math.random() > 0.7) {
            const newState = states[Math.floor(Math.random() * states.length)]
            return { ...agent, state: newState }
          }
          return agent
        })
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const activeCount = agents.filter((a) => a.state !== "idle").length
  const totalSavings = "$8,520"

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Brain className="h-4 w-4 text-gray-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Agent Orchestrator</span>
          <span className="text-[10px] text-gray-400">{activeCount}/6 active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-700 tabular-nums">
            {totalSavings} saved today
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-100">
        {agents.map((agent) => {
          const Icon = agent.icon
          const state = stateConfig[agent.state]
          const isSelected = selectedAgent === agent.id

          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
              className={cn(
                "bg-white px-4 py-4 text-left transition-all hover:bg-gray-50/70",
                isSelected && "bg-gray-50 ring-1 ring-inset ring-gray-200"
              )}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <Icon className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{agent.name}</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider",
                    state.color
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", state.dotColor, agent.state !== "idle" && "animate-pulse")} />
                  {state.label}
                </div>
              </div>

              <div className="mb-2.5">
                {agent.state === "thinking" || agent.state === "executing" ? (
                  <div className="flex items-start gap-1.5">
                    <Loader2 className="h-3 w-3 text-gray-400 animate-spin mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      {agent.currentTask}
                    </p>
                  </div>
                ) : agent.state === "waiting" ? (
                  <div className="flex items-start gap-1.5">
                    <Pause className="h-3 w-3 text-violet-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-violet-600 leading-relaxed line-clamp-2">
                      {agent.currentTask}
                    </p>
                  </div>
                ) : agent.state === "monitoring" ? (
                  <div className="flex items-start gap-1.5">
                    <Eye className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      {agent.currentTask}
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                    Standby — no active tasks
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-gray-400">
                  <span className="font-bold text-gray-600">{agent.actionsToday}</span> actions
                </span>
                <span className="text-gray-400">
                  <span className="font-bold text-gray-600">{agent.savingsToday}</span> saved
                </span>
                <span className="text-gray-400 tabular-nums">{agent.confidence}% conf</span>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">
                    Role
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{agent.role}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">
                    Last Action
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{agent.lastAction}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
