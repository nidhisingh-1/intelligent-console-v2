"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG } from "@/lib/inventory-mocks"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { DollarSign, Flame, TrendingDown, Clock } from "lucide-react"

interface CapitalMeterCardProps {
  vehicle: VehicleDetail
}

export function CapitalMeterCard({ vehicle }: CapitalMeterCardProps) {
  const marginPercent = Math.max(0, (vehicle.marginRemaining / vehicle.grossMargin) * 100)
  const burnedPercent = 100 - marginPercent
  const config = STAGE_CONFIG[vehicle.stage]
  const isNegative = vehicle.marginRemaining <= 0

  const marginBandLabel: Record<string, string> = {
    high: "High Margin",
    medium: "Medium Margin",
    low: "Low Margin",
  }

  const marginBandColor: Record<string, string> = {
    high: "text-emerald-600 bg-emerald-50 border-emerald-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    low: "text-red-600 bg-red-50 border-red-200",
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          Capital Meter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Margin Depletion Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Margin Depletion</span>
            <span className={cn("font-semibold", isNegative ? "text-red-600" : config.textColor)}>
              {isNegative ? "Depleted" : `${marginPercent.toFixed(0)}% remaining`}
            </span>
          </div>
          <div className="relative h-5 rounded-full bg-gray-100 overflow-hidden">
            {/* Burned portion */}
            <div
              className={cn(
                "absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out",
                burnedPercent > 80
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : burnedPercent > 50
                    ? "bg-gradient-to-r from-orange-400 to-orange-500"
                    : burnedPercent > 25
                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-500"
              )}
              style={{ width: `${Math.min(100, burnedPercent)}%` }}
            />
            {/* Marker line */}
            {!isNegative && burnedPercent < 95 && (
              <div
                className="absolute top-0 h-full w-0.5 bg-white shadow-sm"
                style={{ left: `${burnedPercent}%` }}
              />
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>$0 (break-even)</span>
            <span>${vehicle.grossMargin.toLocaleString()} (full margin)</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Acquisition Cost</span>
            </div>
            <p className="text-lg font-bold">${vehicle.acquisitionCost.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs text-muted-foreground">Daily Burn</span>
            </div>
            <p className="text-lg font-bold">${vehicle.dailyBurn}/day</p>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Gross Margin Band</span>
            </div>
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
              marginBandColor[vehicle.grossMarginBand]
            )}>
              {marginBandLabel[vehicle.grossMarginBand]}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Margin Remaining</span>
            </div>
            <p className={cn("text-lg font-bold", isNegative ? "text-red-600" : "text-foreground")}>
              {isNegative ? "-" : ""}${Math.abs(vehicle.marginRemaining).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Break-even Countdown */}
        <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Break-even Countdown</span>
            <span className={cn(
              "text-sm font-bold",
              vehicle.daysToLive <= 5 ? "text-red-600" : vehicle.daysToLive <= 12 ? "text-orange-600" : "text-foreground"
            )}>
              {vehicle.daysToLive > 0 ? `${vehicle.daysToLive} days` : "Past break-even"}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                vehicle.daysToLive <= 5
                  ? "bg-red-500"
                  : vehicle.daysToLive <= 12
                    ? "bg-orange-500"
                    : "bg-emerald-500"
              )}
              style={{
                width: `${Math.min(100, Math.max(0, (vehicle.daysToLive / vehicle.breakEvenDays) * 100))}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
            <span>Now</span>
            <span>Break-even at {vehicle.breakEvenDays} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
