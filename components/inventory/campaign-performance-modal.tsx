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
import {
  Megaphone,
  Phone,
  Zap,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  DollarSign,
  Clock,
  Calendar,
  CalendarClock,
  Target,
  BarChart3,
  CheckCircle2,
  Star,
  PhoneOutgoing,
  PhoneIncoming,
  PhoneCall,
  Bot,
  MessageSquare,
  Pause,
  Play,
  Settings2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Timer,
} from "lucide-react"

type CampaignChannelType = "digital" | "voice-ai" | "both"

interface DigitalMetrics {
  impressions: number
  clicks: number
  ctr: number
  leads: number
  costPerLead: number
  spend: number
  budget: number
  daysElapsed: number
  totalDays: number
  roi: number
  dailyTrend: number[]
  channels: { name: string; impressions: number; clicks: number; leads: number }[]
}

type CallOutcome = "appointment" | "callback" | "interested" | "not-interested" | "voicemail" | "no-answer"
type CallSentiment = "positive" | "neutral" | "negative"

interface CallRecord {
  id: string
  callerName: string
  phone: string
  time: string
  duration: number
  status: "connected" | "voicemail" | "no-answer"
  outcome: CallOutcome
  sentiment: CallSentiment
  notes: string
}

interface VoiceAIMetrics {
  totalCalls: number
  connected: number
  connectRate: number
  appointments: number
  appointmentRate: number
  avgCallDuration: number
  sentiment: { positive: number; neutral: number; negative: number }
  agentName: string
  callsToday: number
  schedule: string
  dailyTrend: number[]
  topObjections: { objection: string; count: number; resolved: number }[]
  recentCalls: CallRecord[]
}

interface CampaignPerformanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleName?: string
  channelType: CampaignChannelType
  daysActive?: number
}

function generateDigitalMetrics(daysActive: number): DigitalMetrics {
  const impressions = Math.round(1200 * daysActive + Math.random() * 500)
  const clicks = Math.round(impressions * (0.028 + Math.random() * 0.012))
  const leads = Math.round(clicks * (0.08 + Math.random() * 0.05))
  const spend = Math.round(daysActive * 18 + Math.random() * 40)
  return {
    impressions,
    clicks,
    ctr: parseFloat(((clicks / impressions) * 100).toFixed(1)),
    leads,
    costPerLead: leads > 0 ? parseFloat((spend / leads).toFixed(0)) : 0,
    spend,
    budget: 349,
    daysElapsed: daysActive,
    totalDays: 21,
    roi: parseFloat(((leads * 420 - spend) / spend * 100).toFixed(0)),
    dailyTrend: Array.from({ length: Math.min(daysActive, 14) }, (_, i) =>
      Math.round(60 + Math.random() * 80 + i * 5)
    ),
    channels: [
      { name: "Facebook / IG", impressions: Math.round(impressions * 0.45), clicks: Math.round(clicks * 0.42), leads: Math.round(leads * 0.38) },
      { name: "Google Search", impressions: Math.round(impressions * 0.25), clicks: Math.round(clicks * 0.32), leads: Math.round(leads * 0.35) },
      { name: "Marketplace", impressions: Math.round(impressions * 0.20), clicks: Math.round(clicks * 0.18), leads: Math.round(leads * 0.20) },
      { name: "Display / Retarget", impressions: Math.round(impressions * 0.10), clicks: Math.round(clicks * 0.08), leads: Math.round(leads * 0.07) },
    ],
  }
}

const callerNames = [
  "Michael Torres", "Jessica Chen", "Robert Williams", "Amanda Foster",
  "David Patel", "Sarah Martinez", "Kevin O'Brien", "Lisa Nguyen",
  "James Cooper", "Maria Rodriguez", "Chris Adkins", "Emily Turner",
  "Brandon Scott", "Nicole Phillips", "Alex Hernandez", "Rachel Kim",
]

const callNotes: Record<CallOutcome, string[]> = {
  appointment: ["Booked test drive for Saturday 2PM", "Scheduled showroom visit tomorrow", "Coming in this afternoon to see the vehicle", "Appointment set for Thursday morning"],
  callback: ["Wants to discuss with spouse first, call back Friday", "Requested financing details via email", "Checking trade-in value, follow up Monday", "Asked to call back after 5PM"],
  interested: ["Liked the price, needs to sell current vehicle first", "Very interested, comparing with one other option", "Wants to see more photos, sent gallery link", "Positive response, not ready to commit yet"],
  "not-interested": ["Already purchased elsewhere", "Budget doesn't match", "Looking for a different model", "Timing not right"],
  voicemail: ["Left message with vehicle details and callback number", "Second attempt — left voicemail", "Left personalized message mentioning price drop"],
  "no-answer": ["No answer — will retry tomorrow", "No answer — scheduled for next call window", "No pickup — moved to evening retry"],
}

function generateRecentCalls(count: number): CallRecord[] {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const minutesAgo = Math.round(i * 18 + Math.random() * 30)
    const callTime = new Date(now.getTime() - minutesAgo * 60000)
    const statusRoll = Math.random()
    const status: CallRecord["status"] = statusRoll > 0.55 ? "connected" : statusRoll > 0.25 ? "voicemail" : "no-answer"
    const duration = status === "connected" ? Math.round(60 + Math.random() * 180) : status === "voicemail" ? Math.round(20 + Math.random() * 15) : 0

    let outcome: CallOutcome
    let sentiment: CallSentiment = "neutral"
    if (status === "connected") {
      const oRoll = Math.random()
      if (oRoll > 0.78) { outcome = "appointment"; sentiment = "positive" }
      else if (oRoll > 0.58) { outcome = "callback"; sentiment = "positive" }
      else if (oRoll > 0.30) { outcome = "interested"; sentiment = "neutral" }
      else { outcome = "not-interested"; sentiment = "negative" }
    } else if (status === "voicemail") {
      outcome = "voicemail"; sentiment = "neutral"
    } else {
      outcome = "no-answer"; sentiment = "neutral"
    }

    const noteOptions = callNotes[outcome]
    const name = callerNames[i % callerNames.length]

    return {
      id: `call-${i}`,
      callerName: name,
      phone: `(${Math.round(200 + Math.random() * 799)}) ${Math.round(100 + Math.random() * 899)}-${String(Math.round(1000 + Math.random() * 8999))}`,
      time: callTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      duration,
      status,
      outcome,
      sentiment,
      notes: noteOptions[Math.floor(Math.random() * noteOptions.length)],
    }
  })
}

function generateVoiceMetrics(daysActive: number): VoiceAIMetrics {
  const totalCalls = Math.round(25 * daysActive + Math.random() * 20)
  const connected = Math.round(totalCalls * (0.42 + Math.random() * 0.1))
  const appointments = Math.round(connected * (0.18 + Math.random() * 0.08))
  return {
    totalCalls,
    connected,
    connectRate: parseFloat(((connected / totalCalls) * 100).toFixed(0)),
    appointments,
    appointmentRate: parseFloat(((appointments / connected) * 100).toFixed(0)),
    avgCallDuration: Math.round(110 + Math.random() * 60),
    sentiment: {
      positive: Math.round(connected * 0.62),
      neutral: Math.round(connected * 0.28),
      negative: Math.round(connected * 0.10),
    },
    agentName: "Sarah",
    callsToday: Math.round(18 + Math.random() * 12),
    schedule: "9 AM – 6 PM",
    dailyTrend: Array.from({ length: Math.min(daysActive, 14) }, () =>
      Math.round(20 + Math.random() * 15)
    ),
    topObjections: [
      { objection: "Need to think about it", count: Math.round(connected * 0.22), resolved: Math.round(connected * 0.22 * 0.65) },
      { objection: "Price too high", count: Math.round(connected * 0.15), resolved: Math.round(connected * 0.15 * 0.45) },
      { objection: "Looking at other options", count: Math.round(connected * 0.12), resolved: Math.round(connected * 0.12 * 0.55) },
    ],
    recentCalls: generateRecentCalls(12),
  }
}

function MiniBarChart({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  if (data.length === 0) return null
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-[2px]" style={{ height }}>
      {data.map((v, i) => (
        <div
          key={i}
          className={cn("rounded-sm flex-1 min-w-[3px] transition-all", color)}
          style={{ height: `${Math.max((v / max) * 100, 8)}%` }}
        />
      ))}
    </div>
  )
}

function MetricCard({ icon, value, label, subtext, trend, className }: {
  icon: React.ReactNode
  value: string | number
  label: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
  className?: string
}) {
  return (
    <div className={cn("p-3 rounded-xl border text-center", className)}>
      <div className="mx-auto mb-1.5 w-fit">{icon}</div>
      <div className="flex items-center justify-center gap-1">
        <p className="text-xl font-bold">{value}</p>
        {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />}
        {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
      {subtext && <p className="text-[9px] text-muted-foreground/70 mt-0.5">{subtext}</p>}
    </div>
  )
}

export function CampaignPerformanceModal({
  open, onOpenChange, vehicleName, channelType, daysActive = 5,
}: CampaignPerformanceModalProps) {
  const [activeTab, setActiveTab] = React.useState<"digital" | "voice-ai">(
    channelType === "voice-ai" ? "voice-ai" : "digital"
  )
  const [isPaused, setIsPaused] = React.useState(false)

  const digital = React.useMemo(() => generateDigitalMetrics(daysActive), [daysActive])
  const voice = React.useMemo(() => generateVoiceMetrics(daysActive), [daysActive])

  React.useEffect(() => {
    if (open) {
      setActiveTab(channelType === "voice-ai" ? "voice-ai" : "digital")
      setIsPaused(false)
    }
  }, [open, channelType])

  const budgetPercent = Math.round((digital.spend / digital.budget) * 100)
  const daysPercent = Math.round((digital.daysElapsed / digital.totalDays) * 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-[600px]">
        {/* Header */}
        <div className={cn(
          "px-6 pt-5 pb-4 border-b",
          channelType === "both" ? "bg-gradient-to-r from-blue-50/50 to-violet-50/50"
            : channelType === "voice-ai" ? "bg-violet-50/50"
            : "bg-blue-50/50"
        )}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                channelType === "both" ? "bg-emerald-100" : channelType === "voice-ai" ? "bg-violet-100" : "bg-blue-100"
              )}>
                {channelType === "both"
                  ? <Zap className="h-5 w-5 text-emerald-600" />
                  : channelType === "voice-ai"
                    ? <Phone className="h-5 w-5 text-violet-600" />
                    : <Megaphone className="h-5 w-5 text-blue-600" />
                }
              </div>
              <div>
                <DialogHeader className="space-y-0 text-left">
                  <DialogTitle className="text-lg font-bold">Campaign Performance</DialogTitle>
                  <DialogDescription className="text-sm">
                    {vehicleName && <span className="font-medium text-foreground">{vehicleName}</span>}
                    {vehicleName && " · "}
                    <span className="text-emerald-600 font-medium">Live · Day {daysActive}</span>
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8 gap-1.5 text-xs", isPaused && "border-amber-300 bg-amber-50 text-amber-700")}
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>

          {/* Channel tabs for 'both' */}
          {channelType === "both" && (
            <div className="flex gap-1 mt-4 bg-white/60 rounded-lg p-1 border">
              <button
                onClick={() => setActiveTab("digital")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  activeTab === "digital"
                    ? "bg-white shadow-sm text-blue-700"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Megaphone className="h-3 w-3" />
                Digital Ads
              </button>
              <button
                onClick={() => setActiveTab("voice-ai")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  activeTab === "voice-ai"
                    ? "bg-white shadow-sm text-violet-700"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Phone className="h-3 w-3" />
                Voice AI (VINI)
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">

          {/* ── Digital Ads Performance ── */}
          {(channelType === "digital" || (channelType === "both" && activeTab === "digital")) && (
            <div className="space-y-4">
              {/* Progress bars */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 border">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium text-muted-foreground">Budget Used</span>
                    <span className="text-xs font-bold">${digital.spend} / ${digital.budget}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${budgetPercent}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{budgetPercent}% spent</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium text-muted-foreground">Timeline</span>
                    <span className="text-xs font-bold">Day {digital.daysElapsed} / {digital.totalDays}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${daysPercent}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{digital.totalDays - digital.daysElapsed} days remaining</p>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-4 gap-2">
                <MetricCard
                  icon={<Eye className="h-4 w-4 text-blue-500" />}
                  value={digital.impressions.toLocaleString()}
                  label="Impressions"
                  trend="up"
                  className="bg-blue-50/50 border-blue-100"
                />
                <MetricCard
                  icon={<MousePointerClick className="h-4 w-4 text-indigo-500" />}
                  value={digital.clicks.toLocaleString()}
                  label="Clicks"
                  subtext={`${digital.ctr}% CTR`}
                  trend="up"
                  className="bg-indigo-50/50 border-indigo-100"
                />
                <MetricCard
                  icon={<Users className="h-4 w-4 text-emerald-500" />}
                  value={digital.leads}
                  label="Leads"
                  subtext={`$${digital.costPerLead} CPL`}
                  trend="up"
                  className="bg-emerald-50/50 border-emerald-100"
                />
                <MetricCard
                  icon={<TrendingUp className="h-4 w-4 text-amber-500" />}
                  value={`${digital.roi}%`}
                  label="ROI"
                  trend={digital.roi > 0 ? "up" : "down"}
                  className="bg-amber-50/50 border-amber-100"
                />
              </div>

              {/* Daily trend */}
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Daily Clicks Trend</span>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    Trending up
                  </span>
                </div>
                <MiniBarChart data={digital.dailyTrend} color="bg-blue-400" height={48} />
              </div>

              {/* Channel breakdown */}
              <div className="p-3 rounded-xl bg-gray-50 border">
                <p className="text-xs font-medium mb-2">Channel Breakdown</p>
                <div className="space-y-2">
                  {digital.channels.map((ch) => (
                    <div key={ch.name} className="flex items-center gap-3">
                      <span className="text-[11px] font-medium w-28 text-muted-foreground">{ch.name}</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full"
                          style={{ width: `${(ch.impressions / digital.impressions) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground w-32 justify-end">
                        <span>{ch.clicks} clicks</span>
                        <span className="font-semibold text-foreground">{ch.leads} leads</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Voice AI (VINI) Performance ── */}
          {(channelType === "voice-ai" || (channelType === "both" && activeTab === "voice-ai")) && (
            <div className="space-y-4">
              {/* VINI agent status */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-violet-800">VINI · {voice.agentName}</p>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[9px] font-bold",
                        isPaused ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      )}>
                        {isPaused ? "PAUSED" : "ACTIVE"}
                      </span>
                    </div>
                    <p className="text-xs text-violet-600">{voice.callsToday} calls today · {voice.schedule}</p>
                  </div>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-4 gap-2">
                <MetricCard
                  icon={<PhoneOutgoing className="h-4 w-4 text-violet-500" />}
                  value={voice.totalCalls}
                  label="Total Calls"
                  trend="up"
                  className="bg-violet-50/50 border-violet-100"
                />
                <MetricCard
                  icon={<PhoneCall className="h-4 w-4 text-blue-500" />}
                  value={voice.connected}
                  label="Connected"
                  subtext={`${voice.connectRate}% rate`}
                  trend="up"
                  className="bg-blue-50/50 border-blue-100"
                />
                <MetricCard
                  icon={<Calendar className="h-4 w-4 text-emerald-500" />}
                  value={voice.appointments}
                  label="Appointments"
                  subtext={`${voice.appointmentRate}% conv.`}
                  trend="up"
                  className="bg-emerald-50/50 border-emerald-100"
                />
                <MetricCard
                  icon={<Timer className="h-4 w-4 text-amber-500" />}
                  value={`${Math.floor(voice.avgCallDuration / 60)}:${String(voice.avgCallDuration % 60).padStart(2, "0")}`}
                  label="Avg Duration"
                  className="bg-amber-50/50 border-amber-100"
                />
              </div>

              {/* Daily trend */}
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Daily Connected Calls</span>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    Consistent
                  </span>
                </div>
                <MiniBarChart data={voice.dailyTrend} color="bg-violet-400" height={48} />
              </div>

              {/* Sentiment */}
              <div className="p-3 rounded-xl bg-gray-50 border">
                <p className="text-xs font-medium mb-2">Call Sentiment Analysis</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-400 h-full" style={{ width: `${(voice.sentiment.positive / voice.connected) * 100}%` }} />
                    <div className="bg-amber-300 h-full" style={{ width: `${(voice.sentiment.neutral / voice.connected) * 100}%` }} />
                    <div className="bg-red-400 h-full" style={{ width: `${(voice.sentiment.negative / voice.connected) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-muted-foreground">Positive {Math.round((voice.sentiment.positive / voice.connected) * 100)}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-amber-500" />
                    <span className="text-muted-foreground">Neutral {Math.round((voice.sentiment.neutral / voice.connected) * 100)}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsDown className="h-3 w-3 text-red-400" />
                    <span className="text-muted-foreground">Negative {Math.round((voice.sentiment.negative / voice.connected) * 100)}%</span>
                  </span>
                </div>
              </div>

              {/* Top objections */}
              <div className="p-3 rounded-xl bg-gray-50 border">
                <p className="text-xs font-medium mb-2">Top Objections & Resolution</p>
                <div className="space-y-2">
                  {voice.topObjections.map((obj) => (
                    <div key={obj.objection} className="flex items-center gap-3">
                      <span className="text-[11px] text-muted-foreground flex-1">{obj.objection}</span>
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-400 rounded-full"
                          style={{ width: `${(obj.resolved / obj.count) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-violet-700 w-14 text-right">
                        {Math.round((obj.resolved / obj.count) * 100)}% resolved
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent callers list */}
              <div className="rounded-xl border overflow-hidden">
                <div className="px-3 py-2.5 bg-gray-50 border-b flex items-center justify-between">
                  <p className="text-xs font-medium">Recent Calls</p>
                  <span className="text-[10px] text-muted-foreground">{voice.recentCalls.length} calls today</span>
                </div>
                <div className="divide-y max-h-[320px] overflow-y-auto">
                  {voice.recentCalls.map((call) => {
                    const outcomeConfig: Record<CallOutcome, { label: string; className: string }> = {
                      appointment: { label: "Appt Booked", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      callback: { label: "Callback", className: "bg-blue-50 text-blue-700 border-blue-200" },
                      interested: { label: "Interested", className: "bg-amber-50 text-amber-700 border-amber-200" },
                      "not-interested": { label: "Not Interested", className: "bg-gray-50 text-gray-500 border-gray-200" },
                      voicemail: { label: "Voicemail", className: "bg-violet-50 text-violet-600 border-violet-200" },
                      "no-answer": { label: "No Answer", className: "bg-gray-50 text-gray-400 border-gray-200" },
                    }
                    const oc = outcomeConfig[call.outcome]
                    const statusIcon = call.status === "connected"
                      ? <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
                      : call.status === "voicemail"
                        ? <MessageSquare className="h-3.5 w-3.5 text-violet-400" />
                        : <PhoneIncoming className="h-3.5 w-3.5 text-gray-300" />

                    return (
                      <div key={call.id} className="px-3 py-2.5 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            call.status === "connected" ? "bg-emerald-50" : call.status === "voicemail" ? "bg-violet-50" : "bg-gray-50"
                          )}>
                            {statusIcon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-semibold text-foreground truncate">{call.callerName}</p>
                              <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-medium border", oc.className)}>
                                {oc.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{call.notes}</p>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                              <span>{call.time}</span>
                              {call.duration > 0 && (
                                <span>{Math.floor(call.duration / 60)}:{String(call.duration % 60).padStart(2, "0")}</span>
                              )}
                              <span className="font-mono text-muted-foreground/60">{call.phone}</span>
                            </div>
                          </div>
                          {call.sentiment === "positive" && <ThumbsUp className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-1" />}
                          {call.sentiment === "negative" && <ThumbsDown className="h-3 w-3 text-red-300 flex-shrink-0 mt-1" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Combined summary when 'both' */}
          {channelType === "both" && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200">
              <p className="text-xs font-semibold text-foreground mb-2">Combined Impact</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-800">{digital.leads + voice.appointments}</p>
                  <p className="text-[10px] text-muted-foreground">Leads + Appts</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-700">{digital.impressions.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Ad Impressions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-violet-700">{voice.totalCalls}</p>
                  <p className="text-[10px] text-muted-foreground">VINI Calls</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-10 gap-2 text-xs" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 text-xs border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => onOpenChange(false)}
          >
            <Settings2 className="h-3.5 w-3.5" />
            Adjust Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
