"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, Users, Building2, Target, Clock, MessageSquare, Sparkles } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}m ${secs}s`
}

function formatChange(change: number, changePercent: number): { text: string; isPositive: boolean } {
  const sign = change >= 0 ? "+" : ""
  const percentSign = changePercent >= 0 ? "+" : ""
  return {
    text: `${sign}${change.toLocaleString()} (${percentSign}${changePercent.toFixed(1)}%)`,
    isPositive: change >= 0,
  }
}

export function OverviewKPICards() {
  const overviewKPIs = useSelector((state: RootState) => state.spyneFlip.overviewKPIs)
  const isLoading = useSelector((state: RootState) => state.spyneFlip.loading.overview)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!overviewKPIs) {
    return null
  }

  const kpiCards = [
    {
      title: "Total Demo Sessions",
      value: overviewKPIs.totalSessions.value.toLocaleString(),
      change: formatChange(overviewKPIs.totalSessions.change, overviewKPIs.totalSessions.changePercent),
      icon: Target,
      description: "Total plugin sessions",
    },
    {
      title: "Unique Sales Users",
      value: overviewKPIs.uniqueSalesUsers.value.toLocaleString(),
      change: formatChange(overviewKPIs.uniqueSalesUsers.change, overviewKPIs.uniqueSalesUsers.changePercent),
      icon: Users,
      description: "Active sales users",
    },
    {
      title: "Unique Dealers Demoed",
      value: overviewKPIs.uniqueDealersDemoed.value.toLocaleString(),
      change: formatChange(overviewKPIs.uniqueDealersDemoed.change, overviewKPIs.uniqueDealersDemoed.changePercent),
      icon: Building2,
      description: "Dealers with demos",
    },
    {
      title: "Demo Success Rate",
      value: `${overviewKPIs.demoSuccessRate.value.toFixed(1)}%`,
      change: formatChange(overviewKPIs.demoSuccessRate.change, overviewKPIs.demoSuccessRate.changePercent),
      icon: Target,
      description: "Successful demos",
    },
    {
      title: "Avg Demo Duration",
      value: formatDuration(overviewKPIs.avgDemoDuration.value),
      change: formatChange(overviewKPIs.avgDemoDuration.change, overviewKPIs.avgDemoDuration.changePercent),
      icon: Clock,
      description: "Average session time",
    },
    {
      title: "% Demos with VINI",
      value: `${overviewKPIs.demosWithViniPercent.value.toFixed(1)}%`,
      change: formatChange(overviewKPIs.demosWithViniPercent.change, overviewKPIs.demosWithViniPercent.changePercent),
      icon: MessageSquare,
      description: "VINI interactions",
    },
    {
      title: "% Studio Transform",
      value: `${overviewKPIs.demosWithStudioTransformPercent.value.toFixed(1)}%`,
      change: formatChange(overviewKPIs.demosWithStudioTransformPercent.change, overviewKPIs.demosWithStudioTransformPercent.changePercent),
      icon: Sparkles,
      description: "Studio AI completed",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="bg-card/80 backdrop-blur-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {kpi.change.isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <p
                  className={`text-xs ${
                    kpi.change.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.change.text}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

