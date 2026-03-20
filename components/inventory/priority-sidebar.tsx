"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { VehicleSummary, OpportunityItem } from "@/services/inventory/inventory.types"
import { STAGE_CONFIG } from "@/lib/inventory-mocks"
import { StageBadge } from "./stage-badge"
import {
  AlertTriangle,
  Clock,
  Zap,
  ChevronRight,
  Target,
  Settings2,
  Camera,
} from "lucide-react"

interface PrioritySidebarProps {
  vehicles: VehicleSummary[]
  opportunities?: OpportunityItem[]
  onAccelerate?: (vin: string) => void
  onUpgradeMedia?: (vin: string) => void
}

interface PriorityGroup {
  label: string
  icon: React.ReactNode
  iconBg: string
  items: { vin: string; name: string; detail: string }[]
  urgency: "critical" | "warning" | "info"
}

const opportunityActionConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  "Immediate Optimize": {
    icon: <Settings2 className="h-3 w-3" />,
    className: "bg-red-500 hover:bg-red-600 text-white",
  },
  "Activate Campaign": {
    icon: <Zap className="h-3 w-3" />,
    className: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  "Upgrade Media": {
    icon: <Camera className="h-3 w-3" />,
    className: "bg-violet-500 hover:bg-violet-600 text-white",
  },
}

export function PrioritySidebar({ vehicles, opportunities = [], onAccelerate, onUpgradeMedia }: PrioritySidebarProps) {
  const criticalVehicles = vehicles.filter((v) => v.stage === "critical")
  const nearBreakEven = vehicles.filter(
    (v) =>
      v.stage !== "critical" &&
      v.marginRemaining > 0 &&
      v.marginRemaining / v.dailyBurn <= 7
  )
  const highInterestNoCampaign = vehicles.filter(
    (v) => v.leads >= 6 && v.campaignStatus === "none"
  )

  const groups: PriorityGroup[] = [
    {
      label: "Critical — Margin Depleting",
      icon: <AlertTriangle className="h-3.5 w-3.5 text-red-600" />,
      iconBg: "bg-red-50",
      urgency: "critical",
      items: criticalVehicles.map((v) => ({
        vin: v.vin,
        name: `${v.year} ${v.make} ${v.model}`,
        detail: v.marginRemaining <= 0
          ? "Past break-even"
          : `$${v.marginRemaining.toLocaleString()} left`,
      })),
    },
    {
      label: "Near Break-even (< 7 days)",
      icon: <Clock className="h-3.5 w-3.5 text-orange-600" />,
      iconBg: "bg-orange-50",
      urgency: "warning",
      items: nearBreakEven.map((v) => ({
        vin: v.vin,
        name: `${v.year} ${v.make} ${v.model}`,
        detail: `${Math.ceil(v.marginRemaining / v.dailyBurn)}d to break-even`,
      })),
    },
    {
      label: "High Interest — No Campaign",
      icon: <Zap className="h-3.5 w-3.5 text-blue-600" />,
      iconBg: "bg-blue-50",
      urgency: "info",
      items: highInterestNoCampaign.map((v) => ({
        vin: v.vin,
        name: `${v.year} ${v.make} ${v.model}`,
        detail: `${v.leads} leads · No campaign`,
      })),
    },
  ]

  const activeGroups = groups.filter((g) => g.items.length > 0)

  const totalActions =
    activeGroups.reduce((acc, g) => acc + g.items.length, 0)

  if (activeGroups.length === 0) return null

  const borderColor: Record<string, string> = {
    critical: "border-l-red-400",
    warning: "border-l-orange-400",
    info: "border-l-blue-400",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Today&apos;s Priorities</h3>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {totalActions} actions
        </span>
      </div>

      {/* Acceleration Opportunities — hidden for now */}

      {activeGroups.map((group) => (
        <div key={group.label} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className={cn("p-1 rounded-md", group.iconBg)}>
              {group.icon}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {group.label} ({group.items.length})
            </span>
          </div>
          <div className="space-y-1">
            {group.items.slice(0, 3).map((item) => (
              <Link
                key={item.vin}
                href={`/inventory/${item.vin}`}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg border-l-2 bg-white hover:bg-gray-50 transition-colors group",
                  borderColor[group.urgency]
                )}
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                </div>
                <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
              </Link>
            ))}
            {group.items.length > 3 && (
              <p className="text-[11px] text-muted-foreground pl-3">
                +{group.items.length - 3} more
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
