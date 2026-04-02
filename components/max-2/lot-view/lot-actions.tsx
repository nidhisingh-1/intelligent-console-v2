"use client"

import { useRouter } from "next/navigation"
import { mockLotVehicles } from "@/lib/max-2-mocks"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, ChevronRight } from "lucide-react"

type Priority = "critical" | "high" | "medium"

interface ActionItem {
  id: string
  priority: Priority
  title: string
  vehicles: { name: string; days: number; stock: string }[]
  impact: string
  count: number
  filterParams: Record<string, string>
}

const P: Record<Priority, { dot: string; badge: string; impact: string }> = {
  critical: { dot: "bg-red-500",   badge: "bg-red-50 text-red-600 border border-red-200",     impact: "text-red-600"   },
  high:     { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border border-amber-200", impact: "text-amber-700" },
  medium:   { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border border-amber-200", impact: "text-amber-700" },
}

const ON_LOT = ["frontline", "wholesale-candidate", "sold-pending"]

const aged45Cars   = mockLotVehicles.filter((v) => ON_LOT.includes(v.lotStatus) && v.daysInStock >= 45 && v.lotStatus !== "sold-pending")
const noLeadsCars  = mockLotVehicles.filter((v) => v.leads === 0 && v.daysInStock > 5 && v.lotStatus === "frontline")
const noPhotoCars  = mockLotVehicles.filter((v) => !v.hasRealPhotos && v.lotStatus === "frontline")

const ALL_ACTIONS = ([
  {
    id: "aged",
    priority: "critical" as Priority,
    title: "Reprice or Liquidate",
    vehicles: aged45Cars.map((v) => ({ name: `${v.year} ${v.make} ${v.model}`, days: v.daysInStock, stock: v.stockNumber })),
    impact: `$${(aged45Cars.reduce((s, v) => s + v.holdingCostPerDay, 0) * 7).toLocaleString()} more lost in 7 days if no action`,
    count: aged45Cars.length,
    filterParams: { age: "45+" },
  },
  {
    id: "leads",
    priority: "critical" as Priority,
    title: "Fix Pricing or Visibility",
    vehicles: noLeadsCars.map((v) => ({ name: `${v.year} ${v.make} ${v.model}`, days: v.daysInStock, stock: v.stockNumber })),
    impact: `${noLeadsCars.length} frontline cars generating zero lead revenue`,
    count: noLeadsCars.length,
    filterParams: { status: "frontline", leads: "no-leads" },
  },
  {
    id: "photos",
    priority: "high" as Priority,
    title: "Upload Real Photos",
    vehicles: noPhotoCars.map((v) => ({ name: `${v.year} ${v.make} ${v.model}`, days: v.daysInStock, stock: v.stockNumber })),
    impact: "Real photos generate 3× more leads per vehicle listing",
    count: noPhotoCars.length,
    filterParams: { photos: "no-real-photos" },
  },
] as ActionItem[]).filter((a) => a.count > 0)

export function LotActions() {
  const router = useRouter()

  const handleActionClick = (action: ActionItem) => {
    const params = new URLSearchParams(action.filterParams)
    router.push(`/max-2/lot-view/inventory?${params.toString()}`)
  }

  return (
    <Card className="shadow-none gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Actions</CardTitle>
        <CardDescription>Sorted by revenue impact - work top to bottom</CardDescription>
      </CardHeader>

      <CardContent className="pt-1">
        {ALL_ACTIONS.length === 0 ? (
          <div className="flex items-center gap-2 py-4 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            No urgent actions - lot is performing well
          </div>
        ) : (
          <div className="space-y-2">
            {ALL_ACTIONS.map((action) => {
              const cfg = P[action.priority]
              return (
                <div
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className="rounded-xl border bg-muted/30 px-4 py-3 cursor-pointer transition-all duration-150 hover:bg-muted/60 hover:border-gray-300 hover:shadow-sm active:scale-[0.99] group"
                >
                  {/* Title + count + chevron */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold">{action.title}</span>
                    <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0", cfg.badge)}>
                      {action.count} car{action.count !== 1 ? "s" : ""}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                  </div>
                  {/* Vehicles */}
                  <p className="text-xs text-muted-foreground mb-1.5">
                    {action.vehicles.slice(0, 2).map((v) => `${v.name} · ${v.days}d`).join("  ·  ")}
                    {action.vehicles.length > 2 && `  +${action.vehicles.length - 2} more`}
                  </p>
                  {/* Impact */}
                  <p className={cn("text-xs font-medium", cfg.impact)}>
                    → {action.impact}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
