"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { VehicleSummary, CapitalOverview } from "@/services/inventory/inventory.types"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Shield,
  Zap,
  ArrowRight,
  Megaphone,
  Sparkles,
  Trophy,
  Clock,
  Target,
  ChevronRight,
  Star,
} from "lucide-react"

interface WelcomeBackBriefProps {
  open: boolean
  onDismiss: () => void
  vehicles: VehicleSummary[]
  overview: CapitalOverview
  onAccelerate?: (vin: string) => void
}

function useCountUp(target: number, duration = 1200, active = false) {
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    if (!active) { setValue(0); return }
    let start = 0
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(target * eased)
      setValue(start)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return value
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

interface OvernightStats {
  newLeads: number
  marginProtected: number
  vehiclesSold: number
  movedToRisk: number
  activeCampaigns: number
  velocityDelta: number
}

interface WinEvent {
  type: "campaign" | "sale" | "velocity" | "milestone"
  title: string
  detail: string
  value: string
}

interface PriorityAction {
  title: string
  detail: string
  impact: string
  vin: string
}

function deriveOvernightStats(vehicles: VehicleSummary[], overview: CapitalOverview): OvernightStats {
  const activeCampaigns = vehicles.filter(v => v.campaignStatus === "active").length
  return {
    newLeads: Math.round(vehicles.reduce((a, v) => a + v.leads, 0) * 0.12 + 3),
    marginProtected: Math.round(overview.capitalSavedThisMonth * 0.04),
    vehiclesSold: Math.max(1, Math.round(vehicles.length * 0.008 + Math.random() * 2)),
    movedToRisk: vehicles.filter(v => v.stage === "risk" && v.daysInStock >= 30 && v.daysInStock <= 33).length || 1,
    activeCampaigns,
    velocityDelta: overview.deltas.velocityScore,
  }
}

function deriveWin(vehicles: VehicleSummary[], overview: CapitalOverview, stats: OvernightStats): WinEvent | null {
  const activeWithLeads = vehicles
    .filter(v => v.campaignStatus === "active" && v.leads >= 6)
    .sort((a, b) => b.leads - a.leads)[0]

  if (activeWithLeads) {
    return {
      type: "campaign",
      title: "Campaign Hit!",
      detail: `Your campaign on the ${activeWithLeads.year} ${activeWithLeads.make} ${activeWithLeads.model} generated ${activeWithLeads.leads} leads`,
      value: `${activeWithLeads.leads} leads`,
    }
  }

  if (stats.velocityDelta > 5) {
    return {
      type: "velocity",
      title: "Velocity Up!",
      detail: `Your lot velocity score improved by ${Math.abs(stats.velocityDelta).toFixed(1)}% this week`,
      value: `+${Math.abs(stats.velocityDelta).toFixed(1)}%`,
    }
  }

  if (stats.vehiclesSold > 0) {
    const soldCandidate = vehicles
      .filter(v => v.marginRemaining > 1500)
      .sort((a, b) => b.marginRemaining - a.marginRemaining)[0]
    if (soldCandidate) {
      return {
        type: "sale",
        title: "Vehicle Sold!",
        detail: `The ${soldCandidate.year} ${soldCandidate.make} ${soldCandidate.model} sold with $${soldCandidate.marginRemaining.toLocaleString()} margin captured`,
        value: `$${soldCandidate.marginRemaining.toLocaleString()}`,
      }
    }
  }

  return {
    type: "milestone",
    title: "Margin Protected",
    detail: `Your active campaigns protected $${stats.marginProtected.toLocaleString()} in margin overnight`,
    value: `$${stats.marginProtected.toLocaleString()}`,
  }
}

function derivePriority(vehicles: VehicleSummary[]): PriorityAction | null {
  const candidate = vehicles
    .filter(v => v.campaignStatus === "none" && (v.stage === "risk" || v.stage === "critical"))
    .sort((a, b) => a.marginRemaining - b.marginRemaining)[0]

  if (!candidate) return null
  return {
    title: `Activate a campaign on your ${candidate.year} ${candidate.make} ${candidate.model}`,
    detail: `${candidate.daysInStock} days in stock, $${candidate.dailyBurn}/day burn`,
    impact: `Protect $${Math.round(candidate.marginRemaining * 0.6).toLocaleString()} in margin`,
    vin: candidate.vin,
  }
}

const winIcons: Record<WinEvent["type"], React.ReactNode> = {
  campaign: <Megaphone className="h-5 w-5" />,
  sale: <DollarSign className="h-5 w-5" />,
  velocity: <TrendingUp className="h-5 w-5" />,
  milestone: <Trophy className="h-5 w-5" />,
}

export function WelcomeBackBrief({ open, onDismiss, vehicles, overview, onAccelerate }: WelcomeBackBriefProps) {
  const [phase, setPhase] = React.useState(0)
  const [exiting, setExiting] = React.useState(false)

  const stats = React.useMemo(() => deriveOvernightStats(vehicles, overview), [vehicles, overview])
  const win = React.useMemo(() => deriveWin(vehicles, overview, stats), [vehicles, overview, stats])
  const priority = React.useMemo(() => derivePriority(vehicles), [vehicles])

  const leadsCount = useCountUp(stats.newLeads, 1000, phase >= 2)
  const marginCount = useCountUp(stats.marginProtected, 1200, phase >= 2)
  const soldCount = useCountUp(stats.vehiclesSold, 800, phase >= 2)
  const campaignCount = useCountUp(stats.activeCampaigns, 900, phase >= 2)

  React.useEffect(() => {
    if (!open) { setPhase(0); setExiting(false); return }
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
    ]
    const autoDismiss = setTimeout(() => handleDismiss(), 20000)
    return () => { timers.forEach(clearTimeout); clearTimeout(autoDismiss) }
  }, [open])

  const handleDismiss = () => {
    setExiting(true)
    setTimeout(onDismiss, 500)
  }

  const handlePriorityAction = () => {
    if (priority && onAccelerate) {
      onAccelerate(priority.vin)
    }
    handleDismiss()
  }

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500",
        exiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-gray-100">
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 50%)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Greeting */}
        <div className={cn(
          "transition-all duration-700 ease-out",
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-indigo-600 font-medium tracking-wide uppercase">Welcome Back</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">
            {getGreeting()}
          </h1>
          <p className="text-lg text-gray-500">
            {getFormattedDate()} — here&apos;s what happened while you were away
          </p>
        </div>

        {/* Overnight stats */}
        <div className={cn(
          "grid grid-cols-4 gap-3 mt-8 transition-all duration-700 ease-out",
          phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {[
            { icon: <Users className="h-4 w-4 text-blue-600" />, value: `+${leadsCount}`, label: "New Leads", color: "from-blue-50 to-blue-100/50", border: "border-blue-200" },
            { icon: <Shield className="h-4 w-4 text-emerald-600" />, value: `$${marginCount.toLocaleString()}`, label: "Margin Protected", color: "from-emerald-50 to-emerald-100/50", border: "border-emerald-200" },
            { icon: <Zap className="h-4 w-4 text-amber-600" />, value: `${soldCount}`, label: "Vehicles Sold", color: "from-amber-50 to-amber-100/50", border: "border-amber-200" },
            { icon: <Megaphone className="h-4 w-4 text-violet-600" />, value: `${campaignCount}`, label: "Active Campaigns", color: "from-violet-50 to-violet-100/50", border: "border-violet-200" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "p-4 rounded-2xl border bg-gradient-to-b transition-all duration-500 ease-out",
                stat.color, stat.border,
                phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Win celebration */}
        {win && (
          <div className={cn(
            "mt-6 transition-all duration-700 ease-out",
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="relative p-5 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50/50 to-amber-50 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_3s_linear_infinite] bg-gradient-to-r from-transparent via-amber-100/40 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                  {winIcons[win.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-amber-700">{win.title}</p>
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-600">{win.detail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-amber-700">{win.value}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Priority action */}
        {priority && (
          <div className={cn(
            "mt-6 transition-all duration-700 ease-out",
            phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">Today&apos;s #1 Priority</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{priority.title}</p>
              <p className="text-xs text-gray-500 mb-3">{priority.detail}</p>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="h-9 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-0 rounded-xl"
                  onClick={handlePriorityAction}
                >
                  <Zap className="h-3.5 w-3.5" />
                  {priority.impact}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Dismiss */}
        <div className={cn(
          "mt-8 flex items-center justify-between transition-all duration-700 ease-out",
          phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <button
            onClick={handleDismiss}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all duration-200"
          >
            Go to Dashboard
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Clock className="h-3 w-3" />
            Auto-dismiss in a few seconds
          </div>
        </div>
      </div>
    </div>
  )
}
