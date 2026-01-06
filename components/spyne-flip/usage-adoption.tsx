"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Users, Building2, TrendingUp, Repeat, Calendar, Car } from "lucide-react"
import type { SalesUserMetrics, DealerMetrics } from "@/services/spyne-flip/spyne-flip.types"

interface UsageAdoptionProps {
  salesUserMetrics: SalesUserMetrics
  dealerMetrics: DealerMetrics
  isLoading?: boolean
}

const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399']

export function UsageAdoption({ salesUserMetrics, dealerMetrics, isLoading }: UsageAdoptionProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading || !mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-200 flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              Sales User Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse h-64 bg-slate-700/50 rounded-xl" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-200 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-400" />
              Dealer Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse h-64 bg-slate-700/50 rounded-xl" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const salesUserData = [
    { name: 'DAU', value: salesUserMetrics.dau, fullName: 'Daily Active Users' },
    { name: 'WAU', value: salesUserMetrics.wau, fullName: 'Weekly Active Users' },
  ]

  const dealerSplitData = [
    { name: 'New Dealers', value: dealerMetrics.newDealersDemoed, color: '#22d3ee' },
    { name: 'Existing', value: dealerMetrics.existingDealersDemoed, color: '#a78bfa' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales User Metrics */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-400" />
            Sales User Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* DAU vs WAU */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-400">Daily Active</span>
              </div>
              <p className="text-3xl font-bold text-white">{salesUserMetrics.dau}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-slate-400">Weekly Active</span>
              </div>
              <p className="text-3xl font-bold text-white">{salesUserMetrics.wau}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-slate-400">Avg Demos/User</span>
              </div>
              <p className="text-2xl font-bold text-white">{salesUserMetrics.avgDemosPerUser.toFixed(1)}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Repeat className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-slate-400">Repeat Usage</span>
              </div>
              <p className="text-2xl font-bold text-white">{salesUserMetrics.repeatUsageRate.toFixed(1)}%</p>
            </div>
          </div>

          {/* DAU/WAU Ratio */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-800/30 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">DAU/WAU Ratio (Stickiness)</span>
              <span className="text-lg font-bold text-cyan-400">
                {((salesUserMetrics.dau / salesUserMetrics.wau) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(salesUserMetrics.dau / salesUserMetrics.wau) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dealer Metrics */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-violet-400" />
            Dealer Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            {/* Pie Chart */}
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealerSplitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {dealerSplitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-3">
              {dealerSplitData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-400">Dealers/Day</span>
              </div>
              <p className="text-2xl font-bold text-white">{dealerMetrics.dealersPerDay.toFixed(1)}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-slate-400">Dealers/Week</span>
              </div>
              <p className="text-2xl font-bold text-white">{dealerMetrics.dealersPerWeek}</p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-slate-400">Avg VINs Processed per Demo</span>
              </div>
              <span className="text-2xl font-bold text-white">{dealerMetrics.avgVinsPerDealer.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

