"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { BarChart3, MousePointerClick, Users, CalendarCheck, ArrowRight, TrendingUp } from "lucide-react"

interface PerformanceCardProps {
  vehicle: VehicleDetail
}

export function PerformanceCard({ vehicle }: PerformanceCardProps) {
  const [compareMode, setCompareMode] = React.useState<"clone" | "real">("clone")
  const hasRealMedia = vehicle.realMediaPerformance !== null

  const currentMetrics = compareMode === "real" && hasRealMedia
    ? vehicle.realMediaPerformance!
    : vehicle.cloneMediaPerformance

  const getDelta = (field: "leads" | "ctr" | "appointments") => {
    if (!hasRealMedia || compareMode !== "real") return null
    const cloneVal = vehicle.cloneMediaPerformance[field]
    const realVal = vehicle.realMediaPerformance![field]
    if (cloneVal === 0) return null
    return ((realVal - cloneVal) / cloneVal) * 100
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Performance
          </CardTitle>

          {/* Media comparison toggle */}
          {hasRealMedia && (
            <div className="flex items-center p-0.5 rounded-lg bg-gray-100">
              <button
                onClick={() => setCompareMode("clone")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  compareMode === "clone"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Clone Media
              </button>
              <button
                onClick={() => setCompareMode("real")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  compareMode === "real"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Real Media
              </button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <MetricBlock
            icon={<Users className="h-4 w-4 text-blue-500" />}
            label="Leads"
            value={currentMetrics.leads.toString()}
            delta={getDelta("leads")}
          />
          <MetricBlock
            icon={<CalendarCheck className="h-4 w-4 text-violet-500" />}
            label="Appointments"
            value={currentMetrics.appointments.toString()}
            delta={getDelta("appointments")}
          />
          <MetricBlock
            icon={<MousePointerClick className="h-4 w-4 text-amber-500" />}
            label="CTR"
            value={`${currentMetrics.ctr}%`}
            delta={getDelta("ctr")}
          />
        </div>

        {/* Campaign Attribution */}
        {vehicle.campaignAttribution && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-blue-100">
                <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium">Campaign Attribution</p>
                <p className="text-sm font-semibold text-blue-800">{vehicle.campaignAttribution}</p>
              </div>
            </div>
          </div>
        )}

        {/* Delta comparison callout */}
        {compareMode === "real" && hasRealMedia && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700 font-medium">
                Real Media showing stronger engagement across all metrics
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface MetricBlockProps {
  icon: React.ReactNode
  label: string
  value: string
  delta: number | null
}

function MetricBlock({ icon, label, value, delta }: MetricBlockProps) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold tracking-tight">{value}</span>
        {delta !== null && (
          <span className={cn(
            "text-xs font-semibold",
            delta > 0 ? "text-emerald-600" : delta < 0 ? "text-red-500" : "text-muted-foreground"
          )}>
            {delta > 0 ? "+" : ""}{delta.toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  )
}
