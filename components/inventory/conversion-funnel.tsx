"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ConversionFunnelData } from "@/services/inventory/inventory.types"
import { ArrowDown, Package, Eye, UserPlus, CalendarCheck } from "lucide-react"

interface ConversionFunnelProps {
  data: ConversionFunnelData
}

export function ConversionFunnel({ data }: ConversionFunnelProps) {
  const steps = [
    { label: "Inventory", value: data.totalVehicles, unit: "Vehicles", icon: Package, color: "bg-slate-100 text-slate-600", barColor: "bg-slate-400" },
    { label: "VDP Views", value: data.vdpViews, unit: "Views", icon: Eye, color: "bg-blue-50 text-blue-600", barColor: "bg-blue-400" },
    { label: "Leads", value: data.leads, unit: "Leads", icon: UserPlus, color: "bg-violet-50 text-violet-600", barColor: "bg-violet-400" },
    { label: "Appointments", value: data.appointments, unit: "Booked", icon: CalendarCheck, color: "bg-emerald-50 text-emerald-600", barColor: "bg-emerald-400" },
  ]

  const maxVal = data.vdpViews

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-1">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            const barWidth = i === 0 ? 100 : Math.max(8, (step.value / maxVal) * 100)
            const convRate = i > 0
              ? ((step.value / steps[i - 1].value) * 100).toFixed(1)
              : null

            return (
              <div key={step.label} className="flex items-center gap-1 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={cn("p-1 rounded", step.color)}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">{step.label}</span>
                  </div>
                  <p className="text-lg font-bold tabular-nums">{step.value.toLocaleString()}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", step.barColor)} style={{ width: `${barWidth}%` }} />
                  </div>
                  {convRate && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{convRate}% conv.</p>
                  )}
                </div>
                {!isLast && (
                  <div className="flex-shrink-0 px-0.5">
                    <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/40 rotate-[-90deg]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
