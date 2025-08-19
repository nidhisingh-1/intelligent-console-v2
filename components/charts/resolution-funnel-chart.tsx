"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS } from "@/lib/mocks"

export function ResolutionFunnelChart() {
  const { filters } = useFiltersStore()

  const funnelData = React.useMemo(() => {
    // Get all enum occurrences
    let filteredOccurrences = MOCKS.occurrences

    // Apply filters through reviews and calls
    const filteredReviews = MOCKS.reviews.filter((review) => {
      const call = MOCKS.calls.find((c) => c.id === review.callId)
      if (!call) return false

      // Apply date filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const reviewDate = new Date(review.createdAt)
        if (filters.dateRange.from && reviewDate < filters.dateRange.from) return false
        if (filters.dateRange.to && reviewDate > filters.dateRange.to) return false
      }

      // Apply dealership/agent filters
      if (filters.dealerships.length > 0 && !filters.dealerships.includes(call.dealershipId)) return false
      if (filters.agents.length > 0 && !filters.agents.includes(call.agentId)) return false

      if (filters.aiOnly) {
        const agent = MOCKS.agents.find((a) => a.id === call.agentId)
        if (!agent || agent.type !== "AI") return false
      }

      return true
    })

    filteredOccurrences = filteredOccurrences.filter((o) => filteredReviews.some((r) => r.id === o.reviewId))

    // Apply severity filter
    if (filters.severity.length > 0) {
      filteredOccurrences = filteredOccurrences.filter((o) => filters.severity.includes(o.severity))
    }

    // Calculate funnel stages
    const totalIssues = filteredOccurrences.length

    // Mock calculation for solved/regressed (in real app, this would check resolutions)
    const solvedIssues = Math.floor(totalIssues * 0.6) // 60% solved
    const regressedIssues = Math.floor(solvedIssues * 0.15) // 15% of solved regressed

    const openIssues = totalIssues - solvedIssues

    return [
      {
        stage: "Open",
        count: openIssues,
        percentage: totalIssues > 0 ? (openIssues / totalIssues) * 100 : 0,
        color: "hsl(var(--chart-1))",
      },
      {
        stage: "Solved",
        count: solvedIssues - regressedIssues,
        percentage: totalIssues > 0 ? ((solvedIssues - regressedIssues) / totalIssues) * 100 : 0,
        color: "hsl(var(--chart-2))",
      },
      {
        stage: "Regressed",
        count: regressedIssues,
        percentage: totalIssues > 0 ? (regressedIssues / totalIssues) * 100 : 0,
        color: "hsl(var(--chart-3))",
      },
    ]
  }, [filters])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolution Funnel</CardTitle>
        <CardDescription>Issue resolution status breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [`${value} issues (${props.payload.percentage.toFixed(1)}%)`, "Count"]}
            />
            <Bar dataKey="count">
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
