"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Sparkles,
  Activity
} from "lucide-react"
import type { OverviewKPIs, KPIMetric } from "@/services/spyne-flip/spyne-flip.types"

interface KPICardProps {
  title: string
  metric: KPIMetric
  icon: React.ReactNode
  format?: 'number' | 'percent' | 'duration'
  accentColor: string
}

function KPICard({ title, metric, icon, format = 'number', accentColor }: KPICardProps) {
  const isPositive = metric.changePercent >= 0

  const formatValue = (value: number) => {
    if (format === 'percent') {
      return `${value.toFixed(1)}%`
    }
    if (format === 'duration') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return `${minutes}m ${seconds}s`
    }
    return value.toLocaleString()
  }

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50 hover:border-slate-600 transition-all duration-300 group`}>
      {/* Accent glow */}
      <div 
        className={`absolute top-0 left-0 w-full h-1 ${accentColor}`}
        style={{ boxShadow: `0 0 20px ${accentColor.includes('cyan') ? 'rgba(34, 211, 238, 0.3)' : accentColor.includes('violet') ? 'rgba(167, 139, 250, 0.3)' : accentColor.includes('emerald') ? 'rgba(52, 211, 153, 0.3)' : accentColor.includes('amber') ? 'rgba(251, 191, 36, 0.3)' : accentColor.includes('rose') ? 'rgba(251, 113, 133, 0.3)' : 'rgba(96, 165, 250, 0.3)'}` }}
      />
      <CardContent className="pt-6 pb-5 px-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">
                {formatValue(metric.value)}
              </span>
            </div>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{isPositive ? '+' : ''}{metric.changePercent.toFixed(1)}%</span>
              <span className="text-slate-500 ml-1">vs prev</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${accentColor.replace('bg-', 'from-')}/10 to-transparent border border-slate-700/30`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface KPICardsProps {
  data: OverviewKPIs
  isLoading?: boolean
}

export function KPICards({ data, isLoading }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i} className="bg-slate-900 border-slate-700/50 animate-pulse">
            <CardContent className="pt-6 pb-5 px-5">
              <div className="space-y-3">
                <div className="h-4 bg-slate-700/50 rounded w-24" />
                <div className="h-8 bg-slate-700/50 rounded w-20" />
                <div className="h-5 bg-slate-700/50 rounded w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const kpis = [
    {
      title: 'Total Sessions',
      metric: data.totalSessions,
      icon: <Activity className="h-5 w-5 text-cyan-400" />,
      format: 'number' as const,
      accentColor: 'bg-cyan-500',
    },
    {
      title: 'Sales Users',
      metric: data.uniqueSalesUsers,
      icon: <Users className="h-5 w-5 text-violet-400" />,
      format: 'number' as const,
      accentColor: 'bg-violet-500',
    },
    {
      title: 'Dealers Demoed',
      metric: data.uniqueDealersDemoed,
      icon: <Building2 className="h-5 w-5 text-blue-400" />,
      format: 'number' as const,
      accentColor: 'bg-blue-500',
    },
    {
      title: 'Success Rate',
      metric: data.demoSuccessRate,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      format: 'percent' as const,
      accentColor: 'bg-emerald-500',
    },
    {
      title: 'Avg Duration',
      metric: data.avgDemoDuration,
      icon: <Clock className="h-5 w-5 text-amber-400" />,
      format: 'duration' as const,
      accentColor: 'bg-amber-500',
    },
    {
      title: 'VINI Usage',
      metric: data.demosWithViniPercent,
      icon: <MessageSquare className="h-5 w-5 text-rose-400" />,
      format: 'percent' as const,
      accentColor: 'bg-rose-500',
    },
    {
      title: 'Studio Transform',
      metric: data.demosWithStudioTransformPercent,
      icon: <Sparkles className="h-5 w-5 text-fuchsia-400" />,
      format: 'percent' as const,
      accentColor: 'bg-fuchsia-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}

