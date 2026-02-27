"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CapitalOverview, VehicleSummary } from "@/services/inventory/inventory.types"
import { StageBadge } from "./stage-badge"
import {
  Shield,
  Zap,
  Camera,
  Gauge,
  ArrowRight,
  Flame,
  AlertTriangle,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from "lucide-react"

interface WelcomeFlowProps {
  open: boolean
  onComplete: () => void
  overview: CapitalOverview
  topRiskVehicles: VehicleSummary[]
}

export function WelcomeFlow({ open, onComplete, overview, topRiskVehicles }: WelcomeFlowProps) {
  const [step, setStep] = React.useState(1)

  const formatCurrency = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
    return `$${n.toLocaleString()}`
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden [&>button]:hidden">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/40" : "w-4 bg-gray-200"
              )}
            />
          ))}
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <Gauge className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Your Capital Reality</h2>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your inventory right now.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-gray-50 border">
                  <p className="text-2xl font-bold">{formatCurrency(overview.totalCapitalLocked)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Capital Locked</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <p className="text-2xl font-bold text-orange-700">{formatCurrency(overview.totalDailyBurn)}</p>
                  <p className="text-xs text-orange-600 mt-1">Daily Burn</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-2xl font-bold text-red-700">{formatCurrency(overview.capitalAtRisk)}</p>
                  <p className="text-xs text-red-600 mt-1">Margin at Risk</p>
                </div>
              </div>

              <Button className="w-full h-11" onClick={() => setStep(2)}>
                See How We Help
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">How Velocity OS Works</h2>
                <p className="text-muted-foreground">Three-phase margin protection system.</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-violet-50 border border-violet-100">
                  <div className="p-2 rounded-lg bg-violet-100">
                    <Sparkles className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-violet-900">1. AI Instant Live</p>
                    <p className="text-xs text-violet-700 mt-0.5">VIN cloning gets vehicles listed in minutes, not days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">2. Margin Tracking</p>
                    <p className="text-xs text-blue-700 mt-0.5">Real-time capital monitoring across every stage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Zap className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">3. Smart Acceleration</p>
                    <p className="text-xs text-emerald-700 mt-0.5">AI-powered campaigns that protect margin before it erodes.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 h-11" onClick={() => setStep(3)}>
                  See Your Risk Vehicles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Your Top Risk Vehicles</h2>
                <p className="text-muted-foreground">These need attention first.</p>
              </div>

              <div className="space-y-2">
                {topRiskVehicles.slice(0, 3).map((v) => (
                  <div key={v.vin} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border">
                    <div className="flex items-center gap-3">
                      <StageBadge stage={v.stage} size="sm" />
                      <div>
                        <p className="text-sm font-semibold">{v.year} {v.make} {v.model}</p>
                        <p className="text-xs text-muted-foreground">{v.daysInStock} days · ${v.dailyBurn}/day burn</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold tabular-nums", v.marginRemaining <= 0 ? "text-red-600" : "text-foreground")}>
                        {v.marginRemaining <= 0 ? "-" : ""}${Math.abs(v.marginRemaining).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground">margin left</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1 h-11" onClick={() => setStep(4)}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">You&apos;re Ready</h2>
                <p className="text-muted-foreground">Your Spyne Velocity dashboard is configured. Start protecting margin today.</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border text-left">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Stay informed</p>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white border hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Flame className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Spyne Velocity Mobile</p>
                    <p className="text-xs text-muted-foreground">Get alerts when vehicles hit Risk, margin depletes, or campaigns underperform.</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button className="w-full h-12 text-base font-semibold" onClick={onComplete}>
                Start Protecting Margin
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
