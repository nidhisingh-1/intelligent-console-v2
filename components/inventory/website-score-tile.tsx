"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { WebsiteScoreOverview } from "@/services/inventory/inventory.types"
import { Globe, TrendingUp, ArrowUpRight, MousePointerClick, Users } from "lucide-react"

interface WebsiteScoreTileProps {
  data: WebsiteScoreOverview
}

const healthConfig = {
  strong: { label: "Strong", className: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  moderate: { label: "Moderate", className: "text-amber-700 bg-amber-50 border-amber-200" },
  weak: { label: "Weak", className: "text-red-700 bg-red-50 border-red-200" },
}

export function WebsiteScoreTile({ data }: WebsiteScoreTileProps) {
  const health = healthConfig[data.conversionHealth]
  const scorePct = data.score / 100

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Radial Score */}
          <div className="relative flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f4f6" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke={data.score >= 70 ? "#10b981" : data.score >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${scorePct * 213.6} 213.6`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{data.score}</span>
              <span className="text-[9px] text-muted-foreground font-medium">/100</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-2.5">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Website Score</span>
              {data.scoreDelta > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +{data.scoreDelta} vs last month
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Conversion Health:</span>
              <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border", health.className)}>
                {health.label}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <MousePointerClick className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-muted-foreground">VDP CTR:</span>
                <span className="text-xs font-bold">{data.vdpCTR}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3 text-violet-500" />
                <span className="text-xs text-muted-foreground">Lead CVR:</span>
                <span className="text-xs font-bold">{data.leadCVR}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
