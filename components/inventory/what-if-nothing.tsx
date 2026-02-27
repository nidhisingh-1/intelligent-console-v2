"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { Clock, TrendingDown, AlertTriangle } from "lucide-react"

interface WhatIfNothingProps {
  vehicle: VehicleDetail
}

export function WhatIfNothing({ vehicle }: WhatIfNothingProps) {
  const projections = [7, 14, 30].map((days) => {
    const additionalLoss = days * vehicle.dailyBurn
    const projectedMargin = vehicle.marginRemaining - additionalLoss
    const saleProbabilityDrop = Math.min(40, Math.round(days * 1.2 + (vehicle.stage === "critical" ? 15 : vehicle.stage === "risk" ? 8 : 3)))
    return { days, additionalLoss, projectedMargin, saleProbabilityDrop }
  })

  const daysUntilZero = vehicle.daysToLive

  return (
    <Card className="border border-gray-200 bg-gradient-to-br from-gray-50/50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          What If I Do Nothing?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          {projections.map(({ days, additionalLoss, projectedMargin, saleProbabilityDrop }) => {
            const isPastBreakEven = projectedMargin <= 0
            return (
              <div
                key={days}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg border",
                  isPastBreakEven ? "bg-red-50 border-red-100" : "bg-white border-gray-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-medium",
                    isPastBreakEven ? "text-red-600" : "text-muted-foreground"
                  )}>
                    In {days}d
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-orange-500 font-medium tabular-nums">
                    ↓{saleProbabilityDrop}% sale prob
                  </span>
                  <span className="text-[11px] text-red-500 font-medium tabular-nums">
                    -${additionalLoss.toLocaleString()}
                  </span>
                  <span className={cn(
                    "text-xs font-bold tabular-nums w-16 text-right",
                    isPastBreakEven ? "text-red-600" : "text-foreground"
                  )}>
                    {isPastBreakEven ? "-" : ""}${Math.abs(projectedMargin).toLocaleString()}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {daysUntilZero > 0 && daysUntilZero <= 30 && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100">
            <AlertTriangle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-red-700 leading-relaxed">
              <span className="font-bold">In {daysUntilZero} days</span>, this vehicle
              reaches break-even. That&apos;s{" "}
              <span className="font-bold">${(daysUntilZero * vehicle.dailyBurn).toLocaleString()}</span>{" "}
              in additional margin erosion. Estimated sale probability decreases{" "}
              <span className="font-bold">
                {Math.min(40, Math.round(daysUntilZero * 1.2 + 8))}%
              </span>.
            </p>
          </div>
        )}

        {daysUntilZero === 0 && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100">
            <TrendingDown className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-red-700 leading-relaxed">
              This vehicle is <span className="font-bold">already past break-even</span>.
              Each day adds <span className="font-bold">${vehicle.dailyBurn}</span> in direct losses
              and further reduces sale probability.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
