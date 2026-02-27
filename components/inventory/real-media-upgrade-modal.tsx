"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StageBadge } from "./stage-badge"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import {
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Sparkles,
  Upload,
  Smartphone,
  Image,
  Loader2,
  Award,
  MousePointerClick,
  CirclePlay,
  Aperture,
  MonitorSmartphone,
} from "lucide-react"

interface RealMediaUpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: VehicleDetail | null
}

type UpgradeMethod = "upload" | "shoot-from-app"

export function RealMediaUpgradeModal({ open, onOpenChange, vehicle }: RealMediaUpgradeModalProps) {
  const [step, setStep] = React.useState(1)
  const [selectedMethod, setSelectedMethod] = React.useState<UpgradeMethod>("shoot-from-app")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setStep(1)
      setSelectedMethod("shoot-from-app")
    }
  }, [open])

  if (!vehicle) return null

  const totalSteps = 4

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(4)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden">
        {/* Progress */}
        <div className="flex h-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 transition-all duration-300",
                i < step ? "bg-violet-500" : "bg-gray-100"
              )}
            />
          ))}
        </div>

        <div className="p-6">
          {/* ── Step 1: Why upgrade — side-by-side comparison ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-violet-600" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">Upgrade to Real Media</DialogTitle>
                  <DialogDescription className="text-sm">
                    Replace AI Instant with real photos for maximum performance
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Vehicle context */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <div className="w-14 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <StageBadge stage={vehicle.stage} size="sm" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-violet-100 text-violet-700">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI Instant — Phase 1
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {vehicle.daysInStock}d in stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Before / After */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Now: AI Instant</p>
                  </div>
                  <div className="w-full h-16 rounded-lg bg-gray-200 flex items-center justify-center mb-3">
                    <span className="text-[10px] text-gray-500 font-mono">CLONE</span>
                  </div>
                  <div className="space-y-1.5">
                    <ComparisonRow label="CTR" value={`${vehicle.ctr}%`} />
                    <ComparisonRow label="Leads" value={vehicle.leads.toString()} />
                    <ComparisonRow label="Turn Speed" value="Baseline" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 relative">
                  <div className="absolute -top-2.5 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      UPGRADE
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Camera className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Real Media</p>
                  </div>
                  <div className="w-full h-16 rounded-lg bg-emerald-100 flex items-center justify-center mb-3 border border-emerald-200">
                    <Camera className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <ComparisonRow label="CTR" value={`${(vehicle.ctr * 1.24).toFixed(1)}%`} delta="+24%" highlight />
                    <ComparisonRow label="Leads" value={Math.round(vehicle.leads * 1.24).toString()} delta="+24%" highlight />
                    <ComparisonRow label="Turn Speed" value="18% faster" highlight />
                  </div>
                </div>
              </div>

              <Button className="w-full h-11 bg-violet-600 hover:bg-violet-700" onClick={() => setStep(2)}>
                I&apos;m Ready to Upgrade
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* ── Step 2: Two real options — Upload or Shoot from App ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">How Do You Want to Capture?</DialogTitle>
                  <DialogDescription>Two ways to get real photos for this vehicle</DialogDescription>
                </DialogHeader>
              </div>

              <div className="space-y-3">
                {/* Option A — Shoot from Spyne App */}
                <button
                  onClick={() => setSelectedMethod("shoot-from-app")}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border-2 transition-all",
                    selectedMethod === "shoot-from-app"
                      ? "bg-violet-50 border-violet-300 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-2.5 rounded-xl flex-shrink-0",
                      selectedMethod === "shoot-from-app" ? "bg-violet-100" : "bg-gray-50"
                    )}>
                      <Smartphone className={cn("h-6 w-6", selectedMethod === "shoot-from-app" ? "text-violet-600" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={cn("text-sm font-bold", selectedMethod === "shoot-from-app" ? "text-violet-700" : "text-foreground")}>
                          Shoot from Spyne App
                        </p>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500 text-white">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        Open the Spyne mobile app, use guided capture mode to shoot this VIN.
                        AI auto-enhances to studio quality in real-time.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Aperture className="h-3 w-3 text-violet-500" />
                          Guided capture
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Sparkles className="h-3 w-3 text-violet-500" />
                          Auto AI enhance
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 text-violet-500" />
                          Live in minutes
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1",
                      selectedMethod === "shoot-from-app" ? "border-violet-500 bg-violet-500" : "border-gray-300"
                    )}>
                      {selectedMethod === "shoot-from-app" && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </button>

                {/* Option B — Upload existing images */}
                <button
                  onClick={() => setSelectedMethod("upload")}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border-2 transition-all",
                    selectedMethod === "upload"
                      ? "bg-blue-50 border-blue-300 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-2.5 rounded-xl flex-shrink-0",
                      selectedMethod === "upload" ? "bg-blue-100" : "bg-gray-50"
                    )}>
                      <Upload className={cn("h-6 w-6", selectedMethod === "upload" ? "text-blue-600" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-bold mb-1", selectedMethod === "upload" ? "text-blue-700" : "text-foreground")}>
                        Upload Existing Images
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        Already have photos? Upload them here. Spyne AI automatically
                        enhances backgrounds, lighting, and consistency to studio grade.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Upload className="h-3 w-3 text-blue-500" />
                          Drag &amp; drop
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Sparkles className="h-3 w-3 text-blue-500" />
                          AI background swap
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 text-blue-500" />
                          Live in hours
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1",
                      selectedMethod === "upload" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    )}>
                      {selectedMethod === "upload" && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11 gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button className="flex-1 h-11 bg-violet-600 hover:bg-violet-700" onClick={() => setStep(3)}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Method-specific flow + impact + confirm ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">
                    {selectedMethod === "shoot-from-app" ? "Shoot & Go Live" : "Upload & Enhance"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedMethod === "shoot-from-app"
                      ? "Follow the guided capture flow in the Spyne app"
                      : "Upload your images and Spyne AI handles the rest"
                    }
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Method-specific step-by-step */}
              <div className="p-4 rounded-xl bg-gray-50 border space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">How it works</p>

                {selectedMethod === "shoot-from-app" ? (
                  <div className="space-y-3">
                    <StepItem
                      num="1"
                      title="Open Spyne App on your phone"
                      description="Select this VIN or scan the barcode on the lot"
                    />
                    <StepItem
                      num="2"
                      title="Follow guided capture mode"
                      description="The app guides you through each angle — exterior, interior, details"
                    />
                    <StepItem
                      num="3"
                      title="AI enhances in real-time"
                      description="Background swap, lighting correction, and studio-grade output — automatic"
                    />
                    <StepItem
                      num="4"
                      title="Real Media goes live"
                      description="Replaces AI Instant on all channels. Campaign boost multiplier activates."
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <StepItem
                      num="1"
                      title="Upload your photos"
                      description="Drag and drop or select files — exterior, interior, and detail shots"
                    />
                    <StepItem
                      num="2"
                      title="Spyne AI enhances automatically"
                      description="Background swap, color correction, consistency — studio quality in minutes"
                    />
                    <StepItem
                      num="3"
                      title="Review & approve"
                      description="Preview enhanced images before they go live"
                    />
                    <StepItem
                      num="4"
                      title="Real Media goes live"
                      description="Replaces AI Instant on all channels. Campaign boost multiplier activates."
                    />
                  </div>
                )}
              </div>

              {/* Expected impact */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-lg font-bold text-emerald-800">+24%</p>
                  <p className="text-[10px] text-emerald-600">More Leads</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <Clock className="h-4 w-4 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-lg font-bold text-blue-800">18%</p>
                  <p className="text-[10px] text-blue-600">Faster Turns</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 text-center">
                  <DollarSign className="h-4 w-4 text-violet-600 mx-auto mb-1.5" />
                  <p className="text-lg font-bold text-violet-800">
                    ${Math.round(Math.max(0, vehicle.marginRemaining) * 0.18).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-violet-600">Margin Saved</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-violet-50 border border-violet-100 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-violet-600 flex-shrink-0" />
                <p className="text-xs text-violet-700">
                  <span className="font-semibold">Timeline:</span>{" "}
                  {selectedMethod === "shoot-from-app"
                    ? "Real Media goes live within minutes of completing the capture"
                    : "Spyne AI enhances and publishes within 2–4 hours of upload"
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11 gap-2" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 h-11 bg-violet-600 hover:bg-violet-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : selectedMethod === "shoot-from-app" ? (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Open Spyne App
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Start Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 4: Success — method-specific confirmation ── */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>

              {selectedMethod === "shoot-from-app" ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Spyne App Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Open the Spyne app on your phone to start the guided capture for this VIN.
                    Real Media will go live automatically once the shoot is complete.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Upload Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your photos below, or select files from your computer.
                    Spyne AI will enhance them to studio quality automatically.
                  </p>
                </div>
              )}

              {/* Upload dropzone placeholder (for upload method) */}
              {selectedMethod === "upload" && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-violet-400 hover:bg-violet-50/30 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Drop photos here</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse · JPG, PNG · Up to 50 images</p>
                </div>
              )}

              {/* App deep-link placeholder (for shoot method) */}
              {selectedMethod === "shoot-from-app" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50 border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold">Spyne Capture</p>
                      <p className="text-xs text-muted-foreground">VIN: {vehicle.vin.slice(-8)} loaded</p>
                    </div>
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700 gap-1.5">
                      <MonitorSmartphone className="h-3.5 w-3.5" />
                      Open App
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Don&apos;t have the app?{" "}
                    <button className="text-primary font-medium hover:underline">Send download link</button>
                  </p>
                </div>
              )}

              {/* What to expect */}
              <div className="p-4 rounded-xl bg-gray-50 border space-y-2 text-left">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">After completion</p>
                <div className="space-y-2">
                  {[
                    "Real photos replace AI Instant media on all channels",
                    "Campaign boost multiplier activates automatically",
                    "Expected +24% lead lift and 18% faster turns",
                    "Track status on the VIN detail page",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => onOpenChange(false)}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComparisonRow({
  label, value, delta, highlight,
}: {
  label: string; value: string; delta?: string; highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={cn("text-xs font-bold tabular-nums", highlight ? "text-emerald-700" : "text-foreground")}>{value}</span>
        {delta && <span className="text-[10px] font-semibold text-emerald-600">{delta}</span>}
      </div>
    </div>
  )
}

function StepItem({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-[10px] font-bold text-violet-700">
        {num}
      </span>
      <div>
        <p className="text-xs font-semibold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
