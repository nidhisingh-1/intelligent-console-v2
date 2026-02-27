"use client"

import { cn } from "@/lib/utils"
import type { CapitalOverview } from "@/services/inventory/inventory.types"
import { Award } from "lucide-react"

interface DealerBenchmarkProps {
  data: CapitalOverview
}

export function DealerBenchmark({ data }: DealerBenchmarkProps) {
  const yours = data.avgDaysToLive
  const market = data.marketBenchmarkDaysToLive
  const isBetter = yours < market
  const diffDays = Math.abs(yours - market).toFixed(1)

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm",
      isBetter
        ? "bg-emerald-50/60 border-emerald-200"
        : "bg-amber-50/60 border-amber-200"
    )}>
      <Award className={cn("h-4 w-4 flex-shrink-0", isBetter ? "text-emerald-600" : "text-amber-600")} />
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">Your Avg:</span>
        <span className="font-bold text-foreground">{yours.toFixed(1)}d</span>
        <span className="text-muted-foreground/60">|</span>
        <span className="text-muted-foreground">Market:</span>
        <span className="font-bold text-foreground">{market}d</span>
        <span className={cn(
          "font-semibold",
          isBetter ? "text-emerald-700" : "text-amber-700"
        )}>
          {isBetter ? `${diffDays}d faster` : `${diffDays}d slower`}
        </span>
      </div>
    </div>
  )
}
