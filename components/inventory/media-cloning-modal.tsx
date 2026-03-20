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
  Copy,
  Plus,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Image,
  ChevronLeft,
  ChevronRight,
  Info,
  Eye,
  PlusCircle,
  LayoutGrid,
  Monitor,
  Play,
  RotateCw,
  Car,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Ban,
  TrendingDown,
} from "lucide-react"

interface MediaCloningModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleCount?: number
}

type BackgroundCategory = "custom" | "turntable" | "showroom" | "outdoor"

interface BackgroundOption {
  id: string
  label: string
  category: BackgroundCategory
  color: string
}

const BACKGROUNDS: BackgroundOption[] = [
  { id: "FF1101", label: "FF1101", category: "turntable", color: "bg-gray-100" },
  { id: "FF1102", label: "FF1102", category: "turntable", color: "bg-gray-50" },
  { id: "FF1103", label: "FF1103", category: "turntable", color: "bg-slate-100" },
  { id: "FF1104", label: "FF1104", category: "turntable", color: "bg-zinc-100" },
  { id: "FF1105", label: "FF1105", category: "turntable", color: "bg-neutral-100" },
  { id: "FF1106", label: "FF1106", category: "turntable", color: "bg-stone-100" },
  { id: "FF1107", label: "FF1107", category: "turntable", color: "bg-gray-100" },
  { id: "FF1108", label: "FF1108", category: "turntable", color: "bg-gray-50" },
  { id: "FF1109", label: "FF1109", category: "turntable", color: "bg-slate-100" },
  { id: "FF1110", label: "FF1110", category: "turntable", color: "bg-zinc-100" },
  { id: "SH2001", label: "SH2001", category: "showroom", color: "bg-amber-50" },
  { id: "SH2002", label: "SH2002", category: "showroom", color: "bg-amber-100" },
  { id: "SH2003", label: "SH2003", category: "showroom", color: "bg-yellow-50" },
  { id: "SH2004", label: "SH2004", category: "showroom", color: "bg-orange-50" },
  { id: "SH2005", label: "SH2005", category: "showroom", color: "bg-amber-50" },
  { id: "SH2006", label: "SH2006", category: "showroom", color: "bg-yellow-50" },
  { id: "SH2007", label: "SH2007", category: "showroom", color: "bg-orange-50" },
  { id: "SH2008", label: "SH2008", category: "showroom", color: "bg-amber-100" },
  { id: "OD3001", label: "OD3001", category: "outdoor", color: "bg-green-50" },
  { id: "OD3002", label: "OD3002", category: "outdoor", color: "bg-emerald-50" },
  { id: "OD3003", label: "OD3003", category: "outdoor", color: "bg-teal-50" },
  { id: "OD3004", label: "OD3004", category: "outdoor", color: "bg-green-100" },
  { id: "OD3005", label: "OD3005", category: "outdoor", color: "bg-emerald-50" },
  { id: "OD3006", label: "OD3006", category: "outdoor", color: "bg-teal-50" },
  { id: "OD3007", label: "OD3007", category: "outdoor", color: "bg-green-50" },
  { id: "OD3008", label: "OD3008", category: "outdoor", color: "bg-emerald-100" },
  { id: "CU4001", label: "CU4001", category: "custom", color: "bg-violet-50" },
  { id: "CU4002", label: "CU4002", category: "custom", color: "bg-purple-50" },
  { id: "CU4003", label: "CU4003", category: "custom", color: "bg-indigo-50" },
  { id: "CU4004", label: "CU4004", category: "custom", color: "bg-violet-50" },
]

const CATEGORIES: { id: BackgroundCategory; label: string }[] = [
  { id: "custom", label: "Custom" },
  { id: "turntable", label: "Turntable" },
  { id: "showroom", label: "Showroom" },
  { id: "outdoor", label: "Outdoor" },
]

const PREVIEW_ANGLES = [
  { id: "feature-video", label: "Feature Video", type: "video" as const },
  { id: "360-view", label: "360°", type: "360" as const },
  { id: "front", label: "Front", type: "image" as const },
  { id: "rear", label: "Rear", type: "image" as const },
  { id: "side-left", label: "Left Side", type: "image" as const },
  { id: "side-right", label: "Right Side", type: "image" as const },
  { id: "interior", label: "Interior", type: "image" as const },
]

export function MediaCloningModal({ open, onOpenChange, vehicleCount = 1 }: MediaCloningModalProps) {
  const [step, setStep] = React.useState(1)
  const [activeCategory, setActiveCategory] = React.useState<BackgroundCategory>("turntable")
  const [selectedBg, setSelectedBg] = React.useState<string>("FF1101")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [activePreviewIndex, setActivePreviewIndex] = React.useState(2)
  const [viewInput, setViewInput] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setStep(1)
      setActiveCategory("turntable")
      setSelectedBg("FF1101")
      setSearchQuery("")
      setActivePreviewIndex(2)
      setViewInput(false)
    }
  }, [open])

  const filteredBackgrounds = BACKGROUNDS.filter((bg) => {
    const matchesCategory = bg.category === activeCategory
    const matchesSearch = searchQuery === "" || bg.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(4)
    }, 1500)
  }

  const totalSteps = 4

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "p-0 overflow-hidden transition-all duration-300",
        step === 2 ? "sm:max-w-[720px]" : "sm:max-w-[620px]"
      )}>
        {/* Progress bar */}
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
          {/* Step 1: Select background */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex-shrink-0">
                  <Copy className="h-5 w-5 text-white" />
                </div>
                <DialogHeader className="space-y-1 text-left flex-1">
                  <DialogTitle className="text-lg font-bold">Media Cloning Configuration</DialogTitle>
                  <DialogDescription>Manage your input medium flow</DialogDescription>
                </DialogHeader>
              </div>

              {/* Select background section */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold">Select background</p>
                    <p className="text-xs text-muted-foreground">Choose a studio for your vehicle image merchandising.</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                    <Plus className="h-3.5 w-3.5" />
                    Add Background
                  </Button>
                </div>
              </div>

              {/* Category tabs + search */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-1 bg-muted rounded-lg p-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                        activeCategory === cat.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search by BG ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-xs w-[160px]"
                  />
                </div>
              </div>

              {/* Background grid */}
              <div className="grid grid-cols-5 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                {filteredBackgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg.id)}
                    className={cn(
                      "relative rounded-xl border-2 overflow-hidden transition-all group",
                      selectedBg === bg.id
                        ? "border-violet-500 shadow-md shadow-violet-100"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {/* Selection indicator */}
                    {selectedBg === bg.id && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="w-5 h-5 rounded-full bg-violet-500 border-2 border-white flex items-center justify-center shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>
                    )}

                    {/* Thumbnail */}
                    <div className={cn(
                      "aspect-[4/3] flex items-center justify-center",
                      bg.color
                    )}>
                      <div className="w-16 h-10 relative opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-8 rounded bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <Image className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className={cn(
                      "px-2 py-1.5 text-[11px] font-medium text-center",
                      selectedBg === bg.id ? "bg-violet-50 text-violet-700" : "bg-white text-muted-foreground"
                    )}>
                      {bg.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-11 bg-violet-600 hover:bg-violet-700"
                  onClick={() => setStep(2)}
                  disabled={!selectedBg}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Media Preview */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100">
                    Add Vehicle Details
                    <ChevronRight className="h-3 w-3 rotate-[-90deg]" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                    Inventory
                    <ArrowRight className="h-3 w-3 -rotate-45" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-8 gap-1.5 bg-violet-600 hover:bg-violet-700 rounded-full px-4">
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <div className="flex items-center gap-1.5 px-3 h-8 rounded-full border bg-white">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">Comprehensive</span>
                  </div>
                </div>
              </div>

              {/* Placeholder banner */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs">
                    You are using <span className="font-bold text-foreground">Place holder images</span>, add your vehicle images
                  </p>
                  <p className="text-[11px] text-muted-foreground">Stock images may impact customer trust. <button className="text-violet-600 font-medium hover:underline">Why?</button></p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="h-7 text-xs rounded-full border-violet-300 text-violet-700 hover:bg-violet-50">
                    Replace Images
                  </Button>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">View input</span>
                    <button
                      onClick={() => setViewInput(!viewInput)}
                      className={cn(
                        "relative w-8 h-4.5 rounded-full transition-colors",
                        viewInput ? "bg-violet-500" : "bg-gray-300"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform",
                        viewInput ? "translate-x-4" : "translate-x-0.5"
                      )} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="text-[11px]">|</span>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <PlusCircle className="h-3 w-3" />
                      Add media
                    </button>
                  </div>
                  <div className="flex items-center gap-0.5 ml-1 border rounded-md overflow-hidden">
                    <button className="p-1 bg-violet-50 text-violet-600">
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1 text-muted-foreground hover:bg-gray-50">
                      <Monitor className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero vehicle preview */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200">
                {/* Turntable studio scene */}
                <div className="relative aspect-[16/10] flex items-center justify-center">
                  {/* Studio floor reflection */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-stone-300/50 to-transparent" />
                  <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[8%] rounded-[50%] bg-stone-400/30 blur-sm" />

                  {/* Vehicle placeholder */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-48 h-28 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl">
                      <Car className="h-16 w-16 text-slate-300" />
                    </div>
                  </div>

                  {/* Watermark overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
                    <div className="rotate-[-25deg] opacity-[0.12]">
                      <p className="text-5xl font-black tracking-widest text-black uppercase whitespace-nowrap">SAMPLE</p>
                    </div>
                  </div>

                  {/* Watermark badge */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 backdrop-blur-sm shadow-lg">
                    <ShieldAlert className="h-3 w-3 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Watermarked</span>
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={() => setActivePreviewIndex(Math.max(0, activePreviewIndex - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setActivePreviewIndex(Math.min(PREVIEW_ANGLES.length - 1, activePreviewIndex + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="absolute bottom-0 inset-x-0 py-1.5 bg-black/40 backdrop-blur-sm text-center">
                  <p className="text-[11px] text-white/80 font-medium">Not an Actual Vehicle | Real Car May Differ</p>
                </div>
              </div>

              {/* Watermark & long-term usage warnings */}
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <p className="text-xs font-semibold text-red-800">Watermark &amp; Long-Term Usage Risks</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white/60">
                    <Ban className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-red-800">Visible Watermark</p>
                      <p className="text-[10px] text-red-600 leading-relaxed">Cloned images carry a &quot;SAMPLE&quot; watermark on marketplace listings, reducing buyer engagement.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white/60">
                    <TrendingDown className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-red-800">Declining CTR Over Time</p>
                      <p className="text-[10px] text-red-600 leading-relaxed">Placeholder images see 35% lower CTR after 14 days as buyers scroll past stock-looking photos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white/60">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-red-800">Trust &amp; Compliance</p>
                      <p className="text-[10px] text-red-600 leading-relaxed">Some marketplaces flag or penalize listings with stock/AI imagery, hurting search ranking.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white/60">
                    <Clock className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-red-800">Extended Lot Time</p>
                      <p className="text-[10px] text-red-600 leading-relaxed">Vehicles with placeholder media stay on lot 22% longer on average, accelerating margin erosion.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Info className="h-3 w-3 text-red-400 flex-shrink-0" />
                  <p className="text-[10px] text-red-600">
                    <span className="font-semibold">Recommendation:</span> Use cloned media as a fast go-live option, then upgrade to Real Media within 7–10 days for best results.
                  </p>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PREVIEW_ANGLES.map((angle, idx) => (
                  <button
                    key={angle.id}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={cn(
                      "relative flex-shrink-0 w-[88px] rounded-lg overflow-hidden border-2 transition-all",
                      activePreviewIndex === idx
                        ? "border-violet-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn(
                      "aspect-[4/3] flex items-center justify-center",
                      angle.type === "video" ? "bg-gray-800" : "bg-stone-100"
                    )}>
                      {angle.type === "video" && (
                        <div className="flex flex-col items-center gap-1">
                          <Play className="h-4 w-4 text-white fill-white" />
                          <span className="text-[9px] text-white/80 font-medium">Feature Video</span>
                        </div>
                      )}
                      {angle.type === "360" && (
                        <div className="relative">
                          <div className="w-12 h-8 rounded bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <Car className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="absolute -top-1 -right-1 px-1 py-0.5 rounded bg-amber-400 text-[8px] font-bold text-white flex items-center gap-0.5">
                            <RotateCw className="h-2 w-2" />
                            360°
                          </div>
                        </div>
                      )}
                      {angle.type === "image" && (
                        <div className="w-12 h-8 rounded bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <Car className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Button variant="outline" className="flex-1 h-11 gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 h-11 bg-violet-600 hover:bg-violet-700"
                  onClick={() => setStep(3)}
                >
                  Confirm &amp; Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm cloning configuration */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold">Confirm Cloning Setup</DialogTitle>
                  <DialogDescription>Review your media cloning configuration before processing</DialogDescription>
                </DialogHeader>
              </div>

              {/* Config summary */}
              <div className="p-4 rounded-xl bg-gray-50 border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Background</span>
                  <span className="text-sm font-semibold">{selectedBg}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Category</span>
                  <span className="text-sm font-medium capitalize">{activeCategory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Vehicles</span>
                  <span className="text-sm font-medium">{vehicleCount} vehicle{vehicleCount !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Processing info */}
              <div className="p-3 rounded-xl bg-violet-50 border border-violet-100">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-violet-800">AI-Powered Cloning</p>
                    <p className="text-xs text-violet-600 mt-0.5">
                      Spyne AI will generate studio-quality images with the selected background for all chosen vehicles. Processing typically completes in under 5 minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected output */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <p className="text-lg font-bold text-blue-800">36</p>
                  <p className="text-[10px] text-blue-600">Images Generated</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-lg font-bold text-emerald-800">~3 min</p>
                  <p className="text-[10px] text-emerald-600">Processing Time</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 text-center">
                  <p className="text-lg font-bold text-violet-800">HD</p>
                  <p className="text-[10px] text-violet-600">Output Quality</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11 gap-2" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 h-11 bg-violet-600 hover:bg-violet-700"
                  onClick={handleConfirm}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Cloning
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">Cloning Complete</h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated media with <span className="font-semibold text-foreground">{selectedBg}</span> background
                  has been applied to {vehicleCount} vehicle{vehicleCount !== 1 ? "s" : ""}.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 border text-center">
                  <p className="text-lg font-bold">36</p>
                  <p className="text-[10px] text-muted-foreground">Images Created</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border text-center">
                  <p className="text-lg font-bold capitalize">{activeCategory}</p>
                  <p className="text-[10px] text-muted-foreground">Studio Type</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border text-center">
                  <p className="text-lg font-bold">{selectedBg}</p>
                  <p className="text-[10px] text-muted-foreground">Background ID</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border space-y-2 text-left">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What happens next</p>
                <div className="space-y-2">
                  {[
                    "Cloned images are now live on all marketplace channels",
                    "Website vehicle pages updated with new studio media",
                    "Performance tracking begins immediately",
                    "Upgrade to Real Media anytime for an additional 24% lead lift",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full h-11" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
