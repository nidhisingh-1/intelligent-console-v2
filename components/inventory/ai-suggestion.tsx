"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { VehicleDetail } from "@/services/inventory/inventory.types"

interface AISuggestionProps {
  suggestion: string
  impact?: string
  action?: string
  onAction?: () => void
  className?: string
}

export function AISuggestion({
  suggestion,
  impact,
  action,
  onAction,
  className,
}: AISuggestionProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/15 relative overflow-hidden transition-all duration-500",
        "bg-gradient-to-r from-primary/[0.04] via-primary/[0.02] to-transparent",
        "animate-ai-glow",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />

      <div className="flex items-center gap-2 relative shrink-0">
        <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">
          AI Insight
        </span>
      </div>

      <p className="text-sm text-foreground/80 flex-1 relative">{suggestion}</p>

      {impact && (
        <span className="text-sm font-bold text-emerald-600 tabular-nums shrink-0 relative">
          {impact}
        </span>
      )}

      {action && onAction && (
        <Button
          size="sm"
          variant="outline"
          onClick={onAction}
          className="h-7 text-xs border-primary/20 text-primary hover:bg-primary/5 shrink-0 relative"
        >
          {action}
        </Button>
      )}
    </div>
  )
}

export function getVehicleAISuggestion(vehicle: VehicleDetail): {
  suggestion: string
  impact?: string
  action?: string
} {
  if (vehicle.stage === "critical") {
    if (vehicle.marginRemaining <= 0) {
      return {
        suggestion: `Margin depleted after ${vehicle.daysInStock} days with zero conversion. Wholesale evaluation recommended to stop capital bleed.`,
        impact: `-$${Math.abs(vehicle.marginRemaining).toLocaleString()}`,
        action: "Price to Move",
      }
    }
    return {
      suggestion: `Only $${vehicle.marginRemaining.toLocaleString()} margin left at $${vehicle.dailyBurn}/day burn — ~${Math.ceil(vehicle.marginRemaining / vehicle.dailyBurn)} days of runway. Aggressive action needed.`,
      impact: `$${vehicle.marginRemaining.toLocaleString()} at risk`,
      action: "Emergency Boost",
    }
  }

  if (vehicle.stage === "risk" && vehicle.campaignStatus === "none") {
    const protectable = Math.round(vehicle.marginRemaining * 0.4)
    return {
      suggestion: `No active campaign on a ${vehicle.daysInStock}-day risk vehicle. Activation could accelerate turn by 5–8 days, protecting ~$${protectable.toLocaleString()} in margin.`,
      impact: `+$${protectable.toLocaleString()}`,
      action: "Activate Campaign",
    }
  }

  if (vehicle.mediaType !== "real" && vehicle.stage !== "fresh") {
    return {
      suggestion: `Vehicles with real media see +137% CTR and 2x faster turns on your lot. Upgrading from clone could significantly lift this unit's conversion.`,
      impact: "+137% CTR",
      action: "Upgrade Media",
    }
  }

  if (vehicle.stage === "watch") {
    const daysToRisk = Math.ceil(vehicle.marginRemaining / vehicle.dailyBurn)
    if (vehicle.leads > 5) {
      return {
        suggestion: `Strong lead interest (${vehicle.leads} leads) but ${daysToRisk} days to risk stage. A campaign boost could push this to close before margin erodes.`,
        impact: `${daysToRisk}d runway`,
      }
    }
    return {
      suggestion: `Approaching risk stage in ~${daysToRisk} days with only ${vehicle.leads} leads. Consider media upgrade or campaign to improve engagement.`,
      impact: `${daysToRisk}d runway`,
    }
  }

  return {
    suggestion: `Performing well with ${vehicle.leads} leads and ${vehicle.appointments} appointments. Current trajectory suggests sale within ${Math.max(1, 15 - vehicle.daysInStock)} days.`,
  }
}
