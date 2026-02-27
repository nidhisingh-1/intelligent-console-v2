"use client"

import * as React from "react"
import {
  AICommandBar,
  AutoPilotBar,
  MorningBrief,
  AgentOrchestrator,
  AIPriorityActions,
  LiveAgentFeed,
  ExecutionPipeline,
  AgentThinking,
  PredictiveEngine,
  AnomalyAlerts,
  DealerPulse,
  AutonomousLog,
} from "@/components/velocity-2"
import { BrainCircuit, Cpu, Activity } from "lucide-react"

export default function Velocity2Page() {
  const [activeAgents] = React.useState(6)
  const [executionsToday] = React.useState(12)

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <BrainCircuit className="h-6 w-6 text-gray-800" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Velocity 2.0
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-gray-900 text-[10px] font-bold uppercase tracking-wider text-white">
                    Agentic AI
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  6 AI agents managing your inventory autonomously. You approve, they execute.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <Cpu className="h-3.5 w-3.5 text-gray-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-gray-500">
                  {activeAgents} agents active
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <Activity className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {executionsToday} executions today
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs text-gray-500">
                  142 vehicles monitored
                </span>
              </div>
            </div>
          </div>

          <AICommandBar />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Auto-Pilot Control */}
        <AutoPilotBar />

        {/* Morning brief */}
        <MorningBrief />

        {/* Agent Orchestrator — the brain */}
        <AgentOrchestrator />

        {/* Approval Queue + Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIPriorityActions />
          <LiveAgentFeed />
        </div>

        {/* Execution Pipeline + Agent Reasoning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExecutionPipeline />
          <AgentThinking />
        </div>

        {/* Predictive Engine */}
        <PredictiveEngine />

        {/* Intelligence row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnomalyAlerts />
          <DealerPulse />
          <AutonomousLog />
        </div>
      </div>
    </div>
  )
}
