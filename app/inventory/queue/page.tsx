"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StageBadge, MediaBadge, CampaignBadge, AIPageSummary } from "@/components/inventory"
import { getMockOpportunities, STAGE_CONFIG } from "@/lib/inventory-mocks"
import {
  Target, Zap, Camera, Settings2, ArrowRight, CheckCircle2,
  AlertTriangle, Clock, Filter,
} from "lucide-react"
import { useScenario } from "@/lib/scenario-context"
import { getScenarioData } from "@/lib/demo-scenarios"

const urgencyConfig = {
  high: { label: "Urgent", className: "bg-red-50 text-red-700 border-red-200", icon: <AlertTriangle className="h-3 w-3" /> },
  medium: { label: "Important", className: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="h-3 w-3" /> },
  low: { label: "Optional", className: "bg-gray-50 text-gray-600 border-gray-200", icon: <CheckCircle2 className="h-3 w-3" /> },
}

const actionIcon: Record<string, React.ReactNode> = {
  "Immediate Optimize": <Settings2 className="h-4 w-4" />,
  "Activate Campaign": <Zap className="h-4 w-4" />,
  "Upgrade Media": <Camera className="h-4 w-4" />,
}

const actionColor: Record<string, string> = {
  "Immediate Optimize": "bg-red-500 hover:bg-red-600 text-white",
  "Activate Campaign": "bg-orange-500 hover:bg-orange-600 text-white",
  "Upgrade Media": "bg-violet-500 hover:bg-violet-600 text-white",
}

export default function OpportunityQueuePage() {
  const { activeScenario } = useScenario()
  const [filter, setFilter] = React.useState<"all" | "high" | "medium" | "low">("all")

  const vehicles = React.useMemo(
    () => getScenarioData(activeScenario).vehicles,
    [activeScenario]
  )

  const allOpportunities = React.useMemo(
    () => getMockOpportunities(vehicles),
    [vehicles]
  )

  const filtered = filter === "all"
    ? allOpportunities
    : allOpportunities.filter((o) => o.urgency === filter)

  const totalImpact = allOpportunities.reduce((a, o) => a + o.dollarImpact, 0)

  const highUrgencyItems = allOpportunities.filter((o) => o.urgency === "high")
  const topThreeImpact = allOpportunities.slice(0, 3).reduce((a, o) => a + o.dollarImpact, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Opportunity Queue</h1>
              <p className="text-sm text-muted-foreground">
                Your daily action hub — ranked by dollar impact.
                {" "}<span className="font-semibold text-foreground">${totalImpact.toLocaleString()}</span> total recoverable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <AIPageSummary
        summary={`${allOpportunities.length} actions pending worth $${totalImpact.toLocaleString()} in recoverable margin. ${highUrgencyItems.length > 0 ? `${highUrgencyItems.length} are urgent. ` : ""}Tackling the top 3 today could protect $${topThreeImpact.toLocaleString()} before end of week.`}
      />

      {/* Urgency filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "high", "medium", "low"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              filter === f
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            {f === "all" ? `All (${allOpportunities.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${allOpportunities.filter((o) => o.urgency === f).length})`}
          </button>
        ))}
      </div>

      {/* Queue items */}
      <div className="space-y-3">
        {filtered.map((item, i) => {
          const vehicle = vehicles.find((v) => v.vin === item.vin)
          const uc = urgencyConfig[item.urgency]

          return (
            <Card key={item.vin} className={cn(
              "transition-all hover:shadow-md",
              item.urgency === "high" && "border-red-200"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {i + 1}
                  </span>

                  {/* Vehicle info */}
                  <Link href={`/inventory/${item.vin}`} className="flex-1 min-w-0 group">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                        {item.year} {item.make} {item.model}
                      </p>
                      <StageBadge stage={item.stage} size="sm" />
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border", uc.className)}>
                        {uc.icon}
                        {uc.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </Link>

                  {/* Impact + Action */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">${item.dollarImpact.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">impact</p>
                    </div>
                    <Button size="sm" className={cn("h-8 text-xs gap-1.5", actionColor[item.action])}>
                      {actionIcon[item.action]}
                      {item.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No opportunities in this category. Nice work.</p>
          </div>
        )}
      </div>
    </div>
  )
}
