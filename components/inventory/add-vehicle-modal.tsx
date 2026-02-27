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
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Car,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Upload,
  Sparkles,
  CheckCircle2,
  Loader2,
  Search,
} from "lucide-react"

type PhotoMethod = "app" | "upload" | "clone"

interface AddVehicleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (vin: string, method: PhotoMethod) => void
}

const PHOTO_METHODS: {
  id: PhotoMethod
  name: string
  description: string
  icon: React.ReactNode
  tag?: string
  color: string
  bgColor: string
  borderColor: string
}[] = [
  {
    id: "app",
    name: "Capture with App",
    description: "Use the Spyne mobile app to take studio-quality photos on your lot in minutes.",
    icon: <Smartphone className="h-5 w-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "upload",
    name: "Upload Photos",
    description: "Upload existing photos from your computer or photo library.",
    icon: <Upload className="h-5 w-5" />,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    id: "clone",
    name: "AI VIN Cloning",
    description: "Go live instantly — AI generates listing-ready media from the VIN. Upgrade to real photos later.",
    icon: <Sparkles className="h-5 w-5" />,
    tag: "FASTEST",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
  },
]

function formatVIN(value: string): string {
  return value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "").slice(0, 17)
}

export function AddVehicleModal({ open, onOpenChange, onComplete }: AddVehicleModalProps) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1)
  const [vin, setVin] = React.useState("")
  const [selectedMethod, setSelectedMethod] = React.useState<PhotoMethod | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setStep(1)
      setVin("")
      setSelectedMethod(null)
      setIsSubmitting(false)
    }
  }, [open])

  React.useEffect(() => {
    if (open && step === 1) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, step])

  const vinValid = vin.length === 17

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVin(formatVIN(e.target.value))
  }

  const handleContinueToPhotos = () => {
    if (vinValid) setStep(2)
  }

  const handleConfirm = () => {
    if (!selectedMethod) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(3)
    }, 1500)
  }

  const handleDone = () => {
    if (selectedMethod) onComplete(vin, selectedMethod)
    onOpenChange(false)
  }

  const methodLabel =
    selectedMethod === "app" ? "Capture with App" :
    selectedMethod === "upload" ? "Upload Photos" :
    selectedMethod === "clone" ? "AI VIN Cloning" : ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Progress bar */}
        <div className="flex h-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 transition-all duration-300",
                s <= step ? "bg-primary" : "bg-gray-100"
              )}
            />
          ))}
        </div>

        <div className="p-6">
          {/* ── Step 1: VIN Entry ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">Add a Vehicle</DialogTitle>
                  <DialogDescription>
                    Enter the 17-character VIN to get started.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    placeholder="e.g. 1HGCG5655WA042761"
                    value={vin}
                    onChange={handleVinChange}
                    onKeyDown={(e) => e.key === "Enter" && handleContinueToPhotos()}
                    className="pl-9 h-11 font-mono tracking-wider text-sm"
                    maxLength={17}
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs text-muted-foreground">
                    {vin.length}/17 characters
                  </p>
                  {vinValid && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Valid length
                    </span>
                  )}
                </div>
              </div>

              {vin.length > 0 && vin.length < 17 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-700">
                    A VIN must be exactly 17 characters. Check the driver-side door jamb or vehicle registration.
                  </p>
                </div>
              )}

              <Button
                className="w-full h-11"
                disabled={!vinValid}
                onClick={handleContinueToPhotos}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* ── Step 2: Photo Method ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">How would you like to add photos?</DialogTitle>
                  <DialogDescription>
                    Choose how to create listing media for <span className="font-mono text-foreground text-xs">{vin}</span>
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="space-y-2.5">
                {PHOTO_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all",
                      selectedMethod === m.id
                        ? `${m.bgColor} ${m.borderColor} shadow-sm`
                        : "bg-white border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg flex-shrink-0",
                        selectedMethod === m.id ? m.bgColor : "bg-gray-50"
                      )}>
                        <span className={selectedMethod === m.id ? m.color : "text-muted-foreground"}>
                          {m.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={cn("text-sm font-bold", selectedMethod === m.id ? m.color : "text-foreground")}>
                            {m.name}
                          </p>
                          {m.tag && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500 text-white">
                              {m.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{m.description}</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1",
                        selectedMethod === m.id
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      )}>
                        {selectedMethod === m.id && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11 gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 h-11"
                  disabled={!selectedMethod}
                  onClick={handleConfirm}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding…
                    </>
                  ) : (
                    <>
                      Add Vehicle
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Success ── */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Vehicle Added</h3>
                <p className="text-muted-foreground text-sm">
                  <span className="font-mono text-foreground">{vin}</span> has been added to your inventory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border text-left space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What happens next</p>
                <div className="space-y-2">
                  {selectedMethod === "clone" && [
                    "AI is generating listing-ready media from the VIN",
                    "Vehicle will appear on your lot in ~2 minutes",
                    "Upgrade to real photos anytime for higher conversion",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                  {selectedMethod === "app" && [
                    "Open the Spyne app and scan the VIN barcode",
                    "Follow the guided photo walkthrough on your lot",
                    "Photos sync automatically — vehicle goes live in minutes",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                  {selectedMethod === "upload" && [
                    "Upload your photos from the media manager",
                    "AI enhances and formats images for all listing platforms",
                    "Vehicle goes live once photos are processed",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  Media method: <span className="font-semibold text-foreground">{methodLabel}</span>
                </p>
              </div>

              <Button className="w-full h-11" onClick={handleDone}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
