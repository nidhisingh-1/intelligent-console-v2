"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { TrendsData } from "@/services/roi/roi.types"

interface TrendsSectionProps {
  data: TrendsData
  isLoading?: boolean
}

type TrendTab = 'qualifiedCalls' | 'appointments' | 'revenue'

export function TrendsSection({ data, isLoading }: TrendsSectionProps) {
  const [mounted, setMounted] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<TrendTab>('qualifiedCalls')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const chartData = data[activeTab]

  const formatValue = (value: number) => {
    if (activeTab === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    }
    return value.toString()
  }

  const getChartColor = () => {
    switch (activeTab) {
      case 'qualifiedCalls': return '#10b981' // emerald
      case 'appointments': return '#8b5cf6' // violet
      case 'revenue': return '#3b82f6' // blue
      default: return '#3b82f6'
    }
  }

  const getLabel = () => {
    switch (activeTab) {
      case 'qualifiedCalls': return 'Qualified Calls'
      case 'appointments': return 'Appointments'
      case 'revenue': return 'Revenue'
      default: return ''
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const chartColor = getChartColor()

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Trends
          </CardTitle>
          
          {/* Tab Toggle */}
          <div className="inline-flex items-center rounded-lg bg-gray-100 p-0.5 text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('qualifiedCalls')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'qualifiedCalls'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Qualified Calls
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'appointments'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Appointments
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('revenue')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'revenue'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Revenue
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {mounted ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`colorValue-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#94a3b8' }}
                  tickFormatter={(value) => activeTab === 'revenue' ? `$${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [formatValue(value), getLabel()]}
                  labelFormatter={(label) => label}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#colorValue-${activeTab})`}
                  dot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: chartColor, strokeWidth: 2, stroke: 'white' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400">Loading chart...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
