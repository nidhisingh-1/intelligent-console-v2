"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  ComposedChart
} from "recharts"
import { TrendingUp, Calendar, BarChart3, TrendingDown } from "lucide-react"
import type { DailyTrend, WeeklyTrend } from "@/services/spyne-flip/spyne-flip.types"
import { format } from "date-fns"

interface TrendsSectionProps {
  dailyTrends: DailyTrend[]
  weeklyTrends: WeeklyTrend[]
  isLoading?: boolean
}

export function TrendsSection({ dailyTrends, weeklyTrends, isLoading }: TrendsSectionProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading || !mounted) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Time-Based Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse h-80 bg-slate-700/50 rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  const dailyChartData = dailyTrends.map(d => ({
    ...d,
    displayDate: format(new Date(d.date), 'MMM d'),
    successRate: d.sessions > 0 ? ((d.successfulSessions / d.sessions) * 100).toFixed(1) : 0,
  }))

  const weeklyChartData = weeklyTrends.map(w => ({
    ...w,
    displayWeek: w.week.replace('2025-W', 'W').replace('2026-W', 'W'),
  }))

  // Calculate summary stats
  const avgDailySessions = dailyTrends.reduce((sum, d) => sum + d.sessions, 0) / dailyTrends.length
  const avgDailySuccess = dailyTrends.reduce((sum, d) => sum + d.successfulSessions, 0) / dailyTrends.length
  const latestWowGrowth = weeklyTrends[weeklyTrends.length - 1]?.wowGrowth || 0

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Time-Based Trends
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={`${latestWowGrowth >= 0 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {latestWowGrowth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {latestWowGrowth >= 0 ? '+' : ''}{latestWowGrowth.toFixed(1)}% WoW
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger 
              value="daily" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Daily View
            </TabsTrigger>
            <TabsTrigger 
              value="weekly"
              className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Weekly View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                <p className="text-sm text-slate-400 mb-1">Avg Daily Sessions</p>
                <p className="text-2xl font-bold text-white">{avgDailySessions.toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                <p className="text-sm text-slate-400 mb-1">Avg Daily Success</p>
                <p className="text-2xl font-bold text-emerald-400">{avgDailySuccess.toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                <p className="text-sm text-slate-400 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {((avgDailySuccess / avgDailySessions) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Daily Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="displayDate" stroke="#64748b" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#64748b" fontSize={11} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Legend />
                  <defs>
                    <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="successfulSessions"
                    fill="url(#successGradient)"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Successful"
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="failedSessions" 
                    fill="#ef4444" 
                    opacity={0.8}
                    radius={[4, 4, 0, 0]}
                    name="Failed"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sessions"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#22d3ee' }}
                    name="Total Sessions"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            {/* Weekly Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              {weeklyChartData.slice(-4).map((week, index) => (
                <div key={week.week} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <p className="text-sm text-slate-400 mb-1">{week.displayWeek}</p>
                  <p className="text-xl font-bold text-white">{week.sessions}</p>
                  <Badge className={`mt-2 text-xs ${
                    week.wowGrowth >= 0 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {week.wowGrowth >= 0 ? '+' : ''}{week.wowGrowth.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>

            {/* Weekly Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Growth Trend */}
              <div className="space-y-3">
                <p className="text-sm text-slate-400 uppercase tracking-wider">WoW Growth Trend</p>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="displayWeek" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#e2e8f0',
                        }}
                        formatter={(value: number) => [`${value.toFixed(1)}%`, 'Growth']}
                      />
                      <Bar dataKey="wowGrowth" radius={[4, 4, 0, 0]}>
                        {weeklyChartData.map((entry, index) => (
                          <Bar key={index} fill={entry.wowGrowth >= 0 ? '#10b981' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Feature Adoption */}
              <div className="space-y-3">
                <p className="text-sm text-slate-400 uppercase tracking-wider">Feature Adoption (%)</p>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="displayWeek" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#e2e8f0',
                        }}
                        formatter={(value: number) => [`${value}%`, '']}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="featureAdoption.studio"
                        name="Studio AI"
                        stroke="#a78bfa"
                        fill="#a78bfa"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="featureAdoption.vini"
                        name="VINI AI"
                        stroke="#22d3ee"
                        fill="#22d3ee"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="featureAdoption.both"
                        name="Both"
                        stroke="#f472b6"
                        fill="#f472b6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

