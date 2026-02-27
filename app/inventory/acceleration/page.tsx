"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StageBadge, CampaignBadge, MediaBadge, AIPageSummary } from "@/components/inventory"
import { STAGE_CONFIG } from "@/lib/inventory-mocks"
import {
  Zap, TrendingUp, DollarSign, Users, BarChart3, Rocket, ArrowRight, Clock,
} from "lucide-react"
import Link from "next/link"
import { useScenario } from "@/lib/scenario-context"
import { getScenarioData } from "@/lib/demo-scenarios"

const stageROI = [
  { stage: "watch" as const, activated: 12, avgLeadLift: "+3.2", avgMarginSaved: 420, roiPercent: 280 },
  { stage: "risk" as const, activated: 8, avgLeadLift: "+4.8", avgMarginSaved: 680, roiPercent: 340 },
  { stage: "critical" as const, activated: 4, avgLeadLift: "+5.1", avgMarginSaved: 920, roiPercent: 410 },
]

export default function AccelerationCenter() {
  const { activeScenario } = useScenario()

  const vehicles = React.useMemo(
    () => getScenarioData(activeScenario).vehicles,
    [activeScenario]
  )

  const campaignVehicles = React.useMemo(
    () => vehicles.filter((v) => v.campaignStatus === "active" || v.stage === "risk" || v.stage === "critical"),
    [vehicles]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Acceleration Center</h1>
            <p className="text-sm text-muted-foreground">Campaign performance, ROI by stage, and acceleration templates</p>
          </div>
        </div>
      </div>

      <AIPageSummary
        summary="Campaigns activated this month are generating 340% ROI — critical-stage vehicles see the highest lift at +5.1 leads per VIN. 8 risk vehicles still have no active campaign and are prime candidates for acceleration."
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: "24", delta: "+6 this week", icon: <Zap className="h-4 w-4 text-blue-500" />, bg: "bg-blue-50" },
          { label: "Avg Lead Lift", value: "+4.1", delta: "leads per VIN", icon: <Users className="h-4 w-4 text-violet-500" />, bg: "bg-violet-50" },
          { label: "Margin Protected", value: "$48.2K", delta: "this month", icon: <DollarSign className="h-4 w-4 text-emerald-500" />, bg: "bg-emerald-50" },
          { label: "Campaign ROI", value: "340%", delta: "avg return", icon: <TrendingUp className="h-4 w-4 text-amber-500" />, bg: "bg-amber-50" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                <div className={cn("p-1.5 rounded-lg", kpi.bg)}>{kpi.icon}</div>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI by Stage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Campaign ROI by Stage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {stageROI.map((s) => {
              const config = STAGE_CONFIG[s.stage]
              return (
                <div key={s.stage} className={cn("p-4 rounded-xl border-2", config.bgColor, config.borderColor)}>
                  <div className="flex items-center gap-2 mb-3">
                    <StageBadge stage={s.stage} size="sm" />
                    <span className="text-xs text-muted-foreground">{s.activated} campaigns</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Lead Lift</span>
                      <span className="font-bold">{s.avgLeadLift}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Margin Saved</span>
                      <span className="font-bold">${s.avgMarginSaved}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ROI</span>
                      <span className={cn("font-bold", config.textColor)}>{s.roiPercent}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Recommended */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Vehicles Recommended for Campaign</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {campaignVehicles.map((v) => (
              <Link
                key={v.vin}
                href={`/inventory/${v.vin}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <StageBadge stage={v.stage} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{v.year} {v.make} {v.model}</p>
                    <p className="text-xs text-muted-foreground">${v.dailyBurn}/day · {v.daysInStock}d in stock</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CampaignBadge
                    status={v.campaignStatus}
                    performanceCount={v.campaignStatus === "active" ? Math.max(2, Math.round(v.leads * 0.6 + v.daysInStock * 0.15)) : undefined}
                    performanceLabel="leads"
                  />
                  <MediaBadge mediaType={v.mediaType} daysInStock={v.daysInStock} size="sm" />
                  <span className="text-sm font-bold tabular-nums">${v.marginRemaining.toLocaleString()}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
