"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { Layers, CheckCircle2, Circle, ArrowRight, Camera, Zap, Rocket } from "lucide-react"

interface MediaLifecycleProps {
  vehicle: VehicleDetail
  onUpgradeMedia: () => void
}

interface PhaseStep {
  label: string
  description: string
  icon: React.ReactNode
  status: "completed" | "current" | "upcoming"
}

export function MediaLifecycle({ vehicle, onUpgradeMedia }: MediaLifecycleProps) {
  const isRealMedia = vehicle.mediaType === "real"
  const hasCampaign = vehicle.campaignStatus === "active"

  const steps: PhaseStep[] = [
    {
      label: "VIN Received",
      description: "Added to inventory",
      icon: <CheckCircle2 className="h-4 w-4" />,
      status: "completed",
    },
    {
      label: "AI Instant Live",
      description: "Cloned media published",
      icon: <Zap className="h-4 w-4" />,
      status: vehicle.publishStatus !== "draft" ? "completed" : "current",
    },
    {
      label: "Real Media",
      description: isRealMedia ? "Professional photos live" : "Upgrade available",
      icon: <Camera className="h-4 w-4" />,
      status: isRealMedia ? "completed" : vehicle.daysInStock >= 14 ? "current" : "upcoming",
    },
    {
      label: "Boost Activated",
      description: hasCampaign ? "Campaign running" : "Acceleration ready",
      icon: <Rocket className="h-4 w-4" />,
      status: hasCampaign ? "completed" : "upcoming",
    },
  ]

  const currentPhase = isRealMedia
    ? hasCampaign ? 4 : 3
    : vehicle.publishStatus !== "draft" ? 2 : 1

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          Media Lifecycle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phase indicator */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[11px] font-medium text-muted-foreground">
            Currently in
          </span>
          <span className="text-[11px] font-bold text-primary">
            Phase {currentPhase} of 4
          </span>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            return (
              <div key={step.label} className="flex gap-3">
                {/* Connector line + icon */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                    step.status === "completed"
                      ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                      : step.status === "current"
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                  )}>
                    {step.icon}
                  </div>
                  {!isLast && (
                    <div className={cn(
                      "w-0.5 h-8 my-1",
                      step.status === "completed" ? "bg-emerald-300" : "bg-gray-200"
                    )} />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-3 min-w-0">
                  <p className={cn(
                    "text-xs font-semibold",
                    step.status === "completed"
                      ? "text-foreground"
                      : step.status === "current"
                        ? "text-primary"
                        : "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Phase upgrade CTA */}
        {!isRealMedia && (
          <div className={cn(
            "p-3 rounded-lg border",
            vehicle.daysInStock >= 14
              ? "bg-amber-50 border-amber-200"
              : "bg-violet-50 border-violet-200"
          )}>
            <p className={cn(
              "text-[11px] font-medium mb-2",
              vehicle.daysInStock >= 14 ? "text-amber-800" : "text-violet-800"
            )}>
              {vehicle.daysInStock >= 14
                ? `You are in Phase 2 (AI Instant) for ${vehicle.daysInStock} days. Recommended upgrade before Day 20 to protect margin.`
                : "You are currently in Phase 2 (AI Instant). Upgrade to Real Media to unlock maximum performance."
              }
            </p>
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "h-7 text-[11px] gap-1",
                vehicle.daysInStock >= 14
                  ? "border-amber-300 text-amber-700 hover:bg-amber-100"
                  : "border-violet-300 text-violet-700 hover:bg-violet-100"
              )}
              onClick={onUpgradeMedia}
            >
              <Camera className="h-3 w-3" />
              Upgrade to Real Media
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
