"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/inventory-mocks"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import type { VehicleStage } from "@/services/inventory/inventory.types"
import {
  GitBranch,
  Circle,
  Camera,
  Megaphone,
  TrendingDown,
  Eye,
  CalendarClock,
} from "lucide-react"

interface VelocityTimelineProps {
  vehicle: VehicleDetail
}

interface TimelineEvent {
  day: number
  label: string
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  stage: VehicleStage
}

function getStageForDay(day: number): VehicleStage {
  for (const stage of [...STAGE_ORDER].reverse()) {
    if (day >= STAGE_CONFIG[stage].daysRange[0]) return stage
  }
  return "fresh"
}

export function VelocityTimeline({ vehicle }: VelocityTimelineProps) {
  const events: TimelineEvent[] = [
    {
      day: 0,
      label: "VIN Received & AI Instant Live",
      icon: <Eye className="h-3.5 w-3.5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      stage: "fresh",
    },
  ]

  if (vehicle.timeToFirstLead !== null) {
    events.push({
      day: vehicle.timeToFirstLead,
      label: "First Lead",
      icon: <Circle className="h-3.5 w-3.5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      stage: getStageForDay(vehicle.timeToFirstLead),
    })
  }

  if (vehicle.mediaType === "real") {
    const day = Math.min(vehicle.daysInStock - 5, Math.round(vehicle.daysInStock * 0.4))
    events.push({
      day,
      label: "Real Media Uploaded",
      icon: <Camera className="h-3.5 w-3.5" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-300",
      stage: getStageForDay(day),
    })
  }

  if (vehicle.campaignStatus === "active" || vehicle.campaignStatus === "completed") {
    const day = Math.round(vehicle.daysInStock * 0.6)
    events.push({
      day,
      label: "Campaign Activated",
      icon: <Megaphone className="h-3.5 w-3.5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      stage: getStageForDay(day),
    })
  }

  if (vehicle.priceReduced) {
    const day = Math.round(vehicle.daysInStock * 0.7)
    events.push({
      day,
      label: "Price Reduced",
      icon: <TrendingDown className="h-3.5 w-3.5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      stage: getStageForDay(day),
    })
  }

  const stageConfig = STAGE_CONFIG[vehicle.stage]
  if (vehicle.stage !== "fresh") {
    const stageDay = stageConfig.daysRange[0]
    events.push({
      day: stageDay,
      label: `Entered ${stageConfig.label} Stage`,
      icon: <Circle className="h-3.5 w-3.5" />,
      color: stageConfig.textColor,
      bgColor: stageConfig.bgColor,
      borderColor: stageConfig.borderColor,
      stage: vehicle.stage,
    })
  }

  events.sort((a, b) => a.day - b.day)

  const maxDay = Math.max(vehicle.daysInStock, ...events.map((e) => e.day))

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-muted-foreground" />
          Velocity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5">
        {/* Horizontal progress bar with stage zones */}
        <div className="relative mb-6">
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden flex">
            {STAGE_ORDER.map((stage, i) => {
              const cfg = STAGE_CONFIG[stage]
              const start = cfg.daysRange[0]
              const end = Math.min(cfg.daysRange[1], Math.max(maxDay, 60))
              if (start > Math.max(maxDay, 60)) return null
              const widthPct =
                ((end - start) / Math.max(maxDay, 60)) * 100
              const filled = vehicle.daysInStock >= start
              return (
                <div
                  key={stage}
                  className={cn(
                    "h-full transition-all",
                    filled ? cfg.color : "bg-gray-100",
                    !filled && "opacity-40",
                    i === 0 && "rounded-l-full",
                    start + (end - start) >= Math.max(maxDay, 60) && "rounded-r-full"
                  )}
                  style={{ width: `${widthPct}%` }}
                />
              )
            })}
          </div>
          {/* Stage labels below the bar */}
          <div className="flex mt-1.5">
            {STAGE_ORDER.map((stage) => {
              const cfg = STAGE_CONFIG[stage]
              const start = cfg.daysRange[0]
              const end = Math.min(cfg.daysRange[1], Math.max(maxDay, 60))
              if (start > Math.max(maxDay, 60)) return null
              const widthPct =
                ((end - start) / Math.max(maxDay, 60)) * 100
              return (
                <div key={stage} style={{ width: `${widthPct}%` }}>
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider",
                      vehicle.stage === stage ? cfg.textColor : "text-muted-foreground/50"
                    )}
                  >
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
          {/* Today marker on bar */}
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{
              left: `${(vehicle.daysInStock / Math.max(maxDay, 60)) * 100}%`,
            }}
          >
            <div className="w-3.5 h-2.5 rounded-full bg-foreground border-2 border-white shadow-sm" />
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative ml-4">
          {events.map((event, i) => {
            const daysBetween = i > 0 ? event.day - events[i - 1].day : 0
            return (
              <div key={i} className="relative">
                {/* Connector line to previous node */}
                {i > 0 && (
                  <div className="absolute left-[11px] -top-0.5 w-px bg-gray-200" style={{ height: daysBetween > 10 ? 28 : 20 }} />
                )}
                {/* Elapsed days chip between events */}
                {i > 0 && daysBetween > 0 && (
                  <div className="flex items-center mb-0.5">
                    <div className="w-[23px] flex justify-center">
                      <div className="w-px h-2 bg-gray-200" />
                    </div>
                    <span className="text-[9px] text-muted-foreground/60 font-medium ml-2.5 tabular-nums">
                      +{daysBetween}d
                    </span>
                  </div>
                )}
                {/* Event row */}
                <div className="flex items-center gap-3 py-1.5 group">
                  {/* Icon node */}
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-[23px] h-[23px] rounded-full border-2 shrink-0 transition-shadow",
                      event.bgColor,
                      event.borderColor,
                      event.color,
                      "group-hover:shadow-md"
                    )}
                  >
                    {event.icon}
                  </div>
                  {/* Content */}
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className={cn("text-[12px] font-semibold leading-none", event.color)}>
                      {event.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                      Day {event.day}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Today row */}
          <div className="relative">
            {events.length > 0 && (
              <div className="absolute left-[11px] -top-0.5 w-px bg-gray-200" style={{ height: 28 }} />
            )}
            {events.length > 0 && vehicle.daysInStock - events[events.length - 1].day > 0 && (
              <div className="flex items-center mb-0.5">
                <div className="w-[23px] flex justify-center">
                  <div className="w-px h-2 bg-gray-200" />
                </div>
                <span className="text-[9px] text-muted-foreground/60 font-medium ml-2.5 tabular-nums">
                  +{vehicle.daysInStock - events[events.length - 1].day}d
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 py-1.5">
              <div className="relative z-10 flex items-center justify-center w-[23px] h-[23px] rounded-full bg-foreground shrink-0 shadow-sm">
                <CalendarClock className="h-3 w-3 text-white" />
                <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] font-bold text-foreground leading-none">Today</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  Day {vehicle.daysInStock}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
