"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG, getAccelerationImpact } from "@/lib/inventory-mocks"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import {
  Shield,
  Zap,
  Camera,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  BarChart3,
  Megaphone,
} from "lucide-react"

interface ActionPanelProps {
  vehicle: VehicleDetail
  onAccelerate: () => void
  onUpgradeMedia: () => void
  onViewPerformance?: () => void
}

function ImpactPreview({ stage }: { stage: VehicleDetail["stage"] }) {
  const impact = getAccelerationImpact(stage)
  if (stage === "fresh") return null

  return (
    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-2">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        Expected Impact
      </p>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <Users className="h-3.5 w-3.5 text-blue-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-foreground">{impact.estimatedLeadLift}</p>
          <p className="text-[10px] text-muted-foreground">leads</p>
        </div>
        <div className="text-center">
          <Clock className="h-3.5 w-3.5 text-violet-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-foreground">{impact.estimatedDaysFaster}d</p>
          <p className="text-[10px] text-muted-foreground">faster sale</p>
        </div>
        <div className="text-center">
          <DollarSign className="h-3.5 w-3.5 text-emerald-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-foreground">${impact.estimatedMarginRecovery}</p>
          <p className="text-[10px] text-muted-foreground">recovery</p>
        </div>
      </div>
    </div>
  )
}

export function ActionPanel({ vehicle, onAccelerate, onUpgradeMedia, onViewPerformance }: ActionPanelProps) {
  return (
    <Card className={cn(
      "border-2 transition-all",
      vehicle.stage === "critical" && "border-red-200 bg-red-50/30",
      vehicle.stage === "risk" && "border-orange-200 bg-orange-50/30"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          Acceleration Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Active campaign card */}
        {vehicle.campaignStatus === "active" && onViewPerformance && (
          <button
            onClick={onViewPerformance}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 hover:border-blue-300 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Megaphone className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-blue-800">Campaign Active</p>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-blue-600">Tap to view live performance metrics</p>
              </div>
              <BarChart3 className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </div>
          </button>
        )}

        {vehicle.stage === "fresh" && <FreshActions />}
        {vehicle.stage === "watch" && (
          <WatchActions
            vehicle={vehicle}
            onAccelerate={onAccelerate}
            onUpgradeMedia={onUpgradeMedia}
          />
        )}
        {vehicle.stage === "risk" && (
          <RiskActions
            vehicle={vehicle}
            onAccelerate={onAccelerate}
            onUpgradeMedia={onUpgradeMedia}
          />
        )}
        {vehicle.stage === "critical" && (
          <CriticalActions
            vehicle={vehicle}
            onAccelerate={onAccelerate}
            onUpgradeMedia={onUpgradeMedia}
          />
        )}
      </CardContent>
    </Card>
  )
}

function FreshActions() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-emerald-800">On Track</p>
        <p className="text-xs text-emerald-600 mt-0.5">
          This vehicle is within healthy margin range. No action needed right now.
        </p>
      </div>
    </div>
  )
}

function WatchActions({
  vehicle,
  onAccelerate,
  onUpgradeMedia,
}: {
  vehicle: VehicleDetail
  onAccelerate: () => void
  onUpgradeMedia: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Margin declining — consider a campaign</p>
            <p className="text-xs text-amber-600 mt-1">
              Protect ${vehicle.marginRemaining.toLocaleString()} remaining margin with proactive promotion
            </p>
          </div>
        </div>
      </div>

      <ImpactPreview stage="watch" />

      <Button
        className="w-full justify-between h-11 bg-amber-500 hover:bg-amber-600 text-white"
        onClick={onAccelerate}
      >
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Activate Acceleration Pack
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>

      {vehicle.mediaType !== "real" && (
        <Button
          variant="outline"
          className="w-full justify-between h-11"
          onClick={onUpgradeMedia}
        >
          <span className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Upgrade to Real Media
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

function RiskActions({
  vehicle,
  onAccelerate,
  onUpgradeMedia,
}: {
  vehicle: VehicleDetail
  onAccelerate: () => void
  onUpgradeMedia: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-800">Margin eroding — action recommended</p>
            <p className="text-xs text-orange-600 mt-1">
              Only ${vehicle.marginRemaining.toLocaleString()} margin left.
              At ${vehicle.dailyBurn}/day burn, break-even in {vehicle.daysToLive} days.
            </p>
          </div>
        </div>
      </div>

      <ImpactPreview stage="risk" />

      <Button
        className="w-full justify-between h-12 bg-orange-500 hover:bg-orange-600 text-white text-base"
        onClick={onAccelerate}
      >
        <span className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Activate Acceleration Pack
        </span>
        <ArrowRight className="h-5 w-5" />
      </Button>

      {vehicle.mediaType !== "real" && (
        <Button
          variant="outline"
          className="w-full justify-between h-11 border-orange-200 text-orange-700 hover:bg-orange-50"
          onClick={onUpgradeMedia}
        >
          <span className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Upgrade to Real Media
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      <Button variant="outline" className="w-full justify-between h-11">
        <span className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Optimize Price
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function CriticalActions({
  vehicle,
  onAccelerate,
  onUpgradeMedia,
}: {
  vehicle: VehicleDetail
  onAccelerate: () => void
  onUpgradeMedia: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0 animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-red-800">
              Urgent — Margin {vehicle.marginRemaining <= 0 ? "depleted" : "nearly depleted"}
            </p>
            <p className="text-xs text-red-600 mt-1">
              {vehicle.marginRemaining > 0
                ? `Only $${vehicle.marginRemaining.toLocaleString()} left. Every day costs $${vehicle.dailyBurn}.`
                : `This vehicle is past break-even. Currently losing $${vehicle.dailyBurn}/day.`}
            </p>
          </div>
        </div>
      </div>

      <ImpactPreview stage="critical" />

      <Button
        className="w-full justify-between h-13 bg-red-500 hover:bg-red-600 text-white text-base font-semibold"
        onClick={onAccelerate}
      >
        <span className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Optimize Now — Protect Margin
        </span>
        <ArrowRight className="h-5 w-5" />
      </Button>

      {vehicle.mediaType !== "real" && (
        <Button
          variant="outline"
          className="w-full justify-between h-11 border-red-200 text-red-700 hover:bg-red-50"
          onClick={onUpgradeMedia}
        >
          <span className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Upgrade to Real Media
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        className="w-full justify-between h-11 border-red-200 text-red-700 hover:bg-red-50"
      >
        <span className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Optimize Price
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
