"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, TrendingDown, ArrowRight } from "lucide-react"
import type { DemoFunnel as DemoFunnelType } from "@/services/spyne-flip/spyne-flip.types"

interface DemoFunnelProps {
  data: DemoFunnelType
  isLoading?: boolean
}

const STEP_COLORS = [
  { bg: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400', bar: 'bg-cyan-500' },
  { bg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', text: 'text-blue-400', bar: 'bg-blue-500' },
  { bg: 'from-violet-500/20 to-violet-500/5', border: 'border-violet-500/30', text: 'text-violet-400', bar: 'bg-violet-500' },
  { bg: 'from-fuchsia-500/20 to-fuchsia-500/5', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bar: 'bg-fuchsia-500' },
  { bg: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/30', text: 'text-pink-400', bar: 'bg-pink-500' },
  { bg: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/30', text: 'text-rose-400', bar: 'bg-rose-500' },
  { bg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-400', bar: 'bg-orange-500' },
  { bg: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-400', bar: 'bg-amber-500' },
  { bg: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  { bg: 'from-teal-500/20 to-teal-500/5', border: 'border-teal-500/30', text: 'text-teal-400', bar: 'bg-teal-500' },
]

export function DemoFunnel({ data, isLoading }: DemoFunnelProps) {
  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Layers className="h-5 w-5 text-violet-400" />
            Demo Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-700/50 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxCount = data.steps[0]?.count || 1

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Layers className="h-5 w-5 text-violet-400" />
            Demo Funnel
          </CardTitle>
          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600">
            {data.totalSessions.toLocaleString()} Total Sessions
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.steps.map((step, index) => {
            const color = STEP_COLORS[index % STEP_COLORS.length]
            const widthPercent = (step.count / maxCount) * 100
            const prevStep = data.steps[index - 1]
            const isDropOff = step.dropOff > 0

            return (
              <div key={step.step} className="group">
                <div className={`relative p-4 rounded-xl bg-gradient-to-r ${color.bg} border ${color.border} transition-all duration-300 hover:scale-[1.01]`}>
                  {/* Progress bar background */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div 
                      className={`h-full ${color.bar} opacity-10 transition-all duration-500`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 ${color.text} font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-slate-200 font-medium">{step.step}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-lg font-bold ${color.text}`}>
                            {step.count.toLocaleString()}
                          </span>
                          {index > 0 && (
                            <Badge className={`text-xs ${
                              step.conversionRate >= 90 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                : step.conversionRate >= 70 
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}>
                              {step.conversionRate.toFixed(1)}% conv.
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {isDropOff && (
                      <div className="flex items-center gap-2 text-rose-400">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          -{step.dropOff.toLocaleString()} drop
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector */}
                {index < data.steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowRight className="h-4 w-4 text-slate-600 rotate-90" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-1">Overall Conversion</p>
              <p className="text-2xl font-bold text-cyan-400">
                {((data.steps[data.steps.length - 1]?.count / data.steps[0]?.count) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-1">Biggest Drop-off</p>
              <p className="text-2xl font-bold text-rose-400">
                {Math.max(...data.steps.map(s => s.dropOff)).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-1">Total Completed</p>
              <p className="text-2xl font-bold text-emerald-400">
                {data.steps[data.steps.length - 1]?.count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

