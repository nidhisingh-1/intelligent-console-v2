"use client"

import * as React from "react"
import { useHoldingCostRateOptional } from "@/components/max-2/holding-cost-rate-context"
import type { LotStatus } from "@/services/max-2/max-2.types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { SpyneLotStatusChip } from "@/components/max-2/spyne-ui"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { spyneComponentClasses } from "@/lib/design-system/max-2"
import { issueLabelForLotVehicle } from "@/lib/inventory-issue-label"
import { lotVehicleToMerchandising } from "@/lib/lot-vehicle-to-merchandising"
import { MerchandisingInventoryActionCta } from "@/components/max-2/studio/merchandising-inventory-action-cta"
import { Search } from "lucide-react"

const fmt$ = (n: number) => `$${n.toLocaleString()}`

export function LotVehicleTable() {
  const { vehicles: lotVehicles } = useHoldingCostRateOptional()
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [pricingFilter, setPricingFilter] = React.useState<string>("all")

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase()
    return [...lotVehicles]
      .filter((v) => {
        if (q && ![v.make, v.model, v.stockNumber].some((f) => f.toLowerCase().includes(q)))
          return false
        if (statusFilter !== "all" && v.lotStatus !== statusFilter) return false
        if (pricingFilter !== "all" && v.pricingPosition !== pricingFilter) return false
        return true
      })
      .sort((a, b) => b.daysInStock - a.daysInStock)
  }, [lotVehicles, search, statusFilter, pricingFilter])

  return (
    <Card className="shadow-none gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Lot Inventory</CardTitle>
        <CardDescription>
          Full vehicle list - filter by status, pricing, or keyword
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-1">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search make, model, stock #…"
              className="pl-9 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Lot Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="frontline">Frontline</SelectItem>
              <SelectItem value="wholesale-candidate">Wholesale</SelectItem>
              <SelectItem value="in-recon">In Recon</SelectItem>
              <SelectItem value="arriving">Arriving</SelectItem>
              <SelectItem value="sold-pending">Sold Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={pricingFilter} onValueChange={setPricingFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              <SelectItem value="below-market">Below Market</SelectItem>
              <SelectItem value="at-market">At Market</SelectItem>
              <SelectItem value="above-market">Above Market</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text whitespace-nowrap">Stock #</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text">Vehicle</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text">Color</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text text-right">List Price</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text text-right">Days</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text whitespace-nowrap">Issue</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text">Status</th>
                <th className="pb-3 pr-4 text-xs font-semibold text-spyne-text text-right whitespace-nowrap">Holding Cost</th>
                <th className="pb-3 text-xs font-semibold text-spyne-text whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const isAged = v.daysInStock >= 45
                const issue = issueLabelForLotVehicle(v)
                const issueAccent = issue.tone === "warning" || issue.tone === "danger"

                return (
                  <tr
                    key={v.vin}
                    className="border-b last:border-0 border-spyne-border transition-colors hover:bg-muted/30"
                  >
                    <td
                      className={cn(
                        "py-3.5 pr-4 text-xs text-muted-foreground tabular-nums",
                        (isAged || issueAccent) && spyneComponentClasses.overviewIssueRowAccent,
                      )}
                    >
                      {v.stockNumber}
                    </td>
                    <td className="py-3.5 pr-4 font-medium whitespace-nowrap">
                      {v.year} {v.make} {v.model} {v.trim}
                    </td>
                    <td className="py-3.5 pr-4 text-muted-foreground whitespace-nowrap">{v.color}</td>
                    <td className="py-3.5 pr-4 text-right tabular-nums">{fmt$(v.listPrice)}</td>
                    <td className={cn("py-3.5 pr-4 text-right tabular-nums font-semibold", isAged && "text-spyne-error")}>
                      {v.daysInStock}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          issue.tone === "danger" && "text-spyne-error",
                          issue.tone === "warning" && "text-amber-800",
                          issue.tone === "neutral" && "text-muted-foreground",
                        )}
                      >
                        {issue.label}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <SpyneLotStatusChip status={v.lotStatus} compact />
                    </td>
                    <td className={cn(
                      "py-3.5 pr-4 text-right tabular-nums font-semibold",
                      v.totalHoldingCost >= 2000 ? "text-spyne-error" : v.totalHoldingCost >= 1000 ? "text-spyne-text" : "text-muted-foreground",
                    )}>
                      {fmt$(v.totalHoldingCost)}
                    </td>
                    <td className="py-3.5">
                      <MerchandisingInventoryActionCta
                        v={lotVehicleToMerchandising(v)}
                        size="md"
                        ui="shadcn-outline"
                      />
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-muted-foreground">
                    No vehicles match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
