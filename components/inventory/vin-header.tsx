"use client"

import * as React from "react"
import Link from "next/link"
import { StageBadge } from "./stage-badge"
import { Button } from "@/components/ui/button"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import type { VehicleMediaResponse } from "@/services/inventory/inventory-api"
import { ArrowLeft, ExternalLink, Clock, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface VINHeaderProps {
  vehicle: VehicleDetail
  images?: string[]
  media?: VehicleMediaResponse | null
}

export function VINHeader({ vehicle, images = [], media }: VINHeaderProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const allImages = images
  const mediaImages = media?.images ?? []

  const handlePrev = () => setActiveIndex((i) => (i > 0 ? i - 1 : allImages.length - 1))
  const handleNext = () => setActiveIndex((i) => (i < allImages.length - 1 ? i + 1 : 0))

  return (
    <div className="flex items-start gap-6">
      {/* Back + Image Gallery */}
      <div className="flex-shrink-0">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inventory
        </Link>

        {allImages.length > 0 ? (
          <div className="space-y-2">
            <div className="relative w-64 h-44 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden group">
              <img
                src={allImages[activeIndex]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera className="h-3 w-3" />
                {activeIndex + 1}/{allImages.length}
              </div>
              {mediaImages[activeIndex]?.label && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {mediaImages[activeIndex].label}
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-1.5">
                {allImages.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "w-11 h-8 rounded-md overflow-hidden border-2 transition-all",
                      activeIndex === i ? "border-primary ring-1 ring-primary/30" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
                {allImages.length > 5 && (
                  <div className="w-11 h-8 rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                    +{allImages.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-64 h-44 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground/40 mx-auto mb-1" />
              <span className="text-xs text-muted-foreground">No images</span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <StageBadge stage={vehicle.stage} size="lg" />
            </div>
            <p className="text-muted-foreground">
              {vehicle.trim} · <span className="font-mono text-xs">{vehicle.vin}</span>
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-semibold text-foreground">{vehicle.daysInStock}</span> days in stock
              </div>
              <div className="text-sm text-muted-foreground">
                Acquired <span className="font-medium text-foreground">
                  {new Date(vehicle.acquisitionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {media && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Camera className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">{media.total_images}</span> photos
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 font-medium">
                    {media.media_type === "real" ? "Real Media" : "AI Instant"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            View Listing
          </Button>
        </div>
      </div>
    </div>
  )
}
