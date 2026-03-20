"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ShieldCheck,
  Zap,
  Settings2,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

type AutoPilotMode = "supervised" | "autonomous"

interface AutoPilotBarProps {
  onModeChange?: (mode: AutoPilotMode) => void
}

export function AutoPilotBar({ onModeChange }: AutoPilotBarProps) {
  const [mode, setMode] = React.useState<AutoPilotMode>("supervised")
  const [confidenceThreshold, setConfidenceThreshold] = React.useState(80)
  const [showSettings, setShowSettings] = React.useState(false)
  const [actionsExecuted, setActionsExecuted] = React.useState(12)
  const [actionsPending, setActionsPending] = React.useState(3)

  React.useEffect(() => {
    if (mode !== "autonomous") return
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setActionsExecuted((p) => p + 1)
        setActionsPending((p) => Math.max(0, p - 1))
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [mode])

  const handleModeChange = (newMode: AutoPilotMode) => {
    setMode(newMode)
    onModeChange?.(newMode)
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-6">
          {/* Mode toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100">
            <button
              onClick={() => handleModeChange("supervised")}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all",
                mode === "supervised"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Supervised
            </button>
            <button
              onClick={() => handleModeChange("autonomous")}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all",
                mode === "autonomous"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Zap className="h-3.5 w-3.5" />
              Autonomous
            </button>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-500">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              <span className="tabular-nums font-medium">{actionsExecuted}</span>
              <span className="text-gray-400">executed today</span>
            </div>
            {mode === "supervised" && actionsPending > 0 && (
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock className="h-3 w-3 text-amber-500" />
                <span className="tabular-nums font-medium">{actionsPending}</span>
                <span className="text-gray-400">awaiting approval</span>
              </div>
            )}
            {mode === "autonomous" && (
              <div className="flex items-center gap-1.5 text-gray-500">
                <AlertCircle className="h-3 w-3 text-blue-500" />
                <span className="text-gray-400">
                  Auto-executing above{" "}
                  <span className="font-medium text-gray-600">{confidenceThreshold}%</span> confidence
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-all",
            showSettings && "bg-gray-50"
          )}
        >
          <Settings2 className="h-3.5 w-3.5" />
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              showSettings && "rotate-180"
            )}
          />
        </button>
      </div>

      {showSettings && (
        <div className="px-5 pb-4 pt-1 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-6 mt-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block mb-2">
                Confidence Threshold
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="flex-1 accent-gray-900 h-1"
                />
                <span className="text-xs font-bold text-gray-700 tabular-nums w-8">
                  {confidenceThreshold}%
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Actions below this threshold require manual approval
              </p>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block mb-2">
                Auto-Execute Categories
              </label>
              <div className="space-y-1.5">
                {["Campaign adjustments", "Media upgrade nudges", "Price alerts", "Stage transitions"].map(
                  (cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-gray-900 accent-gray-900 h-3 w-3"
                      />
                      <span className="text-[11px] text-gray-600">{cat}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block mb-2">
                Notification Preferences
              </label>
              <div className="space-y-1.5">
                {[
                  { label: "Critical alerts", desc: "Always notify" },
                  { label: "Execution reports", desc: "Digest every 4h" },
                  { label: "Learning insights", desc: "Weekly summary" },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">{pref.label}</span>
                    <span className="text-[10px] text-gray-400">{pref.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "autonomous" && (
        <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] text-gray-500">
              <span className="font-medium text-gray-700">Autonomous mode active.</span>{" "}
              AI agents will auto-execute actions above {confidenceThreshold}% confidence. All actions are logged and reversible.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
