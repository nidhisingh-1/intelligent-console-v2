"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RevenueLeakage } from "@/services/inventory/inventory.types"
import { AlertTriangle, DollarSign, TrendingDown, ArrowRight, Eye, Users } from "lucide-react"

interface RevenueLeakagePanelProps {
  data: RevenueLeakage
}

export function RevenueLeakagePanel({ data }: RevenueLeakagePanelProps) {
  return (
    <Card className="border-red-200 bg-gradient-to-br from-red-50/30 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100">
            <TrendingDown className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Revenue Leakage</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Low VDP conversion causing estimated losses</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="h-3.5 w-3.5 text-red-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Annual Missed</span>
            </div>
            <p className="text-xl font-bold text-red-600">${(data.estimatedAnnualMissedRevenue / 1000).toFixed(0)}K</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Low Conv. VINs</span>
            </div>
            <p className="text-xl font-bold">{data.lowConversionVehicles}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Conv. Gap</span>
            </div>
            <p className="text-xl font-bold">{data.avgConversionGap}%</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Top Leakage Vehicles</p>
          {data.topLeakageVINs.slice(0, 4).map((v) => (
            <Link
              key={v.vin}
              href={`/inventory/${v.vin}`}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white border hover:border-red-200 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                    {v.year} {v.make} {v.model}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Eye className="h-2.5 w-2.5" />
                      {v.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Users className="h-2.5 w-2.5" />
                      {v.leads} leads
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-red-600 tabular-nums">
                  -${(v.missedRevenue / 1000).toFixed(1)}K
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
