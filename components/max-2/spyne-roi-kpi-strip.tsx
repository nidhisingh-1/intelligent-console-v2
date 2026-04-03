"use client"

import type { ReactNode } from "react"
import type { LotVehicle } from "@/services/max-2/max-2.types"
import { spyneComponentClasses } from "@/lib/design-system/max-2"
import { cn } from "@/lib/utils"

/** Semantic dot + optional status pill context (Lot KPI strip). */
export type SpyneRoiKpiMetricStatus = "good" | "watch" | "bad" | "neutral"

const statusDot: Record<SpyneRoiKpiMetricStatus, string> = {
  good: "bg-spyne-success",
  watch: "bg-spyne-warning",
  bad: "bg-spyne-error",
  neutral: "bg-muted-foreground/40",
}

/**
 * ROI / KPI metric strip shell — one white rounded container, equal-width columns,
 * `divide-x` / `divide-y` separators. Used by Lot View and Sales Console overview.
 *
 * Override the default `lg:grid-cols-5` when the row has a different column count
 * (e.g. `lg:grid-cols-2` for Studio, `lg:grid-cols-8` for Service).
 */
export function SpyneRoiKpiStrip({
  children,
  gridClassName,
}: {
  children: ReactNode
  gridClassName?: string
}) {
  return (
    <div className={spyneComponentClasses.roiKpiStrip}>
      <div className={cn(spyneComponentClasses.roiKpiStripGrid, gridClassName)}>
        {children}
      </div>
    </div>
  )
}

/**
 * Single metric cell: label row (dot + uppercase label), primary value, subtext.
 * Typography and spacing match Lot View `LotKPIStrip` / reference ROI cards.
 */
export function SpyneRoiKpiMetricCell({
  label,
  value,
  sub,
  status,
  valueClassName,
  subClassName,
  cellClassName,
  onClick,
}: {
  label: string
  value: string
  sub: ReactNode
  status: SpyneRoiKpiMetricStatus
  valueClassName?: string
  /** Optional override for subline color (e.g. semantic success/error). */
  subClassName?: string
  /** Merged onto the metric cell wrapper (e.g. highlighted column background). */
  cellClassName?: string
  /** When set, cell is a button (Studio overview drill-downs). */
  onClick?: () => void
}) {
  const dot = statusDot[status]

  const inner = (
    <>
      <div className={spyneComponentClasses.roiKpiMetricLabelRow}>
        <span className={cn(spyneComponentClasses.roiKpiMetricDot, dot)} />
        <p className={spyneComponentClasses.roiKpiMetricLabel}>{label}</p>
      </div>
      <p className={cn(spyneComponentClasses.roiKpiMetricValue, valueClassName)}>{value}</p>
      <p className={cn(spyneComponentClasses.roiKpiMetricSub, subClassName)}>{sub}</p>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          spyneComponentClasses.roiKpiMetricCell,
          cellClassName,
          "w-full text-left transition-colors hover:bg-muted/30",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/25 focus-visible:ring-offset-2",
        )}
      >
        {inner}
      </button>
    )
  }

  return <div className={cn(spyneComponentClasses.roiKpiMetricCell, cellClassName)}>{inner}</div>
}

/** Stacked bar + legend for retail vs wholesale (Lot View disposition column). */
export function SpyneRoiKpiDispositionPanel({ vehicles }: { vehicles: LotVehicle[] }) {
  const retail = vehicles.filter((v) => v.lotStatus === "frontline").length
  const wholesale = vehicles.filter((v) => v.lotStatus === "wholesale-candidate").length
  const total = vehicles.length

  const rows = [
    {
      label: "Retail",
      count: retail,
      bar: "bg-spyne-success",
      dot: "bg-spyne-success",
      val: "text-spyne-success",
    },
    {
      label: "Wholesale",
      count: wholesale,
      bar: "bg-spyne-error",
      dot: "bg-spyne-error",
      val: "text-spyne-error",
    },
  ]

  return (
    <div className={spyneComponentClasses.roiKpiMetricCell}>
      <div className={spyneComponentClasses.roiKpiMetricLabelRow}>
        <span className={cn(spyneComponentClasses.roiKpiMetricDot, statusDot.neutral)} />
        <p className={spyneComponentClasses.roiKpiMetricLabel}>Disposition</p>
      </div>

      <div className={spyneComponentClasses.roiKpiDispositionBarTrack}>
        {rows.map((r) =>
          r.count > 0 ? (
            <div
              key={r.label}
              className={r.bar}
              style={{ width: `${total > 0 ? (r.count / total) * 100 : 0}%` }}
            />
          ) : null,
        )}
      </div>

      <div className={spyneComponentClasses.roiKpiDispositionLegend}>
        {rows.map((r) => (
          <div key={r.label} className={spyneComponentClasses.roiKpiDispositionLegendRow}>
            <div className="flex items-center gap-1.5">
              <span className={cn(spyneComponentClasses.roiKpiMetricDot, r.dot)} />
              <span className={spyneComponentClasses.roiKpiDispositionLegendLabel}>{r.label}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={cn("text-xs font-bold tabular-nums", r.val)}>{r.count}</span>
              <span className={spyneComponentClasses.roiKpiDispositionLegendPct}>
                {total > 0 ? `${((r.count / total) * 100).toFixed(0)}%` : "0%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
