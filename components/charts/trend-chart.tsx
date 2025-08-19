"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { format, subDays, eachDayOfInterval } from "date-fns"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS, getSeverityWeight } from "@/lib/mocks"

export function TrendChart() {
  const { filters } = useFiltersStore()

  const chartData = React.useMemo(() => {
    // Generate date range for the last 14 days
    const endDate = new Date()
    const startDate = subDays(endDate, 13)
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

    return dateRange.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd")

      // Get reviews for this date
      const dayReviews = MOCKS.reviews.filter((review) => {
        const reviewDate = format(new Date(review.createdAt), "yyyy-MM-dd")
        if (reviewDate !== dateStr) return false

        // Apply filters
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

      // Get annotations for this date
      const dayAnnotations = MOCKS.annotations.filter((annotation) =>
        dayReviews.some((r) => r.id === annotation.reviewId),
      )

      // Apply severity filter
      const filteredAnnotations =
        filters.severity.length > 0
          ? dayAnnotations.filter((a) => filters.severity.includes(a.severity))
          : dayAnnotations

      // Calculate metrics
      const reviewCount = dayReviews.length
      const totalWeight = filteredAnnotations.reduce((sum, a) => sum + getSeverityWeight(a.severity), 0)
      const maxPossibleWeight = filteredAnnotations.length * 4
      const weightedScore = maxPossibleWeight > 0 ? ((maxPossibleWeight - totalWeight) / maxPossibleWeight) * 100 : 100

      return {
        date: format(date, "MMM dd"),
        reviews: reviewCount,
        qualityScore: Math.round(weightedScore),
      }
    })
  }, [filters])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Analysis</CardTitle>
        <CardDescription>Daily review counts and quality scores over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="reviews"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Reviews"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="qualityScore"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Quality Score (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
