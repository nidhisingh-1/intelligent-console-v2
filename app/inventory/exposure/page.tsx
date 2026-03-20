"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/inventory-mocks"
import { StageBadge, AIPageSummary } from "@/components/inventory"
import {
  DollarSign, TrendingDown, Flame, BarChart3, PieChart, Clock, AlertTriangle,
} from "lucide-react"
import { useScenario } from "@/lib/scenario-context"
import { getScenarioData } from "@/lib/demo-scenarios"

export default function CapitalExposure() {
  const { activeScenario } = useScenario()

  const scenarioData = React.useMemo(
    () => getScenarioData(activeScenario),
    [activeScenario]
  )

  const scenarioVehicles = scenarioData.vehicles
  const overview = scenarioData.overview

  const totalBurn14d = overview.totalDailyBurn * 14

  const bySource = React.useMemo(() => {
    const sources = ["auction", "trade-in", "wholesale", "direct"] as const
    const labels: Record<string, string> = { auction: "Auction", "trade-in": "Trade-in", wholesale: "Wholesale", direct: "Direct" }
    return sources.map((src) => {
      const veh = scenarioVehicles.filter((v) => v.source === src)
      const capital = veh.reduce((a, v) => a + v.acquisitionCost, 0)
      const exposure = veh.filter((v) => v.stage === "risk" || v.stage === "critical").reduce((a, v) => a + v.acquisitionCost, 0)
      return { source: labels[src], count: veh.length, capital, exposure }
    })
  }, [scenarioVehicles])

  const byPriceBand = React.useMemo(() => {
    const bands = [
      { key: "under-25k", label: "Under $25K" },
      { key: "25k-35k", label: "$25K–$35K" },
      { key: "35k-50k", label: "$35K–$50K" },
      { key: "over-50k", label: "Over $50K" },
    ] as const
    return bands.map((b) => {
      const veh = scenarioVehicles.filter((v) => v.priceBand === b.key)
      const exposure = veh.filter((v) => v.stage === "risk" || v.stage === "critical").reduce((a, v) => a + v.acquisitionCost, 0)
      return { band: b.label, count: veh.length, exposure }
    })
  }, [scenarioVehicles])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Capital Exposure View</h1>
            <p className="text-sm text-muted-foreground">Financial lens — margin erosion, exposure analysis, burn projections</p>
          </div>
        </div>
      </div>

      <AIPageSummary
        summary={`$${(overview.capitalAtRisk / 1000).toFixed(0)}K in capital is at risk across risk and critical vehicles. At current burn of $${overview.totalDailyBurn.toLocaleString()}/day, the 14-day projection is $${(totalBurn14d / 1000).toFixed(0)}K in potential losses if no vehicles exit. Auction-sourced inventory accounts for the highest exposure.`}
      />

      {/* Financial KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Exposure", value: `$${(overview.capitalAtRisk / 1000).toFixed(0)}K`, sub: "Risk + Critical margin", icon: <AlertTriangle className="h-4 w-4 text-red-500" />, bg: "bg-red-50", urgent: true },
          { label: "14-Day Burn Projection", value: `$${(totalBurn14d / 1000).toFixed(0)}K`, sub: "If no vehicles sold", icon: <Flame className="h-4 w-4 text-orange-500" />, bg: "bg-orange-50" },
          { label: "Avg Margin Erosion", value: `${((1 - overview.avgDaysToLive / 50) * 100).toFixed(0)}%`, sub: "Across all inventory", icon: <TrendingDown className="h-4 w-4 text-amber-500" />, bg: "bg-amber-50" },
          { label: "Break-even Velocity", value: `${overview.avgDaysToLive.toFixed(1)}d`, sub: "Avg days to break-even", icon: <Clock className="h-4 w-4 text-blue-500" />, bg: "bg-blue-50" },
        ].map((kpi) => (
          <Card key={kpi.label} className={kpi.urgent ? "ring-1 ring-red-200" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                <div className={cn("p-1.5 rounded-lg", kpi.bg)}>{kpi.icon}</div>
              </div>
              <p className={cn("text-2xl font-bold", kpi.urgent && "text-red-600")}>{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exposure by Stage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Margin Erosion by Stage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {STAGE_ORDER.map((stage) => {
              const vehicles = scenarioVehicles.filter((v) => v.stage === stage)
              const totalMargin = vehicles.reduce((a, v) => a + Math.max(0, v.marginRemaining), 0)
              const totalGross = vehicles.reduce((a, v) => a + v.grossMargin, 0)
              const erosion = totalGross > 0 ? ((1 - totalMargin / totalGross) * 100) : 100
              const config = STAGE_CONFIG[stage]
              return (
                <div key={stage} className="flex items-center gap-4">
                  <div className="w-20 flex-shrink-0">
                    <StageBadge stage={stage} size="sm" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", config.color)}
                        style={{ width: `${Math.min(100, erosion)}%` }}
                      />
                    </div>
                  </div>
                  <span className={cn("text-sm font-bold tabular-nums w-12 text-right", config.textColor)}>
                    {erosion.toFixed(0)}%
                  </span>
                  <span className="text-xs text-muted-foreground w-20 text-right">
                    ${(totalMargin / 1000).toFixed(0)}K left
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Exposure by Source */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Exposure by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bySource.map((s) => (
                <div key={s.source} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                  <div>
                    <p className="text-sm font-semibold">{s.source}</p>
                    <p className="text-xs text-muted-foreground">{s.count} vehicles · ${(s.capital / 1000).toFixed(0)}K capital</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold tabular-nums", s.exposure > 100000 ? "text-red-600" : "text-foreground")}>
                      ${(s.exposure / 1000).toFixed(0)}K
                    </p>
                    <p className="text-[10px] text-muted-foreground">at risk</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exposure by Price Band */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Exposure by Price Band
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {byPriceBand.map((b) => (
                <div key={b.band} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                  <div>
                    <p className="text-sm font-semibold">{b.band}</p>
                    <p className="text-xs text-muted-foreground">{b.count} vehicles</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold tabular-nums", b.exposure > 200000 ? "text-red-600" : "text-foreground")}>
                      ${(b.exposure / 1000).toFixed(0)}K
                    </p>
                    <p className="text-[10px] text-muted-foreground">at risk</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
