"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS, getSeverityWeight } from "@/lib/mocks"

export function TopEnumsChart() {
  const { filters } = useFiltersStore()

  const chartData = React.useMemo(() => {
    // Get filtered annotations
    let filteredAnnotations = MOCKS.annotations

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

    filteredAnnotations = filteredAnnotations.filter((a) => filteredReviews.some((r) => r.id === a.reviewId))

    // Apply severity filter
    if (filters.severity.length > 0) {
      filteredAnnotations = filteredAnnotations.filter((a) => filters.severity.includes(a.severity))
    }

    // Group by enum
    const enumStats = filteredAnnotations.reduce(
      (acc, annotation) => {
        if (!annotation.enumId) return acc

        const enum_ = MOCKS.enums.find((e) => e.id === annotation.enumId)
        if (!enum_) return acc

        const key = enum_.code
        if (!acc[key]) {
          acc[key] = {
            code: enum_.code,
            title: enum_.title,
            frequency: 0,
            weightedScore: 0,
          }
        }

        acc[key].frequency += 1
        acc[key].weightedScore += getSeverityWeight(annotation.severity)

        return acc
      },
      {} as Record<string, { code: string; title: string; frequency: number; weightedScore: number }>,
    )

    return Object.values(enumStats)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
  }, [filters])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Enums</CardTitle>
        <CardDescription>Most frequently occurring quality issues</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frequency" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="frequency">By Frequency</TabsTrigger>
            <TabsTrigger value="weighted">By Weighted Score</TabsTrigger>
          </TabsList>

          <TabsContent value="frequency" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="code" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [value, name === "frequency" ? "Occurrences" : "Weighted Score"]}
                  labelFormatter={(label) => {
                    const item = chartData.find((d) => d.code === label)
                    return item ? `${item.code}: ${item.title}` : label
                  }}
                />
                <Bar dataKey="frequency" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="weighted" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[...chartData].sort((a, b) => b.weightedScore - a.weightedScore)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="code" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [value, name === "weightedScore" ? "Weighted Score" : "Occurrences"]}
                  labelFormatter={(label) => {
                    const item = chartData.find((d) => d.code === label)
                    return item ? `${item.code}: ${item.title}` : label
                  }}
                />
                <Bar dataKey="weightedScore" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
