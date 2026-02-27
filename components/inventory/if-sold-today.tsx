"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { Receipt, ArrowDown, ArrowUp, Minus } from "lucide-react"

interface IfSoldTodayProps {
  vehicle: VehicleDetail
}

export function IfSoldToday({ vehicle }: IfSoldTodayProps) {
  const expectedGross = vehicle.marginRemaining
  const holdingLoss = vehicle.holdingLossSoFar
  const netPosition = expectedGross - 0

  const isNegative = expectedGross <= 0

  return (
    <Card className={cn(
      "border-2",
      isNegative
        ? "border-red-200 bg-red-50/20"
        : expectedGross < 1000
          ? "border-orange-200 bg-orange-50/20"
          : "border-gray-200"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Receipt className="h-4 w-4 text-muted-foreground" />
          If Sold Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Expected Gross</span>
            <span className={cn(
              "text-sm font-bold tabular-nums",
              isNegative ? "text-red-600" : "text-foreground"
            )}>
              {isNegative ? "-" : ""}${Math.abs(expectedGross).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Holding Cost So Far</span>
            <span className="text-sm font-bold tabular-nums text-red-600">
              -${holdingLoss.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-dashed pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Net Position</span>
              <div className="flex items-center gap-1.5">
                {isNegative ? (
                  <ArrowDown className="h-3.5 w-3.5 text-red-500" />
                ) : expectedGross > 0 ? (
                  <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className={cn(
                  "text-base font-bold tabular-nums",
                  isNegative
                    ? "text-red-600"
                    : expectedGross > 0
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                )}>
                  {isNegative ? "-" : expectedGross > 0 ? "+" : ""}${Math.abs(expectedGross).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isNegative && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
            <p className="text-[11px] text-red-700 font-medium">
              This vehicle is past break-even. Every day adds ${vehicle.dailyBurn} in losses.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
