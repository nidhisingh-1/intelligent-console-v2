"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  KPICard, 
  AIScoreSection, 
  DealerCoverageSection, 
  TrendsChartSection,
  Activity, Users, Building2, CheckCircle2, Clock, MessageSquare, Sparkles, Trophy,
  mockOverviewKPIs, mockSalesLeaderboard
} from "@/components/spyne-flip/shared-components"

export default function OverviewPage() {
  const kpis = mockOverviewKPIs

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <KPICard title="Total Sessions" value={kpis.totalSessions.value} change={kpis.totalSessions.changePercent} icon={Activity} color="bg-cyan-500" />
        <KPICard title="Sales Users" value={kpis.uniqueSalesUsers.value} change={kpis.uniqueSalesUsers.changePercent} icon={Users} color="bg-violet-500" />
        <KPICard title="Dealers Demoed" value={kpis.uniqueDealersDemoed.value} change={kpis.uniqueDealersDemoed.changePercent} icon={Building2} color="bg-blue-500" />
        <KPICard title="Success Rate" value={kpis.demoSuccessRate.value} change={kpis.demoSuccessRate.changePercent} format="percent" icon={CheckCircle2} color="bg-green-500" />
        <KPICard title="Avg Duration" value={kpis.avgDemoDuration.value} change={kpis.avgDemoDuration.changePercent} format="duration" icon={Clock} color="bg-amber-500" />
        <KPICard title="VINI Usage" value={kpis.demosWithViniPercent.value} change={kpis.demosWithViniPercent.changePercent} format="percent" icon={MessageSquare} color="bg-pink-500" />
        <KPICard title="Studio Transform" value={kpis.demosWithStudioTransformPercent.value} change={kpis.demosWithStudioTransformPercent.changePercent} format="percent" icon={Sparkles} color="bg-purple-500" />
      </div>

      {/* AI Score Section */}
      <AIScoreSection />

      {/* Coverage & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DealerCoverageSection />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSalesLeaderboard.slice(0, 3).map((user, i) => (
              <div key={user.userId} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-50/50 to-transparent border">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  i === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                  i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                  'bg-gradient-to-br from-amber-600 to-amber-700'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.userName}</p>
                  <p className="text-xs text-muted-foreground">{user.totalDemos} demos • {user.successRate.toFixed(0)}% success</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">{user.avgScore}</span>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <TrendsChartSection />
    </div>
  )
}
