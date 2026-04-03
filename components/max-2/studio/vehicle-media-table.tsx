"use client"

import * as React from "react"
import Link from "next/link"
import { formatDistanceToNowStrict, parseISO } from "date-fns"
import { mockMerchandisingVehicles } from "@/lib/max-2-mocks"
import type { MerchandisingVehicle, PublishStatus } from "@/services/max-2/max-2.types"
import { cn } from "@/lib/utils"
import { spyneComponentClasses } from "@/lib/design-system/max-2"
import { SpyneChip, SpynePublishStatusChip } from "@/components/max-2/spyne-ui"
import { MaterialSymbol } from "@/components/max-2/material-symbol"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

function formatOdometer(miles: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(miles)
}

function inferBodyStyle(model: string): string {
  const m = model.toLowerCase()
  if (
    /f-150|silverado|sierra|tacoma|tundra|1500|2500|ranger|frontier|pickup|ram/.test(m)
  ) {
    return "Truck"
  }
  if (
    /cr-v|rav4|pilot|highlander|explorer|equinox|tucson|tiguan|cx-|escape|rogue|pathfinder|telluride|palisade|outback|forester|wrangler|bronco|durango|traverse|blazer|edge|tahoe|yukon|suburban|expedition|sequoia|4runner/.test(
      m
    )
  ) {
    return "SUV"
  }
  return "Sedan"
}

function pseudoExteriorColor(vin: string): string {
  const palette = ["Red", "Gray", "White", "Black", "Silver", "Blue"]
  let h = 0
  for (let i = 0; i < vin.length; i++) h += vin.charCodeAt(i)
  return palette[h % palette.length]
}

function listingCorrelationId(v: MerchandisingVehicle): string {
  if (v.listingExternalId) return v.listingExternalId
  const raw = `${v.vin}STUDIO`.toUpperCase().replace(/[^A-Z0-9]/g, "")
  const chunk = raw + raw
  return chunk.slice(0, 16)
}

function stockLabel(v: MerchandisingVehicle): string {
  if (v.stockNumber) return v.stockNumber
  const n = v.vin.replace(/\D/g, "")
  return n ? `STK${n}` : `STK${v.vin}`
}

function getListingUpdatedAt(v: MerchandisingVehicle): Date {
  if (v.listingUpdatedAt) {
    try {
      return parseISO(v.listingUpdatedAt)
    } catch {
      /* fall through */
    }
  }
  const d = new Date()
  d.setHours(9 + (v.vin.charCodeAt(0) % 8), 30 + (v.vin.length % 30), 0, 0)
  d.setDate(d.getDate() - Math.min(v.daysInStock, 90))
  return d
}

function merchReviewFlags(v: MerchandisingVehicle) {
  const copyNeedsReview = !v.hasDescription
  const vehicleNeedsReview =
    v.mediaStatus !== "real-photos" ||
    v.incompletePhotoSet ||
    v.wrongHeroAngle
  const videoNeedsReview =
    v.missingWalkaroundVideo || (!v.hasVideo && v.photoCount > 0)
  return { copyNeedsReview, vehicleNeedsReview, videoNeedsReview }
}

function reviewIssueCount(v: MerchandisingVehicle): number {
  const f = merchReviewFlags(v)
  return [f.copyNeedsReview, f.vehicleNeedsReview, f.videoNeedsReview].filter(Boolean).length
}

function publishSortRank(s: PublishStatus): number {
  switch (s) {
    case "live":
      return 0
    case "pending":
      return 1
    case "not-published":
      return 2
  }
}

type VehicleTableSortKey = "vehicle" | "lastUpdated" | "review" | "publication"

function defaultSortDir(key: VehicleTableSortKey): "asc" | "desc" {
  return key === "lastUpdated" || key === "review" ? "desc" : "asc"
}

function compareVehicles(a: MerchandisingVehicle, b: MerchandisingVehicle, key: VehicleTableSortKey): number {
  switch (key) {
    case "vehicle":
      return `${a.year} ${a.make} ${a.model}`.localeCompare(
        `${b.year} ${b.make} ${b.model}`,
        undefined,
        { sensitivity: "base", numeric: true }
      )
    case "lastUpdated":
      return getListingUpdatedAt(a).getTime() - getListingUpdatedAt(b).getTime()
    case "review":
      return reviewIssueCount(a) - reviewIssueCount(b)
    case "publication":
      return publishSortRank(a.publishStatus) - publishSortRank(b.publishStatus)
  }
}

function sortVehicleRows(
  rows: MerchandisingVehicle[],
  key: VehicleTableSortKey,
  dir: "asc" | "desc"
): MerchandisingVehicle[] {
  const mult = dir === "asc" ? 1 : -1
  return [...rows].sort((a, b) => mult * compareVehicles(a, b, key))
}

function StudioPublishCell({ publishStatus }: { publishStatus: PublishStatus }) {
  if (publishStatus === "not-published") {
    return (
      <SpyneChip
        variant="soft"
        tone="neutral"
        compact
        className="max-w-full"
        leading={
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              "bg-spyne-text-secondary text-[10px] font-semibold text-white"
            )}
            aria-hidden
          >
            N
          </span>
        }
      >
        Not published
      </SpyneChip>
    )
  }
  return <SpynePublishStatusChip publishStatus={publishStatus} compact />
}

function VehicleTableSortHeader({
  columnKey,
  activeKey,
  dir,
  icon,
  label,
  onSort,
  className,
}: {
  columnKey: VehicleTableSortKey
  activeKey: VehicleTableSortKey
  dir: "asc" | "desc"
  icon: string
  label: string
  onSort: (key: VehicleTableSortKey) => void
  className?: string
}) {
  const active = activeKey === columnKey
  return (
    <th
      scope="col"
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
      className={cn("border-l border-spyne-border py-2.5 align-middle", className)}
    >
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        aria-label={
          active
            ? `${label}, sorted ${dir === "asc" ? "ascending" : "descending"}, click to reverse`
            : `Sort by ${label}`
        }
        className={cn(
          "inline-flex w-full min-w-0 items-center gap-1.5 rounded-md py-1 pl-0.5 pr-1 text-left transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30",
          active ? "text-spyne-primary" : "text-spyne-text-secondary hover:text-spyne-text"
        )}
      >
        <MaterialSymbol
          name={icon}
          size={16}
          className="shrink-0 opacity-90"
          aria-hidden
        />
        <span className="min-w-0 text-[10px] font-medium uppercase tracking-widest">{label}</span>
        <MaterialSymbol
          name={active ? (dir === "asc" ? "arrow_upward" : "arrow_downward") : "swap_vert"}
          size={14}
          className={cn("ml-auto shrink-0", active ? "text-spyne-primary" : "opacity-35")}
          aria-hidden
        />
      </button>
    </th>
  )
}

function ReviewStack({ v }: { v: MerchandisingVehicle }) {
  const { copyNeedsReview, vehicleNeedsReview, videoNeedsReview } = merchReviewFlags(v)
  const rows: { key: string; icon: string; show: boolean }[] = [
    { key: "copy", icon: "description", show: copyNeedsReview },
    { key: "vehicle", icon: "directions_car", show: vehicleNeedsReview },
    { key: "video", icon: "videocam", show: videoNeedsReview },
  ]
  const any = rows.some((r) => r.show)
  if (!any) {
    return (
      <span className="text-xs text-spyne-text-secondary">Ready</span>
    )
  }
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map(
        (r) =>
          r.show && (
            <SpyneChip
              key={r.key}
              variant="soft"
              tone="warning"
              compact
              leading={<MaterialSymbol name={r.icon} size={14} className="text-spyne-warning" />}
            >
              In review
            </SpyneChip>
          )
      )}
    </div>
  )
}

interface VehicleMediaTableProps {
  vehicles?: MerchandisingVehicle[]
  /** Optional title strip above the table (hidden when omitted) */
  title?: string
}

export function VehicleMediaTable({ vehicles, title }: VehicleMediaTableProps) {
  const data = vehicles ?? mockMerchandisingVehicles

  const [sort, setSort] = React.useState<{
    key: VehicleTableSortKey
    dir: "asc" | "desc"
  }>({ key: "lastUpdated", dir: "desc" })

  const handleSort = React.useCallback((key: VehicleTableSortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: defaultSortDir(key) }
    )
  }, [])

  const sorted = React.useMemo(
    () => sortVehicleRows(data, sort.key, sort.dir),
    [data, sort.key, sort.dir]
  )

  const [selected, setSelected] = React.useState<Set<string>>(() => new Set())

  const toggleOne = React.useCallback((vin: string, next: boolean) => {
    setSelected((prev) => {
      const n = new Set(prev)
      if (next) n.add(vin)
      else n.delete(vin)
      return n
    })
  }, [])

  const selectedOnPage = sorted.filter((v) => selected.has(v.vin)).length
  const headerChecked =
    sorted.length === 0
      ? false
      : selectedOnPage === sorted.length
        ? true
        : selectedOnPage > 0
          ? "indeterminate"
          : false

  const copyStockLine = React.useCallback(async (v: MerchandisingVehicle) => {
    const line = `${stockLabel(v)} • ${listingCorrelationId(v)}`
    try {
      await navigator.clipboard.writeText(line)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-md border border-spyne-border bg-spyne-surface">
      {title ? (
        <div className="border-b border-spyne-border px-4 py-3">
          <h3 className="text-sm font-semibold text-spyne-text">{title}</h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-sm text-spyne-text">
          <thead>
            <tr className="border-b border-spyne-border bg-muted/20 text-left">
              <th className="w-12 py-2.5 pl-4 pr-2 align-middle">
                <Checkbox
                  checked={headerChecked}
                  onCheckedChange={(c) => {
                    if (c === true) {
                      setSelected(new Set(sorted.map((v) => v.vin)))
                    } else {
                      setSelected(new Set())
                    }
                  }}
                  aria-label="Select all vehicles"
                />
              </th>
              <VehicleTableSortHeader
                columnKey="vehicle"
                activeKey={sort.key}
                dir={sort.dir}
                icon="directions_car"
                label="Vehicle"
                onSort={handleSort}
                className="pl-3 pr-2"
              />
              <VehicleTableSortHeader
                columnKey="lastUpdated"
                activeKey={sort.key}
                dir={sort.dir}
                icon="schedule"
                label="Last updated"
                onSort={handleSort}
                className="px-3 whitespace-nowrap"
              />
              <VehicleTableSortHeader
                columnKey="review"
                activeKey={sort.key}
                dir={sort.dir}
                icon="rate_review"
                label="Review"
                onSort={handleSort}
                className="px-3"
              />
              <VehicleTableSortHeader
                columnKey="publication"
                activeKey={sort.key}
                dir={sort.dir}
                icon="newspaper"
                label="Publication"
                onSort={handleSort}
                className="px-3"
              />
              <th
                scope="col"
                className="border-l border-spyne-border py-2.5 pl-3 pr-3 text-right align-middle w-[140px]"
              >
                <span className="inline-flex items-center justify-end gap-1.5 text-[10px] font-medium uppercase tracking-widest text-spyne-text-secondary">
                  <MaterialSymbol name="more_horiz" size={16} className="shrink-0 opacity-90" aria-hidden />
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v) => {
              const hasIssue =
                v.mediaStatus === "no-photos" ||
                v.mediaStatus === "stock-photos" ||
                v.listingScore < 50
              const updated = getListingUpdatedAt(v)
              const specLine = [
                v.bodyStyle ?? inferBodyStyle(v.model),
                v.exteriorColor ?? pseudoExteriorColor(v.vin),
                v.fuelType ?? "Petrol",
              ].join(" • ")

              return (
                <tr
                  key={v.vin}
                  className={cn(
                    "border-b border-spyne-border transition-colors hover:bg-muted/30",
                    hasIssue && "bg-muted/10"
                  )}
                >
                  <td
                    className={cn(
                      "align-top py-3 pl-4 pr-2",
                      hasIssue && spyneComponentClasses.overviewIssueRowAccent
                    )}
                  >
                    <Checkbox
                      checked={selected.has(v.vin)}
                      onCheckedChange={(c) => toggleOne(v.vin, c === true)}
                      aria-label={`Select ${v.year} ${v.make} ${v.model}`}
                    />
                  </td>

                  <td className="border-l border-spyne-border py-3 pl-4 pr-4 align-top">
                    <div className="flex min-w-0 items-stretch gap-3">
                      {/* Stretched height matches text block; aspect-video sets width from that height (16:9) */}
                      <div
                        className={cn(
                          "relative shrink-0 self-stretch overflow-hidden rounded-md bg-muted",
                          "aspect-video min-h-[4.5rem] min-w-0"
                        )}
                      >
                        {v.thumbnailUrl ? (
                          <img
                            src={v.thumbnailUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full min-h-[4.5rem] w-full items-center justify-center text-spyne-text-secondary">
                            <MaterialSymbol name="photo_camera" size={24} />
                          </div>
                        )}
                        <span
                          className={cn(
                            "absolute left-1 top-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white",
                            v.isNew ? "bg-spyne-primary" : "bg-spyne-info"
                          )}
                        >
                          {v.isNew ? "New" : "Pre owned"}
                        </span>
                        {v.photoCount > 0 ? (
                          <span className="absolute bottom-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white/95 px-1 text-[11px] font-semibold tabular-nums text-spyne-text shadow-sm">
                            {v.photoCount}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex min-w-0 flex-1 gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-spyne-text-secondary">
                            <span className="tabular-nums">
                              {stockLabel(v)} • {listingCorrelationId(v)}
                            </span>
                            <button
                              type="button"
                              onClick={() => void copyStockLine(v)}
                              className="inline-flex rounded p-0.5 text-spyne-primary hover:bg-spyne-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30"
                              aria-label="Copy stock and listing id"
                            >
                              <MaterialSymbol name="content_copy" size={14} />
                            </button>
                          </div>
                          <p className="mt-0.5 truncate font-semibold text-spyne-text">
                            {v.year} {v.make} {v.model}
                          </p>
                          <p className="mt-0.5 text-xs text-spyne-text-secondary">{specLine}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs text-spyne-text-secondary">
                            <MaterialSymbol name="speed" size={14} className="text-spyne-text-secondary" />
                            <span className="tabular-nums">
                              {formatOdometer(v.odometer)} miles
                            </span>
                            <span className="text-spyne-border" aria-hidden>
                              |
                            </span>
                            <span className="tabular-nums font-medium text-spyne-text">
                              {formatPrice(v.price)}
                            </span>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-1 pt-0.5">
                          <button
                            type="button"
                            className="inline-flex rounded p-1 text-spyne-primary hover:bg-spyne-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30"
                            aria-label="Download assets"
                          >
                            <MaterialSymbol name="download" size={20} />
                          </button>
                          <button
                            type="button"
                            className="inline-flex rounded p-1 text-spyne-primary hover:bg-spyne-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30"
                            aria-label="Open listing"
                          >
                            <MaterialSymbol name="public" size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="border-l border-spyne-border py-3 px-4 align-top whitespace-nowrap">
                    <p className="text-sm text-spyne-text">
                      {Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }).format(updated)}
                    </p>
                    <p className="mt-0.5 text-xs text-spyne-text-secondary">
                      {formatDistanceToNowStrict(updated, { addSuffix: true })}
                    </p>
                  </td>

                  <td className="border-l border-spyne-border py-3 px-4 align-top">
                    <ReviewStack v={v} />
                  </td>

                  <td className="border-l border-spyne-border py-3 px-4 align-top">
                    <StudioPublishCell publishStatus={v.publishStatus} />
                  </td>

                  <td className="border-l border-spyne-border py-3 pl-4 pr-2 align-top">
                    <div className="flex items-start justify-end gap-1">
                      <Link
                        href={`/max-2/studio/inventory?vin=${encodeURIComponent(v.vin)}`}
                        className="inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-spyne-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30 rounded-sm"
                      >
                        View details
                        <MaterialSymbol name="arrow_forward" size={14} />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-spyne-text-secondary hover:bg-muted hover:text-spyne-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30"
                            aria-label="Row actions"
                          >
                            <MaterialSymbol name="more_vert" size={20} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault()
                              void copyStockLine(v)
                            }}
                          >
                            Copy stock line
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/max-2/studio/inventory?vin=${encodeURIComponent(v.vin)}`}>
                              Open details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
