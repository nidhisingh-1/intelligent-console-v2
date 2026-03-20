"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  VINHeader,
  CapitalMeterCard,
  VelocityCard,
  PerformanceCard,
  ActionPanel,
  IfSoldToday,
  WhatIfNothing,
  MediaLifecycle,
  VelocityTimeline,
  CampaignActivationModal,
  CampaignPerformanceModal,
  RealMediaUpgradeModal,
  RealMediaUpgrade,
  WebsiteHealthCard,
  AISuggestion,
  getVehicleAISuggestion,
} from "@/components/inventory"
import { getMockVehicleWebsiteHealth } from "@/lib/inventory-mocks"
import { useVehicleDetail, useVehicleMedia } from "@/hooks/use-vehicles"
import type { CampaignActivation } from "@/services/inventory/inventory.types"
import { Loader2 } from "lucide-react"

export default function VINDetailPage() {
  const params = useParams()
  const vin = params.vin as string
  const { vehicle, loading, error } = useVehicleDetail(vin)
  const { media } = useVehicleMedia(vin)

  const [campaignModal, setCampaignModal] = React.useState<{
    open: boolean
    data: CampaignActivation | null
  }>({ open: false, data: null })

  const [mediaUpgradeOpen, setMediaUpgradeOpen] = React.useState(false)
  const [performanceModalOpen, setPerformanceModalOpen] = React.useState(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    const scrollContainer = document.querySelector('[data-slot="scroll-root"]')
    if (scrollContainer) scrollContainer.scrollTop = 0
  }, [vin])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <div>
            <p className="text-sm font-medium">Loading vehicle details...</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{vin}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-foreground">Vehicle Not Found</p>
          <p className="text-sm text-muted-foreground">
            No vehicle with VIN <span className="font-mono">{vin}</span> was found in inventory.
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
        </div>
      </div>
    )
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const vehicleImages = media?.images?.map((img) => img.url) ?? []

  const handleAccelerate = () => {
    setCampaignModal({
      open: true,
      data: {
        vin: vehicle.vin,
        marginRemaining: vehicle.marginRemaining,
        estimatedLeadLift: Math.round(Math.random() * 8 + 4),
        estimatedLeadLiftPercent: Math.round(Math.random() * 30 + 20),
        estimatedMarginProtection: Math.round(Math.max(0, vehicle.marginRemaining) * 0.6),
        estimatedDaysSaved: Math.round(Math.random() * 6 + 3),
      },
    })
  }

  const handleUpgradeMedia = () => {
    setMediaUpgradeOpen(true)
  }

  return (
    <div className="space-y-0">
      {/* VIN Header with images */}
      <div className="border-b bg-white px-6 py-5">
        <VINHeader vehicle={vehicle} images={vehicleImages} media={media} />
      </div>

      {/* AI Recommendation */}
      <div className="px-6 pt-4">
        <AISuggestion
          {...getVehicleAISuggestion(vehicle)}
          onAction={
            vehicle.stage === "critical" || (vehicle.stage === "risk" && vehicle.campaignStatus === "none")
              ? handleAccelerate
              : vehicle.mediaType !== "real" && vehicle.stage !== "fresh"
                ? handleUpgradeMedia
                : undefined
          }
        />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Capital + Performance + Website Health + Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <CapitalMeterCard vehicle={vehicle} />
            <PerformanceCard vehicle={vehicle} />
            <WebsiteHealthCard health={getMockVehicleWebsiteHealth(vehicle)} />
            <VelocityTimeline vehicle={vehicle} />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <VelocityCard vehicle={vehicle} />
            <IfSoldToday vehicle={vehicle} />
            <MediaLifecycle vehicle={vehicle} onUpgradeMedia={handleUpgradeMedia} />
            <ActionPanel
              vehicle={vehicle}
              onAccelerate={handleAccelerate}
              onUpgradeMedia={handleUpgradeMedia}
              onViewPerformance={() => setPerformanceModalOpen(true)}
            />
            {vehicle.stage !== "fresh" && (
              <WhatIfNothing vehicle={vehicle} />
            )}
            {vehicle.mediaType !== "real" && (
              <RealMediaUpgrade onUpgrade={handleUpgradeMedia} />
            )}
          </div>
        </div>
      </div>

      {/* Campaign Activation Modal */}
      <CampaignActivationModal
        open={campaignModal.open}
        onOpenChange={(open) => setCampaignModal((s) => ({ ...s, open }))}
        data={campaignModal.data}
        vehicleName={vehicleName}
        stage={vehicle.stage}
        daysInStock={vehicle.daysInStock}
        dailyBurn={vehicle.dailyBurn}
      />

      {/* Real Media Upgrade Modal */}
      <RealMediaUpgradeModal
        open={mediaUpgradeOpen}
        onOpenChange={setMediaUpgradeOpen}
        vehicle={vehicle}
      />

      {/* Campaign Performance Modal */}
      <CampaignPerformanceModal
        open={performanceModalOpen}
        onOpenChange={setPerformanceModalOpen}
        vehicleName={vehicleName}
        channelType="both"
        daysActive={Math.max(1, Math.min(vehicle.daysInStock - 2, 12))}
      />
    </div>
  )
}
