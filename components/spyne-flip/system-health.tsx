"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  Clock, 
  Zap, 
  MonitorPlay, 
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react"
import type { PerformanceMetrics, ReliabilityMetrics } from "@/services/spyne-flip/spyne-flip.types"

interface SystemHealthProps {
  performance: PerformanceMetrics
  reliability: ReliabilityMetrics
  isLoading?: boolean
}

interface MetricCardProps {
  title: string
  value: number
  unit: string
  threshold: { good: number; warning: number }
  icon: React.ReactNode
  description?: string
}

function MetricCard({ title, value, unit, threshold, icon, description }: MetricCardProps) {
  const status = value <= threshold.good 
    ? 'good' 
    : value <= threshold.warning 
      ? 'warning' 
      : 'critical'

  const statusConfig = {
    good: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/30',
      icon: CheckCircle2,
      label: 'Healthy'
    },
    warning: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30',
      icon: AlertTriangle,
      label: 'Warning'
    },
    critical: { 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10', 
      border: 'border-rose-500/30',
      icon: XCircle,
      label: 'Critical'
    },
  }

  const config = statusConfig[status]
  const StatusIcon = config.icon
  const progressValue = Math.min((value / threshold.warning) * 100, 100)

  return (
    <div className={`p-4 rounded-xl ${config.bg} border ${config.border} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-800/80">
            {icon}
          </div>
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className={`text-2xl font-bold text-white`}>
              {value.toFixed(1)}{unit}
            </p>
          </div>
        </div>
        <Badge className={`${config.bg} ${config.color} ${config.border}`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>0{unit}</span>
          <span>{threshold.good}{unit}</span>
          <span>{threshold.warning}{unit}</span>
        </div>
        <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full rounded-full transition-all duration-500 ${
              status === 'good' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                : status === 'warning' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                  : 'bg-gradient-to-r from-rose-500 to-rose-400'
            }`}
            style={{ width: `${progressValue}%` }}
          />
          {/* Threshold markers */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-slate-500"
            style={{ left: `${(threshold.good / threshold.warning) * 100}%` }}
          />
        </div>
      </div>
      
      {description && (
        <p className="mt-2 text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}

export function SystemHealth({ performance, reliability, isLoading }: SystemHealthProps) {
  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-slate-700/50 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const overallHealth = React.useMemo(() => {
    const metrics = [
      { value: performance.avgScanTime, threshold: { good: 3, warning: 5 } },
      { value: performance.avgTransformTime, threshold: { good: 5, warning: 8 } },
      { value: performance.avgPreviewLoadTime, threshold: { good: 2, warning: 4 } },
      { value: performance.avgViniWidgetLoadTime, threshold: { good: 1, warning: 2 } },
      { value: reliability.pluginCrashesPerDay, threshold: { good: 2, warning: 5 } },
    ]

    const scores = metrics.map(m => {
      if (m.value <= m.threshold.good) return 100
      if (m.value <= m.threshold.warning) return 70
      return 40
    })

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }, [performance, reliability])

  const healthStatus = overallHealth >= 80 
    ? { label: 'Healthy', color: 'text-emerald-400', bg: 'bg-emerald-500' }
    : overallHealth >= 60 
      ? { label: 'Degraded', color: 'text-amber-400', bg: 'bg-amber-500' }
      : { label: 'Critical', color: 'text-rose-400', bg: 'bg-rose-500' }

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            System Health
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-400">Overall Health</p>
              <p className={`text-2xl font-bold ${healthStatus.color}`}>{overallHealth}%</p>
            </div>
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-slate-700/50"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(overallHealth / 100) * 125.6} 125.6`}
                  className={healthStatus.color.replace('text', 'stroke')}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400 uppercase tracking-wider">Performance</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Scan Time"
                value={performance.avgScanTime}
                unit="s"
                threshold={{ good: 3, warning: 5 }}
                icon={<Clock className="h-4 w-4 text-cyan-400" />}
                description="Time to analyze inventory"
              />
              <MetricCard
                title="Transform Time"
                value={performance.avgTransformTime}
                unit="s"
                threshold={{ good: 5, warning: 8 }}
                icon={<Zap className="h-4 w-4 text-violet-400" />}
                description="Image transformation"
              />
              <MetricCard
                title="Preview Load"
                value={performance.avgPreviewLoadTime}
                unit="s"
                threshold={{ good: 2, warning: 4 }}
                icon={<MonitorPlay className="h-4 w-4 text-amber-400" />}
                description="Website preview render"
              />
              <MetricCard
                title="VINI Widget"
                value={performance.avgViniWidgetLoadTime}
                unit="s"
                threshold={{ good: 1, warning: 2 }}
                icon={<MessageSquare className="h-4 w-4 text-emerald-400" />}
                description="Widget initialization"
              />
            </div>
          </div>

          {/* Reliability Metrics */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400 uppercase tracking-wider">Reliability</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-rose-500/10">
                      <Zap className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Plugin Crashes/Day</p>
                      <p className="text-2xl font-bold text-white">{reliability.pluginCrashesPerDay.toFixed(1)}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    reliability.pluginCrashesPerDay <= 2 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : reliability.pluginCrashesPerDay <= 5 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {reliability.pluginCrashesPerDay <= 2 ? 'Low' : reliability.pluginCrashesPerDay <= 5 ? 'Moderate' : 'High'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Target: &lt;2/day</span>
                  <span className="text-slate-700">•</span>
                  <span>Current: {reliability.pluginCrashesPerDay.toFixed(1)}/day</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Abrupt Terminations</p>
                      <p className="text-2xl font-bold text-white">{reliability.abruptSessionTerminations}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    reliability.abruptSessionTerminations <= 30 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : reliability.abruptSessionTerminations <= 60 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {reliability.abruptSessionTerminations <= 30 ? 'Low' : reliability.abruptSessionTerminations <= 60 ? 'Moderate' : 'High'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Target: &lt;30/period</span>
                  <span className="text-slate-700">•</span>
                  <span>Sessions unexpectedly closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

