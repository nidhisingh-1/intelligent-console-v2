"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/inventory-mocks"
import type { AgingStageData, VehicleStage } from "@/services/inventory/inventory.types"
import { Car, DollarSign, ShieldAlert, Users } from "lucide-react"

interface AgingHeatmapProps {
  data: AgingStageData[]
  activeStage: VehicleStage | "all"
  onStageClick: (stage: VehicleStage | "all") => void
  totalVehicles: number
}

export function AgingHeatmap({ data, activeStage, onStageClick, totalVehicles }: AgingHeatmapProps) {
  const maxCapital = Math.max(...data.map((d) => d.totalCapital))
  const maxLeadVelocity = Math.max(...data.map((d) => d.avgLeadVelocity))

  const formatCurrency = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
    return `$${n.toLocaleString()}`
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Inventory Aging by Margin Stage</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Capital distribution across margin lifecycle stages
            </p>
          </div>
          <button
            onClick={() => onStageClick("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeStage === "all"
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            View All ({totalVehicles})
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Proportion bar */}
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
          {data.map((stage) => {
            const config = STAGE_CONFIG[stage.stage]
            const width = (stage.count / totalVehicles) * 100
            return (
              <button
                key={stage.stage}
                onClick={() => onStageClick(stage.stage)}
                className={cn(
                  "h-full transition-all duration-300 hover:opacity-80",
                  config.color,
                  activeStage === stage.stage && "ring-2 ring-offset-1 ring-gray-400"
                )}
                style={{ width: `${width}%` }}
                title={`${config.label}: ${stage.count} vehicles`}
              />
            )
          })}
        </div>

        {/* Stage cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STAGE_ORDER.map((stageKey) => {
            const stage = data.find((d) => d.stage === stageKey)
            if (!stage) return null
            const config = STAGE_CONFIG[stageKey]
            const isActive = activeStage === stageKey
            const capitalBarWidth = (stage.totalCapital / maxCapital) * 100
            const leadBarWidth = (stage.avgLeadVelocity / maxLeadVelocity) * 100

            return (
              <button
                key={stageKey}
                onClick={() => onStageClick(stageKey)}
                className={cn(
                  "text-left p-4 rounded-xl border-2 transition-all duration-200",
                  isActive
                    ? `${config.bgColor} ${config.borderColor} shadow-sm`
                    : "bg-white border-transparent hover:border-gray-200 hover:bg-gray-50/50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", config.dotColor)} />
                    <span className={cn("text-sm font-semibold", isActive ? config.textColor : "text-foreground")}>
                      {config.label}
                    </span>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    config.bgColor, config.textColor
                  )}>
                    {config.daysRange[0]}–{config.daysRange[1] === 999 ? "∞" : config.daysRange[1]}d
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-1.5">
                    <Car className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-2xl font-bold tracking-tight">{stage.count}</span>
                    <span className="text-xs text-muted-foreground">vehicles</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-semibold">{formatCurrency(stage.totalCapital)}</span>
                    <span className="text-xs text-muted-foreground">locked</span>
                  </div>

                  {/* Capital proportion bar */}
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", config.color)}
                      style={{ width: `${capitalBarWidth}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      <span className={cn("font-semibold", config.textColor)}>
                        {stage.marginExposurePercent}%
                      </span>
                      {" "}margin exposed
                    </span>
                  </div>

                  {/* Lead Velocity — predictive dimension */}
                  <div className="pt-1 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">Lead Velocity</span>
                      </div>
                      <span className={cn(
                        "text-xs font-bold tabular-nums",
                        stage.avgLeadVelocity >= 5
                          ? "text-emerald-600"
                          : stage.avgLeadVelocity >= 2
                            ? "text-amber-600"
                            : "text-red-600"
                      )}>
                        {stage.avgLeadVelocity} avg
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-gray-100 overflow-hidden mt-1">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          stage.avgLeadVelocity >= 5
                            ? "bg-emerald-400"
                            : stage.avgLeadVelocity >= 2
                              ? "bg-amber-400"
                              : "bg-red-400"
                        )}
                        style={{ width: `${leadBarWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
