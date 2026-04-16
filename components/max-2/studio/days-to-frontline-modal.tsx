"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { spyneComponentClasses } from "@/lib/design-system/max-2"
import { MaterialSymbol } from "@/components/max-2/material-symbol"
import { SpyneChip } from "@/components/max-2/spyne-ui"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// ─── Types ────────────────────────────────────────────────────────────────────

export type DaysToFrontlineVariant = "upsell" | "optimization"

export interface DaysToFrontlineModalProps {
  isOpen: boolean
  onClose: () => void
  variant: DaysToFrontlineVariant
}

// ─── Static data ──────────────────────────────────────────────────────────────

const WHY_INSIGHTS_UPSELL = [
  { icon: "hide_image",      text: "Vehicles without images are not published" },
  { icon: "do_not_disturb", text: "Poor quality images are failing QC checks" },
  { icon: "upload_file",    text: "Manual uploads are slowing you down" },
]

const WHY_INSIGHTS_OPTIMIZATION = [
  { icon: "hide_image",      text: "Vehicles without images are not published" },
  { icon: "do_not_disturb", text: "Poor quality images are failing QC checks" },
]

const UPSELL_BENEFITS = [
  { icon: "bolt",        text: "Skip manual uploads" },
  { icon: "verified",    text: "Faster approvals" },
  { icon: "trending_up", text: "Higher listing visibility" },
]

type ActionTone = "danger" | "warning" | "success"

interface OptimizationAction {
  id: string
  icon: string
  tone: ActionTone
  title: string
  description: string
  count: number
  tags: string[] | null
  cta: string
  ctaIcon: string
}

const OPTIMIZATION_ACTIONS: OptimizationAction[] = [
  {
    id: "no-media",
    icon: "no_photography",
    tone: "danger",
    title: "Add Media",
    description: "VINs have no media — vehicles can't go live",
    count: 14,
    tags: null,
    cta: "Add Media",
    ctaIcon: "add_photo_alternate",
  },
  {
    id: "image-quality",
    icon: "image_search",
    tone: "warning",
    title: "Improve Image Quality",
    description: "VINs have input quality issues",
    count: 23,
    tags: ["Sun glare", "Blur", "Cropped"],
    cta: "Fix Now",
    ctaIcon: "auto_fix_high",
  },
  {
    id: "instant-media",
    icon: "bolt",
    tone: "success",
    title: "Use Instant Media",
    description: "VINs can go live instantly — Instant Media is active",
    count: 10,
    tags: null,
    cta: "Use",
    ctaIcon: "auto_awesome",
  },
]

// icon well bg/text per tone
const TONE_WELL: Record<ActionTone, string> = {
  danger:  "bg-red-50 text-spyne-error",
  warning: "bg-amber-50 text-amber-600",
  success: "bg-emerald-50 text-emerald-600",
}

// count chip tone for SpyneChip
const TONE_CHIP: Record<ActionTone, "error" | "warning" | "success"> = {
  danger:  "error",
  warning: "warning",
  success: "success",
}

// tag chip bg/text per tone
const TONE_TAG: Record<ActionTone, string> = {
  danger:  "bg-red-50 text-spyne-error border-red-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
}

// ─── Why section ──────────────────────────────────────────────────────────────

function WhySection({ insights }: { insights: { icon: string; text: string }[] }) {
  return (
    <div>
      <p className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Why your Days to Frontline is high
      </p>
      <div className="overflow-hidden rounded-xl border border-spyne-border bg-white">
        <ul className="divide-y divide-spyne-border">
          {insights.map((item) => (
            <li key={item.text} className="flex items-center gap-3 px-4 py-3">
              {/* icon well */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50">
                <MaterialSymbol name={item.icon} size={15} className="text-spyne-error" />
              </div>
              <span className="text-[13px] font-medium text-spyne-text leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Actions section ──────────────────────────────────────────────────────────

function ActionsSection() {
  return (
    <div>
      <p className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Actions required
      </p>
      <div className="overflow-hidden rounded-xl border border-spyne-border bg-white">
        <ul className="divide-y divide-spyne-border">
          {OPTIMIZATION_ACTIONS.map((action) => (
            <li key={action.id} className="flex items-start gap-3 px-4 py-3.5">
              {/* Icon well */}
              <div className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                TONE_WELL[action.tone],
              )}>
                <MaterialSymbol name={action.icon} size={15} />
              </div>

              {/* Text block */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-spyne-text leading-tight">{action.title}</p>
                  <SpyneChip variant="outline" tone={TONE_CHIP[action.tone]} compact className="shrink-0 tabular-nums">
                    {action.count}
                  </SpyneChip>
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
                  <span className="font-semibold text-spyne-text">{action.count}</span>{" "}
                  {action.description}
                </p>
                {action.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {action.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn("rounded-full border px-2 py-0.5 text-[10.5px] font-medium", TONE_TAG[action.tone])}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                type="button"
                className={cn(spyneComponentClasses.btnSecondaryMd, "mt-0.5 shrink-0 whitespace-nowrap text-[12px]")}
              >
                <MaterialSymbol name={action.ctaIcon} size={14} />
                {action.cta}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Promo card (upsell) ──────────────────────────────────────────────────────

function PromoCard() {
  return (
    <div>
      <p className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Recommended solution
      </p>
      <div className="relative overflow-hidden rounded-xl border-2 border-spyne-primary/20 bg-gradient-to-br from-spyne-primary/5 via-spyne-primary/[0.03] to-transparent p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-spyne-primary/6" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spyne-primary/10">
            <MaterialSymbol name="auto_awesome" size={20} className="text-spyne-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[14px] font-bold text-spyne-primary leading-tight">
                Go live instantly with Instant Media
              </p>
              <span className="rounded-full border border-spyne-primary/20 bg-spyne-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-spyne-primary">
                Recommended
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {[
                "Reuse images from Pinn Library for new vehicles",
                "Auto-map images from your inventory for used vehicles",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2 text-[12px] text-muted-foreground leading-snug">
                  <MaterialSymbol name="check_circle" size={14} className="shrink-0 text-spyne-primary/60" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {UPSELL_BENEFITS.map((b) => (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-spyne-primary/20 bg-white px-2.5 py-1 text-[11px] font-medium text-spyne-primary"
                >
                  <MaterialSymbol name={b.icon} size={12} />
                  {b.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <button
            type="button"
            className={cn(spyneComponentClasses.btnPrimaryMd, "shadow-sm")}
          >
            <MaterialSymbol name="bolt" size={17} />
            Activate Instant Media
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dev toggle ───────────────────────────────────────────────────────────────

function DevVariantToggle({
  active,
  onChange,
}: {
  active: DaysToFrontlineVariant
  onChange: (v: DaysToFrontlineVariant) => void
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-dashed border-orange-300 bg-orange-50 px-2.5 py-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">DEV</span>
      <span className={cn("text-[11px] font-medium", active === "upsell" ? "text-orange-600" : "text-muted-foreground")}>
        Upsell
      </span>
      <Switch
        checked={active === "optimization"}
        onCheckedChange={(v) => onChange(v ? "optimization" : "upsell")}
        className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-300 h-4 w-7 [&>span]:h-3 [&>span]:w-3"
      />
      <span className={cn("text-[11px] font-medium", active === "optimization" ? "text-orange-600" : "text-muted-foreground")}>
        Optimize
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DaysToFrontlineModal({ isOpen, onClose, variant }: DaysToFrontlineModalProps) {
  const isDev = process.env.NODE_ENV === "development"
  const [devVariant, setDevVariant] = React.useState<DaysToFrontlineVariant>(variant)

  React.useEffect(() => { setDevVariant(variant) }, [variant])

  const activeVariant = isDev ? devVariant : variant

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">

        {/* ── Header ── */}
        <DialogHeader className="border-b border-spyne-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spyne-primary/10">
                <MaterialSymbol name="schedule" size={20} className="text-spyne-primary" />
              </div>
              <div>
                <DialogTitle className="text-[15px] font-bold text-spyne-text leading-tight">
                  Improve Days to Frontline
                </DialogTitle>
                <DialogDescription className="mt-0.5 text-[12px] text-muted-foreground">
                  Reduce time taken for vehicles to go live
                </DialogDescription>
              </div>
            </div>

            {isDev && (
              <DevVariantToggle active={devVariant} onChange={setDevVariant} />
            )}
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <div className="space-y-5 px-5 py-5">
          <WhySection
            insights={activeVariant === "optimization" ? WHY_INSIGHTS_OPTIMIZATION : WHY_INSIGHTS_UPSELL}
          />
          {activeVariant === "upsell" ? <PromoCard /> : <ActionsSection />}
        </div>

      </DialogContent>
    </Dialog>
  )
}
