"use client"

import { cn } from "@/lib/utils"
import type { CapitalOverview } from "@/services/inventory/inventory.types"
import { TrendingUp, TrendingDown } from "lucide-react"

interface VelocityScoreProps {
  data: CapitalOverview
}

export function VelocityScore({ data }: VelocityScoreProps) {
  const score = data.velocityScore
  const delta = data.deltas.velocityScore
  const isPositive = delta >= 0

  const radius = 26
  const stroke = 4
  const size = 64
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const remaining = circumference - progress

  const scoreColor =
    score >= 75
      ? "text-emerald-500"
      : score >= 50
        ? "text-amber-500"
        : "text-red-500"

  const strokeColor =
    score >= 75
      ? "stroke-emerald-500"
      : score >= 50
        ? "stroke-amber-500"
        : "stroke-red-500"

  const label =
    score >= 80
      ? "Excellent"
      : score >= 65
        ? "Good"
        : score >= 50
          ? "Needs Work"
          : "At Risk"

  return (
    <div className="flex items-center gap-3">
      {/* Circular gauge */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-gray-100"
            strokeWidth={stroke}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={`${progress} ${remaining}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-sm font-bold tabular-nums leading-none", scoreColor)}>
            {score}
          </span>
          <span className="text-[8px] text-muted-foreground font-medium mt-0.5">/ 100</span>
        </div>
      </div>

      {/* Labels */}
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider leading-none">
          Velocity Score
        </p>
        <p className={cn("text-xs font-semibold mt-0.5", scoreColor)}>{label}</p>
        <div className={cn(
          "inline-flex items-center gap-1 text-[10px] font-medium mt-0.5",
          isPositive ? "text-emerald-600" : "text-red-500"
        )}>
          {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
          <span>{isPositive ? "+" : ""}{delta.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}
