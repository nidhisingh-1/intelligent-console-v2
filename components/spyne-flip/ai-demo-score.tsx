"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { AIDemoSuccessScore } from "@/services/spyne-flip/spyne-flip.types"

interface AIDemoScoreProps {
  data: AIDemoSuccessScore
  isLoading?: boolean
}

const SCORE_COLORS = {
  high: '#10b981',
  medium: '#f59e0b',
  low: '#ef4444',
}

export function AIDemoScore({ data, isLoading }: AIDemoScoreProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading || !mounted) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            AI Demo Success Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-slate-700/50 rounded-xl" />
            <div className="h-48 bg-slate-700/50 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 }
    if (score >= 50) return { label: 'Good', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: AlertTriangle }
    return { label: 'Needs Improvement', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: XCircle }
  }

  const scoreLevel = getScoreLevel(data.overallAverage)
  const ScoreIcon = scoreLevel.icon

  const totalDistribution = data.distribution.high + data.distribution.medium + data.distribution.low
  const distributionData = [
    { name: 'High (80-100)', value: data.distribution.high, color: SCORE_COLORS.high, percent: ((data.distribution.high / totalDistribution) * 100).toFixed(1) },
    { name: 'Medium (50-79)', value: data.distribution.medium, color: SCORE_COLORS.medium, percent: ((data.distribution.medium / totalDistribution) * 100).toFixed(1) },
    { name: 'Low (0-49)', value: data.distribution.low, color: SCORE_COLORS.low, percent: ((data.distribution.low / totalDistribution) * 100).toFixed(1) },
  ]

  const trendChange = data.trend.length >= 2 
    ? data.trend[data.trend.length - 1].score - data.trend[0].score 
    : 0

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-200 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-400" />
          AI Demo Success Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Overview */}
          <div className="space-y-6">
            {/* Main Score */}
            <div className={`relative p-6 rounded-2xl ${scoreLevel.bg} border border-slate-700/30`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Overall Average</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-bold text-white">{data.overallAverage.toFixed(0)}</span>
                    <span className="text-2xl text-slate-400">/100</span>
                  </div>
                  <div className={`mt-3 flex items-center gap-2 ${scoreLevel.color}`}>
                    <ScoreIcon className="h-5 w-5" />
                    <span className="font-medium">{scoreLevel.label}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-full ${scoreLevel.bg}`}>
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700/50"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(data.overallAverage / 100) * 251.2} 251.2`}
                        className={scoreLevel.color.replace('text', 'stroke')}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${scoreLevel.color}`}>
                        {trendChange >= 0 ? '+' : ''}{trendChange.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="space-y-3">
              <p className="text-sm text-slate-400 uppercase tracking-wider">Score Distribution</p>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 flex-1">
                  {distributionData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-slate-300">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-200">{item.value}</span>
                        <span className="text-xs text-slate-500 w-12 text-right">{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400 uppercase tracking-wider">Score Trend</p>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trendChange >= 0 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {trendChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trendChange >= 0 ? '+' : ''}{trendChange.toFixed(0)} pts</span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={11}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                    formatter={(value: number) => [`${value}`, 'Score']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#a78bfa', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#a78bfa', strokeWidth: 2, stroke: '#1e293b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

