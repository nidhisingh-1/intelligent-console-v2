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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ── Body type mapping ─────────────────────────────────────────────────────
const MODEL_TO_BODY: Record<string, string> = {
  "F-150":    "Truck",
  "Silverado":"Truck",
  "RAV4":     "SUV",
  "Q5":       "SUV",
  "CX-5":     "SUV",
  "Equinox":  "SUV",
  "Sportage": "SUV",
  "Tucson":   "SUV",
  "Forester": "SUV",
  "3 Series": "Sedan",
  "Altima":   "Sedan",
  "Sonata":   "Sedan",
  "Corolla":  "Sedan",
  "Civic":    "Sedan",
  "Camry":    "Sedan",
}

const BODY_TYPES = ["SUV", "Sedan", "Truck"] as const

const BODY_STYLE: Record<
  string,
  { bar: string; dot: string; text: string; bg: string }
> = {
  SUV:   { bar: "bg-rose-400",  dot: "bg-rose-400",  text: "text-rose-700",  bg: "bg-rose-50"  },
  Sedan: { bar: "bg-rose-600",  dot: "bg-rose-600",  text: "text-rose-800",  bg: "bg-rose-50"  },
  Truck: { bar: "bg-rose-800",  dot: "bg-rose-800",  text: "text-rose-900",  bg: "bg-rose-50"  },
}

// ── Price bucket config ───────────────────────────────────────────────────
const PRICE_BUCKETS = [
  { label: "Under $15K",  min: 0,     max: 15000,   filterValue: "under-15k" },
  { label: "$15K–$25K",   min: 15000, max: 25000,   filterValue: "15k-25k" },
  { label: "$25K–$35K",   min: 25000, max: 35000,   filterValue: "25k-35k" },
  { label: "$35K–$50K",   min: 35000, max: 50000,   filterValue: "35k-50k" },
  { label: "$50K+",       min: 50000, max: Infinity, filterValue: "50k+" },
] as const

const PRICE_STYLE = [
  { bar: "bg-blue-300",  dot: "bg-blue-300" },
  { bar: "bg-blue-400",  dot: "bg-blue-400" },
  { bar: "bg-blue-500",  dot: "bg-blue-500" },
  { bar: "bg-blue-600",  dot: "bg-blue-600" },
  { bar: "bg-blue-800",  dot: "bg-blue-800" },
]

export function LotBodyAnalysis() {
  const router = useRouter()
  const active = mockLotVehicles.filter(
    (v) => v.lotStatus !== "arriving" && v.lotStatus !== "in-recon",
  )

  // ── Body type data ──────────────────────────────────────────────────────
  const groups = BODY_TYPES.map((bodyType) => {
    const vehicles = active.filter((v) => MODEL_TO_BODY[v.model] === bodyType)
    const sellable = vehicles.filter(
      (v) => v.lotStatus === "frontline" || v.lotStatus === "wholesale-candidate",
    )
    const avgDays =
      vehicles.length > 0
        ? vehicles.reduce((s, v) => s + v.daysInStock, 0) / vehicles.length
        : 0
    const accumulated= vehicles.reduce((s, v) => s + v.totalHoldingCost, 0)
    const agedCount  = vehicles.filter((v) => v.daysInStock >= 45).length

    const status =
      agedCount > 0 ? "risk" : avgDays > 28 ? "watch" : "good"

    return {
      bodyType,
      count: vehicles.length,
      sellableCount: sellable.length,
      avgDays: Math.round(avgDays * 10) / 10,
      accumulated,
      agedCount,
      status,
    }
  })

  const totalAccumulated = groups.reduce((s, g) => s + g.accumulated, 0)
  const maxAccumulated   = Math.max(...groups.map((g) => g.accumulated), 1)

  const best  = [...groups].sort((a, b) => a.avgDays - b.avgDays)[0]
  const worst = [...groups].sort((a, b) => b.avgDays - a.avgDays)[0]

  const STATUS_CFG: Record<string, { label: string; cls: string }> = {
    good:  { label: "Healthy",  cls: "bg-emerald-50 text-emerald-700" },
    watch: { label: "Monitor",  cls: "bg-amber-50 text-amber-700"     },
    risk:  { label: "At Risk",  cls: "bg-red-50 text-red-700"         },
  }

  // ── Price bucket data ───────────────────────────────────────────────────
  const priceBuckets = PRICE_BUCKETS.map((bucket, i) => {
    const vehicles = active.filter(
      (v) => v.listPrice >= bucket.min && v.listPrice < bucket.max,
    )
    const avgPrice =
      vehicles.length > 0
        ? vehicles.reduce((s, v) => s + v.listPrice, 0) / vehicles.length
        : 0
    const avgDays =
      vehicles.length > 0
        ? vehicles.reduce((s, v) => s + v.daysInStock, 0) / vehicles.length
        : 0
    const accumulated = vehicles.reduce((s, v) => s + v.totalHoldingCost, 0)
    const agedCount = vehicles.filter((v) => v.daysInStock >= 45).length
    const status = agedCount > 0 ? "risk" : avgDays > 28 ? "watch" : "good"

    return {
      label: bucket.label,
      filterValue: bucket.filterValue,
      styleIdx: i,
      count: vehicles.length,
      avgPrice: Math.round(avgPrice),
      avgDays: Math.round(avgDays * 10) / 10,
      accumulated,
      agedCount,
      status,
    }
  }).filter((b) => b.count > 0)

  const totalPriceAccumulated = priceBuckets.reduce((s, b) => s + b.accumulated, 0)
  const maxPriceAccumulated   = Math.max(...priceBuckets.map((b) => b.accumulated), 1)

  const bestPrice  = [...priceBuckets].sort((a, b) => a.avgDays - b.avgDays)[0]
  const worstPrice = [...priceBuckets].sort((a, b) => b.avgDays - a.avgDays)[0]

  return (
    <Card className="shadow-none gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Inventory Analysis</CardTitle>
        <CardDescription>
          Which segments are turning fast, which are aging — and where your money is tied up
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-1">
        <Tabs defaultValue="body-type">
          <TabsList className="mb-4">
            <TabsTrigger value="body-type" className="data-[state=active]:bg-[#4600f2] data-[state=active]:text-white">Body Type Distribution</TabsTrigger>
            <TabsTrigger value="avg-sale-price" className="data-[state=active]:bg-[#4600f2] data-[state=active]:text-white">Average Sale Price</TabsTrigger>
          </TabsList>

          {/* ── Body Type Tab ── */}
          <TabsContent value="body-type">
            <div className="overflow-x-auto">
              <div className="min-w-[600px] space-y-3">
                <div className="grid grid-cols-[120px_1fr_72px_80px_120px_76px] gap-4 px-3">
                  {["Body Type", "Cost Share", "Cars", "Avg Days", "Holding Cost", "Status"].map((h) => (
                    <p key={h} className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{h}</p>
                  ))}
                </div>

                {groups.map((g) => {
                  const style  = BODY_STYLE[g.bodyType]
                  const pct    = totalAccumulated > 0 ? (g.accumulated / totalAccumulated) * 100 : 0
                  const status = STATUS_CFG[g.status]

                  return (
                    <div key={g.bodyType} className="grid grid-cols-[120px_1fr_72px_80px_120px_76px] gap-4 items-center rounded-xl border bg-muted/10 px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full shrink-0", style.dot)} />
                        <span className="text-sm font-semibold">{g.bodyType}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-500", style.bar)} style={{ width: `${(g.accumulated / maxAccumulated) * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold tabular-nums w-[34px] text-right">{pct.toFixed(0)}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">of total holding cost</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{g.count}</p>
                        <p className="text-[10px] text-muted-foreground">{g.sellableCount} avail.</p>
                      </div>
                      <div>
                        <p className={cn("text-sm font-bold tabular-nums", g.avgDays > 35 ? "text-red-600" : g.avgDays > 22 ? "text-amber-600" : "text-emerald-600")}>{g.avgDays}d</p>
                        <p className="text-[10px] text-muted-foreground">avg in stock</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold tabular-nums">${g.accumulated.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">accrued so far</p>
                      </div>
                      <span className={cn("inline-flex justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold", status.cls)}>{status.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border-l-[3px] border-l-emerald-500 bg-emerald-50/60 px-4 py-3">
                <p className="text-[11px] font-semibold text-emerald-700 mb-1">Best Performer</p>
                <p className="text-sm text-emerald-800 leading-snug">
                  <strong>{best.bodyType}</strong> moving fastest at {best.avgDays}d avg — consider increasing buying in this segment to maintain velocity
                </p>
              </div>
              <div className="rounded-xl border-l-[3px] border-l-amber-500 bg-amber-50/60 px-4 py-3">
                <p className="text-[11px] font-semibold text-amber-700 mb-1">Needs Attention</p>
                <p className="text-sm text-amber-800 leading-snug">
                  <strong>{worst.bodyType}</strong> averaging {worst.avgDays}d — {worst.agedCount > 0 ? `${worst.agedCount} aged unit${worst.agedCount !== 1 ? "s" : ""} need immediate repricing or liquidation` : "monitor pricing and online visibility to prevent aging"}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ── Average Sale Price Tab ── */}
          <TabsContent value="avg-sale-price">
            <div className="overflow-x-auto">
              <div className="min-w-[600px] space-y-3">
                <div className="grid grid-cols-[120px_1fr_72px_100px_120px_76px] gap-4 px-3">
                  {["Price Range", "Cost Share", "Cars", "Avg Price", "Holding Cost", "Status"].map((h) => (
                    <p key={h} className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{h}</p>
                  ))}
                </div>

                {priceBuckets.map((b) => {
                  const style  = PRICE_STYLE[b.styleIdx]
                  const pct    = totalPriceAccumulated > 0 ? (b.accumulated / totalPriceAccumulated) * 100 : 0
                  const status = STATUS_CFG[b.status]

                  return (
                    <div key={b.label} onClick={() => router.push(`/max-2/lot-view/inventory?priceRange=${b.filterValue}`)} className="grid grid-cols-[120px_1fr_72px_100px_120px_76px] gap-4 items-center rounded-xl border bg-muted/10 px-3 py-3.5 cursor-pointer transition-all duration-150 hover:bg-muted/40 hover:border-gray-300 hover:shadow-sm active:scale-[0.99]">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full shrink-0", style.dot)} />
                        <span className="text-sm font-semibold">{b.label}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-500", style.bar)} style={{ width: `${(b.accumulated / maxPriceAccumulated) * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold tabular-nums w-[34px] text-right">{pct.toFixed(0)}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">of total holding cost</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{b.count}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold tabular-nums">${b.avgPrice.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">{b.avgDays}d avg</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold tabular-nums">${b.accumulated.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">accrued so far</p>
                      </div>
                      <span className={cn("inline-flex justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold", status.cls)}>{status.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {bestPrice && worstPrice && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border-l-[3px] border-l-emerald-500 bg-emerald-50/60 px-4 py-3">
                  <p className="text-[11px] font-semibold text-emerald-700 mb-1">Fastest Moving</p>
                  <p className="text-sm text-emerald-800 leading-snug">
                    <strong>{bestPrice.label}</strong> turning fastest at {bestPrice.avgDays}d avg — strong demand in this price segment
                  </p>
                </div>
                <div className="rounded-xl border-l-[3px] border-l-amber-500 bg-amber-50/60 px-4 py-3">
                  <p className="text-[11px] font-semibold text-amber-700 mb-1">Slowest Moving</p>
                  <p className="text-sm text-amber-800 leading-snug">
                    <strong>{worstPrice.label}</strong> averaging {worstPrice.avgDays}d — {worstPrice.agedCount > 0 ? `${worstPrice.agedCount} aged unit${worstPrice.agedCount !== 1 ? "s" : ""} may need repricing` : "consider adjusting pricing or marketing focus"}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
