"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { STAGE_CONFIG } from "@/lib/inventory-mocks"
import { StageBadge } from "./stage-badge"
import type { OpportunityItem } from "@/services/inventory/inventory.types"
import {
  Target,
  Zap,
  Camera,
  Settings2,
  ArrowRight,
  ChevronRight,
} from "lucide-react"

interface OpportunityQueueProps {
  items: OpportunityItem[]
  onAccelerate: (vin: string) => void
  onUpgradeMedia: (vin: string) => void
}

const actionConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  "Immediate Optimize": {
    icon: <Settings2 className="h-3.5 w-3.5" />,
    className: "bg-red-500 hover:bg-red-600 text-white",
  },
  "Activate Campaign": {
    icon: <Zap className="h-3.5 w-3.5" />,
    className: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  "Upgrade Media": {
    icon: <Camera className="h-3.5 w-3.5" />,
    className: "bg-violet-500 hover:bg-violet-600 text-white",
  },
}

export function OpportunityQueue({ items, onAccelerate, onUpgradeMedia }: OpportunityQueueProps) {
  if (items.length === 0) return null

  return (
    <Card className="border-2 border-dashed border-primary/20 bg-primary/[0.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Acceleration Opportunities</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Auto-ranked by dollar impact — your next best actions</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, i) => {
          const ac = actionConfig[item.action] || actionConfig["Activate Campaign"]
          return (
            <div
              key={item.vin}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-colors group"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                {i + 1}
              </span>

              <Link href={`/inventory/${item.vin}`} className="flex-1 min-w-0 group/link">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground group-hover/link:text-primary transition-colors truncate">
                    {item.year} {item.make} {item.model}
                  </span>
                  <StageBadge stage={item.stage} size="sm" />
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {item.reason}
                </p>
              </Link>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold text-foreground tabular-nums">
                  ${item.dollarImpact.toLocaleString()}
                </span>
                <Button
                  size="sm"
                  className={cn("h-7 text-[11px] gap-1 px-2.5", ac.className)}
                  onClick={() =>
                    item.action === "Upgrade Media"
                      ? onUpgradeMedia(item.vin)
                      : onAccelerate(item.vin)
                  }
                >
                  {ac.icon}
                  {item.action}
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
