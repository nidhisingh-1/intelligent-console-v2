"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ClipboardCheck, TrendingUp, AlertTriangle, Target } from "lucide-react"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS, getSeverityWeight } from "@/lib/mocks"

export function KpiCards() {
  const { filters } = useFiltersStore()
  const [isLoading, setIsLoading] = React.useState(true)

  // Simulate loading
  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timeout)
  }, [filters])

  const kpis = React.useMemo(() => {
    // Filter reviews based on current filters
    let filteredReviews = MOCKS.reviews

    // Apply date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredReviews = filteredReviews.filter((review) => {
        const reviewDate = new Date(review.createdAt)
        if (filters.dateRange.from && reviewDate < filters.dateRange.from) return false
        if (filters.dateRange.to && reviewDate > filters.dateRange.to) return false
        return true
      })
    }

    // Apply dealership/agent filters by checking associated calls
    if (filters.dealerships.length > 0 || filters.agents.length > 0 || filters.aiOnly) {
      filteredReviews = filteredReviews.filter((review) => {
        const call = MOCKS.calls.find((c) => c.id === review.callId)
        if (!call) return false

        if (filters.dealerships.length > 0 && !filters.dealerships.includes(call.dealershipId)) return false
        if (filters.agents.length > 0 && !filters.agents.includes(call.agentId)) return false

        if (filters.aiOnly) {
          const agent = MOCKS.agents.find((a) => a.id === call.agentId)
          if (!agent || agent.type !== "AI") return false
        }

        return true
      })
    }

    const reviewsDone = filteredReviews.length
    const passedReviews = filteredReviews.filter((r) => r.pass === true).length
    const passRate = reviewsDone > 0 ? (passedReviews / reviewsDone) * 100 : 0

    // Get unique enums from annotations
    const annotations = MOCKS.annotations.filter((a) => filteredReviews.some((r) => r.id === a.reviewId))
    const uniqueEnums = new Set(annotations.filter((a) => a.enumId).map((a) => a.enumId)).size

    // Calculate severity-weighted score
    const totalWeight = annotations.reduce((sum, annotation) => sum + getSeverityWeight(annotation.severity), 0)
    const maxPossibleWeight = annotations.length * 4 // Max weight is 4 (CRITICAL)
    const weightedScore = maxPossibleWeight > 0 ? ((maxPossibleWeight - totalWeight) / maxPossibleWeight) * 100 : 100

    return {
      reviewsDone,
      passRate,
      uniqueEnums,
      weightedScore,
    }
  }, [filters])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews Done</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis.reviewsDone}</div>
          <p className="text-xs text-muted-foreground">Total completed reviews</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis.passRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Calls meeting quality standards</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Enums</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis.uniqueEnums}</div>
          <p className="text-xs text-muted-foreground">Different issue types identified</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis.weightedScore.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Severity-weighted performance</p>
        </CardContent>
      </Card>
    </div>
  )
}
