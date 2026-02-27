"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { scenarios, type ScenarioId } from "@/lib/demo-scenarios"
import { FlaskConical, ChevronDown, ChevronUp, X, Check } from "lucide-react"

interface DemoConsoleProps {
  activeScenario: ScenarioId
  onScenarioChange: (id: ScenarioId) => void
}

export function DemoConsole({ activeScenario, onScenarioChange }: DemoConsoleProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background shadow-2xl hover:scale-105 transition-transform text-sm font-medium"
      >
        <FlaskConical className="h-4 w-4" />
        Demo Console
      </button>
    )
  }

  const active = scenarios.find((s) => s.id === activeScenario)!

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-80">
      <div className="bg-foreground text-background rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-bold">Demo Console</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Active scenario */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/10"
        >
          <span className="text-lg">{active.emoji}</span>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold">{active.name}</p>
            <p className="text-[11px] text-background/50 truncate">{active.description}</p>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-background/40 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-background/40 flex-shrink-0" />
          )}
        </button>

        {/* Scenario list */}
        {isOpen && (
          <div className="max-h-[360px] overflow-y-auto">
            {scenarios.map((scenario) => {
              const isActive = scenario.id === activeScenario
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    onScenarioChange(scenario.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left",
                    isActive
                      ? "bg-violet-500/20"
                      : "hover:bg-white/5"
                  )}
                >
                  <span className="text-base flex-shrink-0">{scenario.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-xs font-semibold",
                      isActive ? "text-violet-300" : "text-background"
                    )}>
                      {scenario.name}
                    </p>
                    <p className="text-[10px] text-background/40 truncate">{scenario.description}</p>
                  </div>
                  {isActive && (
                    <Check className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-white/10">
          <p className="text-[10px] text-background/30">
            Switch personas to preview different dealer experiences
          </p>
        </div>
      </div>
    </div>
  )
}
