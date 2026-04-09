"use client"

import * as React from "react"
import Link from "next/link"
import { mockMerchandisingVehicles } from "@/lib/max-2-mocks"
import type { MerchandisingVehicle } from "@/services/max-2/max-2.types"
import { cn } from "@/lib/utils"
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
  if (/f-150|silverado|sierra|tacoma|tundra|1500|2500|ranger|frontier|pickup|ram/.test(m)) return "Truck"
  if (/cr-v|rav4|pilot|highlander|explorer|equinox|tucson|tiguan|cx-|escape|rogue|pathfinder|telluride|palisade|outback|forester|wrangler|bronco|durango|traverse|blazer|edge|tahoe|yukon|suburban|expedition|sequoia|4runner/.test(m)) return "SUV"
  return "Sedan"
}

function stockLabel(v: MerchandisingVehicle): string {
  if (v.stockNumber) return v.stockNumber
  const n = v.vin.replace(/\D/g, "")
  return n ? `STK${n.slice(0, 3)}` : `STK${v.vin.slice(0, 3)}`
}

function listingCorrelationId(v: MerchandisingVehicle): string {
  if (v.listingExternalId) return v.listingExternalId
  const raw = `${v.vin}STUDIO`.toUpperCase().replace(/[^A-Z0-9]/g, "")
  const chunk = raw + raw
  return chunk.slice(0, 16)
}

function ReviewStatusBadge({ v }: { v: MerchandisingVehicle }) {
  const copyNeedsReview = !v.hasDescription
  const vehicleNeedsReview = v.mediaStatus !== "real-photos" || v.incompletePhotoSet || v.wrongHeroAngle
  const needsReview = copyNeedsReview || vehicleNeedsReview

  if (!needsReview) {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#DAF5E8", color: "#008743" }}>
        Ready
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#FEF3C7", color: "#B45309" }}>
      In Review
    </span>
  )
}

function PublishStateBadge({ status }: { status: MerchandisingVehicle["publishStatus"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#F2F0FA", color: "#3700BF" }}>
        Published
      </span>
    )
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#E2F4FF", color: "#4D7FFF" }}>
        Pending
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#F1F1F5", color: "#3C4464" }}>
      Not Published
    </span>
  )
}

function ImagePreviewCell({ v }: { v: MerchandisingVehicle }) {
  const [hovered, setHovered] = React.useState(false)
  const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const cellRef = React.useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (!cellRef.current) return
    const rect = cellRef.current.getBoundingClientRect()
    setPos({
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.right + window.scrollX + 12,
    })
    setHovered(true)
  }

  return (
    <div
      ref={cellRef}
      className="relative aspect-[4/3] w-14 overflow-hidden rounded bg-gray-100 shrink-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {v.thumbnailUrl ? (
        <img src={v.thumbnailUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <MaterialSymbol name="photo_camera" size={22} />
        </div>
      )}
      {v.photoCount > 0 && (
        <span className="absolute bottom-0.5 right-0.5 rounded bg-white/90 px-1 text-[10px] font-semibold tabular-nums text-gray-700 shadow-sm">
          {v.photoCount}
        </span>
      )}

      {hovered && v.thumbnailUrl && typeof document !== "undefined" && (
        <ImagePreviewPortal src={v.thumbnailUrl} top={pos.top} left={pos.left} />
      )}
    </div>
  )
}

function ImagePreviewPortal({ src, top, left }: { src: string; top: number; left: number }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const { createPortal } = require("react-dom")
  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{ top, left, transform: "translateY(-50%)" }}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)]"
        style={{ width: 280 }}
      >
        <img src={src} alt="" className="h-auto w-full object-cover" style={{ aspectRatio: "4/3" }} />
      </div>
    </div>,
    document.body
  )
}

interface VehicleMediaTableProps {
  vehicles?: MerchandisingVehicle[]
  title?: string
}

export function VehicleMediaTable({ vehicles, title }: VehicleMediaTableProps) {
  const data = vehicles ?? mockMerchandisingVehicles

  const [selected, setSelected] = React.useState<Set<string>>(() => new Set())

  const toggleOne = React.useCallback((vin: string, next: boolean) => {
    setSelected((prev) => {
      const n = new Set(prev)
      if (next) n.add(vin)
      else n.delete(vin)
      return n
    })
  }, [])

  const selectedOnPage = data.filter((v) => selected.has(v.vin)).length
  const headerChecked =
    data.length === 0 ? false
    : selectedOnPage === data.length ? true
    : selectedOnPage > 0 ? "indeterminate"
    : false

  const copyStockLine = React.useCallback(async (v: MerchandisingVehicle) => {
    const line = `${stockLabel(v)} • ${listingCorrelationId(v)}`
    try { await navigator.clipboard.writeText(line) } catch { /* ignore */ }
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {title ? (
        <div className="border-b border-gray-200 px-5 py-3.5">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-10 py-3 pl-4 pr-3 align-middle">
                <Checkbox
                  checked={headerChecked}
                  onCheckedChange={(c) =>
                    c === true
                      ? setSelected(new Set(data.map((v) => v.vin)))
                      : setSelected(new Set())
                  }
                  aria-label="Select all vehicles"
                />
              </th>
              {/* Stock Image — no label, just the col width */}
              <th className="w-20 py-3 pr-3 align-middle" />
              <th className="py-3 pr-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-gray-500">
                Vehicle
              </th>
              <th className="py-3 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap">
                Stock #
              </th>
              <th className="py-3 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="py-3 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap">
                Publish State
              </th>
              <th className="py-3 px-4 text-center align-middle text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap">
                Age
              </th>
              <th className="py-3 px-4 text-right align-middle text-xs font-medium uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="py-3 pl-4 pr-5 text-right align-middle text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {data.map((v) => {
              const specLine = [
                v.isNew ? "New" : "Pre-Owned",
                formatOdometer(v.odometer) + " mi",
              ].join(" • ")
              const bodyStyle = v.bodyStyle ?? inferBodyStyle(v.model)

              return (
                <tr
                  key={v.vin}
                  className="group cursor-pointer bg-white transition-colors hover:bg-gray-50"
                  onClick={() => window.location.href = `/max-2/studio/inventory?vin=${encodeURIComponent(v.vin)}`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-4 pr-3 align-middle">
                    <Checkbox
                      checked={selected.has(v.vin)}
                      onCheckedChange={(c) => toggleOne(v.vin, c === true)}
                      aria-label={`Select ${v.year} ${v.make} ${v.model}`}
                    />
                  </td>

                  {/* Stock Image */}
                  <td className="py-3 pr-3 align-middle">
                    <ImagePreviewCell v={v} />
                  </td>

                  {/* Vehicle */}
                  <td className="py-3.5 pr-4 align-middle">
                    <p className="font-semibold text-gray-900">
                      {v.year} {v.make} {v.model}
                      {v.trim ? ` ${v.trim}` : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {bodyStyle} • {specLine}
                    </p>
                  </td>

                  {/* Stock # */}
                  <td className="py-3.5 px-4 align-middle">
                    <span className="font-['Inter',ui-sans-serif,system-ui,sans-serif] text-sm text-gray-700">{stockLabel(v)}</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 align-middle">
                    <ReviewStatusBadge v={v} />
                  </td>

                  {/* Publish State */}
                  <td className="py-3.5 px-4 align-middle">
                    <PublishStateBadge status={v.publishStatus} />
                  </td>

                  {/* Days in Stock */}
                  <td className="py-3.5 px-4 align-middle text-center">
                    <span
                      className={cn(
                        "text-sm font-medium tabular-nums",
                        v.daysInStock >= 45 ? "text-red-600" : "text-[#333333]"
                      )}
                    >
                      {v.daysInStock} <span className="font-medium">days</span>
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 align-middle text-right">
                    <span className="text-sm font-medium tabular-nums text-[#333333]">
                      {formatPrice(v.price)}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 pl-4 pr-5 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spyne-primary/30"
                            aria-label="Row actions"
                          >
                            <MaterialSymbol name="more_vert" size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[180px]">
                          <DropdownMenuItem
                            onSelect={(e) => { e.preventDefault(); void copyStockLine(v) }}
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
