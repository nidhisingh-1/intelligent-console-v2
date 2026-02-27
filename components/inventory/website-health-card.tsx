"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleWebsiteHealth } from "@/services/inventory/inventory.types"
import { Globe, Eye, MousePointerClick, Users, Lightbulb } from "lucide-react"

interface WebsiteHealthCardProps {
  health: VehicleWebsiteHealth
}

const riskConfig = {
  optimized: { label: "Optimized", className: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  "below-benchmark": { label: "Below Benchmark", className: "text-amber-700 bg-amber-50 border-amber-200" },
  "low-conversion": { label: "Low Conversion VDP", className: "text-red-700 bg-red-50 border-red-200" },
}

export function WebsiteHealthCard({ health }: WebsiteHealthCardProps) {
  const risk = riskConfig[health.attractionRisk]
  const ctrBelow = health.vdpCTR < health.vdpCTRBenchmark
  const convBelow = health.leadConversion < health.leadConversionBenchmark

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Website Impact
          </CardTitle>
          <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border", risk.className)}>
            {risk.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[10px] text-muted-foreground">VDP Views</span>
            </div>
            <p className="text-lg font-bold">{health.vdpViews.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <MousePointerClick className="h-3.5 w-3.5 text-violet-500" />
              <span className="text-[10px] text-muted-foreground">VDP CTR</span>
            </div>
            <p className={cn("text-lg font-bold", ctrBelow && "text-amber-600")}>{health.vdpCTR}%</p>
            {ctrBelow && (
              <p className="text-[9px] text-amber-600">Benchmark: {health.vdpCTRBenchmark}%</p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] text-muted-foreground">Lead Conv.</span>
            </div>
            <p className={cn("text-lg font-bold", convBelow && "text-amber-600")}>{health.leadConversion}%</p>
            {convBelow && (
              <p className="text-[9px] text-amber-600">Benchmark: {health.leadConversionBenchmark}%</p>
            )}
          </div>
        </div>

        {health.insight && (
          <div className={cn(
            "p-3 rounded-lg border",
            health.attractionRisk === "optimized"
              ? "bg-emerald-50 border-emerald-100"
              : health.attractionRisk === "below-benchmark"
                ? "bg-amber-50 border-amber-100"
                : "bg-red-50 border-red-100"
          )}>
            <div className="flex items-start gap-2">
              <Lightbulb className={cn(
                "h-3.5 w-3.5 mt-0.5 flex-shrink-0",
                health.attractionRisk === "optimized"
                  ? "text-emerald-500"
                  : health.attractionRisk === "below-benchmark"
                    ? "text-amber-500"
                    : "text-red-500"
              )} />
              <p className={cn(
                "text-[11px] leading-relaxed",
                health.attractionRisk === "optimized"
                  ? "text-emerald-700"
                  : health.attractionRisk === "below-benchmark"
                    ? "text-amber-700"
                    : "text-red-700"
              )}>
                {health.insight}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
