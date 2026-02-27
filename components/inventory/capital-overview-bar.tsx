"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CapitalOverview } from "@/services/inventory/inventory.types"
import {
  Vault,
  Flame,
  Clock,
  PiggyBank,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Bomb,
  Info,
} from "lucide-react"

function MiniSparkline({ data, color = "stroke-current" }: { data: number[]; color?: string }) {
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 64
  const h = 20
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={w} height={h} className="flex-shrink-0" viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        className={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-flex ml-1">
      <Info className="h-3 w-3 text-muted-foreground/50 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-[11px] leading-snug rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-foreground" />
      </div>
    </div>
  )
}

interface MetricTileProps {
  label: string
  value: string
  delta: number
  deltaLabel?: string
  icon: React.ReactNode
  accent?: string
  urgent?: boolean
  sparkData?: number[]
  sparkColor?: string
  tooltip?: string
}

function MetricTile({
  label, value, delta, deltaLabel = "vs last month",
  icon, accent, urgent, sparkData, sparkColor, tooltip,
}: MetricTileProps) {
  const isPositive = delta >= 0

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:shadow-md",
      urgent && "ring-1 ring-red-200"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
            {tooltip && <Tooltip text={tooltip} />}
          </div>
          <div className={cn("p-1.5 rounded-lg", accent || "bg-gray-50")}>
            {icon}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className={cn(
            "text-xl font-bold tracking-tight",
            urgent ? "text-red-600" : "text-foreground"
          )}>
            {value}
          </p>
          <div className="flex items-center justify-between">
            <div className={cn(
              "inline-flex items-center gap-1 text-[11px] font-medium",
              isPositive ? "text-emerald-600" : "text-red-500"
            )}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{isPositive ? "+" : ""}{delta.toFixed(1)}%</span>
              <span className="text-muted-foreground font-normal">{deltaLabel}</span>
            </div>
            {sparkData && (
              <MiniSparkline data={sparkData} color={sparkColor || "stroke-muted-foreground/40"} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CapitalOverviewBarProps {
  data: CapitalOverview
}

export function CapitalOverviewBar({ data }: CapitalOverviewBarProps) {
  const formatCurrency = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
    return `$${n.toLocaleString()}`
  }

  const tiles: MetricTileProps[] = [
    {
      label: "Capital at Risk",
      value: formatCurrency(data.capitalAtRisk),
      delta: data.deltas.capitalAtRisk,
      icon: <Bomb className="h-4 w-4 text-red-500" />,
      accent: "bg-red-50",
      urgent: true,
      sparkData: data.trends.capitalAtRisk,
      sparkColor: "stroke-red-400",
      tooltip: "Sum of margin remaining for Risk + Critical vehicles",
    },
    {
      label: "Total Capital Locked",
      value: formatCurrency(data.totalCapitalLocked),
      delta: data.deltas.capitalLocked,
      icon: <Vault className="h-4 w-4 text-slate-500" />,
      accent: "bg-slate-50",
      tooltip: "Total acquisition cost across all inventory",
    },
    {
      label: "Daily Burn Rate",
      value: formatCurrency(data.totalDailyBurn),
      delta: data.deltas.dailyBurn,
      icon: <Flame className="h-4 w-4 text-orange-500" />,
      accent: "bg-orange-50",
      sparkData: data.trends.dailyBurn,
      sparkColor: "stroke-orange-400",
      tooltip: "Total daily holding cost across inventory",
    },
    {
      label: "Avg Days to Live",
      value: `${data.avgDaysToLive.toFixed(1)} days`,
      delta: data.deltas.daysToLive,
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      accent: "bg-blue-50",
      tooltip: "Average days before vehicles hit break-even",
    },
    {
      label: "Capital Protected",
      value: formatCurrency(data.capitalSavedThisMonth),
      delta: data.deltas.capitalSaved,
      icon: <PiggyBank className="h-4 w-4 text-emerald-500" />,
      accent: "bg-emerald-50",
      sparkData: data.trends.capitalSaved,
      sparkColor: "stroke-emerald-400",
      tooltip: "Margin saved through acceleration this month",
    },
    {
      label: "Vehicles at Risk",
      value: `${data.vehiclesInRisk + data.vehiclesInCritical}`,
      delta: data.deltas.riskCount,
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      accent: "bg-red-50",
      urgent: data.vehiclesInCritical > 5,
      tooltip: "Vehicles in Risk or Critical stage",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {tiles.map((tile) => (
        <MetricTile key={tile.label} {...tile} />
      ))}
    </div>
  )
}
