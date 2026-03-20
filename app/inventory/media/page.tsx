"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MediaBadge, AIPageSummary, MediaCloningModal } from "@/components/inventory"
import { Button } from "@/components/ui/button"
import {
  Camera, Sparkles, TrendingUp, Clock, Users, DollarSign, BarChart3, ArrowRight, Copy,
} from "lucide-react"
import Link from "next/link"
import { useScenario } from "@/lib/scenario-context"
import { getScenarioData } from "@/lib/demo-scenarios"

export default function MediaIntelligence() {
  const [cloningModalOpen, setCloningModalOpen] = React.useState(false)
  const { activeScenario } = useScenario()

  const vehicles = React.useMemo(
    () => getScenarioData(activeScenario).vehicles,
    [activeScenario]
  )

  const cloneVehicles = React.useMemo(() => vehicles.filter((v) => v.mediaType === "clone"), [vehicles])
  const realVehicles = React.useMemo(() => vehicles.filter((v) => v.mediaType === "real"), [vehicles])

  const cloneAvgCTR = cloneVehicles.length > 0 ? cloneVehicles.reduce((a, v) => a + v.ctr, 0) / cloneVehicles.length : 0
  const realAvgCTR = realVehicles.length > 0 ? realVehicles.reduce((a, v) => a + v.ctr, 0) / realVehicles.length : 0
  const cloneAvgLeads = cloneVehicles.length > 0 ? cloneVehicles.reduce((a, v) => a + v.leads, 0) / cloneVehicles.length : 0
  const realAvgLeads = realVehicles.length > 0 ? realVehicles.reduce((a, v) => a + v.leads, 0) / realVehicles.length : 0
  const upgradeRate = vehicles.length > 0 ? Math.round((realVehicles.length / vehicles.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Media Intelligence</h1>
              <p className="text-sm text-muted-foreground">Clone vs Real performance benchmarks and upgrade tracking</p>
            </div>
          </div>
          <Button
            className="gap-2 bg-violet-600 hover:bg-violet-700"
            onClick={() => setCloningModalOpen(true)}
          >
            <Copy className="h-4 w-4" />
            Clone Media
          </Button>
        </div>
      </div>

      <MediaCloningModal
        open={cloningModalOpen}
        onOpenChange={setCloningModalOpen}
        vehicleCount={cloneVehicles.length}
      />

      <AIPageSummary
        summary={`Your media mix is ${100 - upgradeRate}% clone / ${upgradeRate}% real. ${realVehicles.length > 0 && cloneAvgCTR > 0 ? `Real media vehicles average ${realAvgCTR.toFixed(1)}% CTR vs ${cloneAvgCTR.toFixed(1)}% for clone — a +${((realAvgCTR / cloneAvgCTR - 1) * 100).toFixed(0)}% lift. ` : ""}${cloneVehicles.length} vehicles would benefit from a real media upgrade.`}
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Media Upgrade Rate", value: `${upgradeRate}%`, icon: <TrendingUp className="h-4 w-4 text-emerald-500" />, bg: "bg-emerald-50" },
          { label: "Avg Days to Upgrade", value: "12d", icon: <Clock className="h-4 w-4 text-blue-500" />, bg: "bg-blue-50" },
          { label: "CTR Lift (Real vs Clone)", value: cloneAvgCTR > 0 && realAvgCTR > 0 ? `+${((realAvgCTR / cloneAvgCTR - 1) * 100).toFixed(0)}%` : "—", icon: <Users className="h-4 w-4 text-violet-500" />, bg: "bg-violet-50" },
          { label: "Revenue Lift (Real Media)", value: "+18%", icon: <DollarSign className="h-4 w-4 text-amber-500" />, bg: "bg-amber-50" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                <div className={cn("p-1.5 rounded-lg", kpi.bg)}>{kpi.icon}</div>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benchmark Comparison */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Performance Benchmark: Clone vs Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* AI Instant */}
            <div className="p-5 rounded-xl bg-violet-50 border border-violet-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-bold text-violet-800">AI Instant Media</span>
                <span className="text-xs text-violet-600 ml-auto">{cloneVehicles.length} vehicles</span>
              </div>
              <div className="space-y-3">
                <BenchmarkRow label="Avg CTR" value={`${cloneAvgCTR.toFixed(1)}%`} />
                <BenchmarkRow label="Avg Leads" value={cloneAvgLeads.toFixed(1)} />
                <BenchmarkRow label="Avg Days in Stock" value={`${Math.round(cloneVehicles.reduce((a, v) => a + v.daysInStock, 0) / cloneVehicles.length)}d`} />
              </div>
              <p className="text-[11px] text-violet-600 mt-4 pt-3 border-t border-violet-200">
                Phase 1 media — fast go-live, lower engagement vs Real
              </p>
            </div>

            {/* Real Media */}
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-800">Real Media</span>
                <span className="text-xs text-emerald-600 ml-auto">{realVehicles.length} vehicles</span>
              </div>
              <div className="space-y-3">
                <BenchmarkRow label="Avg CTR" value={`${realAvgCTR.toFixed(1)}%`} highlight />
                <BenchmarkRow label="Avg Leads" value={realAvgLeads.toFixed(1)} highlight />
                <BenchmarkRow label="Avg Days in Stock" value={`${realVehicles.length > 0 ? Math.round(realVehicles.reduce((a, v) => a + v.daysInStock, 0) / realVehicles.length) : 0}d`} highlight />
              </div>
              <p className="text-[11px] text-emerald-600 mt-4 pt-3 border-t border-emerald-200">
                Phase 2+ media — higher engagement, faster turns, campaign boost
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles needing upgrade */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Vehicles Pending Media Upgrade</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {cloneVehicles.slice(0, 8).map((v) => (
              <Link key={v.vin} href={`/inventory/${v.vin}`} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <MediaBadge mediaType={v.mediaType} daysInStock={v.daysInStock} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{v.year} {v.make} {v.model}</p>
                    <p className="text-xs text-muted-foreground">{v.daysInStock}d in stock · CTR {v.ctr}%</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BenchmarkRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-bold tabular-nums", highlight ? "text-emerald-700" : "text-foreground")}>{value}</span>
    </div>
  )
}
