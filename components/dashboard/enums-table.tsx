"use client"

import * as React from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS, getSeverityWeight } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"
import { MarkSolvedDialog } from "./mark-solved-dialog"

interface EnumWithStats {
  id: string
  code: string
  title: string
  occurrences: number
  weightedScore: number
  lastSeen: string
  status: "OPEN" | "SOLVED" | "REGRESSED"
  scope: string
}

export function EnumsTable() {
  const { filters } = useFiltersStore()
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedEnum, setSelectedEnum] = React.useState<EnumWithStats | null>(null)
  const [showMarkSolved, setShowMarkSolved] = React.useState(false)

  // Simulate loading
  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [filters])

  const enumsWithStats = React.useMemo(() => {
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
      if (filters.dealerships.length > 0 && call.dealershipId && !filters.dealerships.includes(call.dealershipId)) return false
      if (filters.agents.length > 0 && call.agentId && !filters.agents.includes(call.agentId)) return false

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

    // Group by enum and calculate stats
    const enumStats = MOCKS.enums.map((enum_) => {
      const enumAnnotations = filteredAnnotations.filter((a) => a.enumId === enum_.id)
      const occurrences = enumAnnotations.length
      const weightedScore = enumAnnotations.reduce((sum, a) => sum + getSeverityWeight(a.severity), 0)

      // Find most recent annotation
      const lastAnnotation = enumAnnotations.sort((a, b) => {
        const reviewA = MOCKS.reviews.find((r) => r.id === a.reviewId)
        const reviewB = MOCKS.reviews.find((r) => r.id === b.reviewId)
        return new Date(reviewB?.createdAt || 0).getTime() - new Date(reviewA?.createdAt || 0).getTime()
      })[0]

      const lastSeenReview = lastAnnotation ? MOCKS.reviews.find((r) => r.id === lastAnnotation.reviewId) : null
      const lastSeen = lastSeenReview?.createdAt || enum_.updatedAt

      // Mock status calculation (in real app, would check resolutions)
      const resolution = MOCKS.resolutions.find((r) => r.enumId === enum_.id)
      let status: "OPEN" | "SOLVED" | "REGRESSED" = "OPEN"
      let scope = "GLOBAL"

      if (resolution) {
        status = resolution.status === "SOLVED" ? "SOLVED" : "OPEN"
        scope = resolution.scope
        // Mock regressed logic: if there are recent occurrences after resolution
        if (status === "SOLVED" && occurrences > 0) {
          status = "REGRESSED"
        }
      }

      return {
        id: enum_.id,
        code: enum_.code,
        title: enum_.title,
        occurrences,
        weightedScore,
        lastSeen,
        status,
        scope,
      }
    })

    // Apply enum status filter
    let filteredEnums = enumStats
    if (filters.enumStatus.length > 0) {
      filteredEnums = enumStats.filter((e) => filters.enumStatus.includes(e.status))
    }

    return filteredEnums.sort((a, b) => b.occurrences - a.occurrences)
  }, [filters])

  const exportToCsv = () => {
    const headers = ["Code", "Title", "Occurrences", "Weighted Score", "Last Seen", "Status", "Scope"]
    const csvContent = [
      headers.join(","),
      ...enumsWithStats.map((enum_) =>
        [
          enum_.code,
          `"${enum_.title}"`,
          enum_.occurrences,
          enum_.weightedScore,
          format(new Date(enum_.lastSeen), "yyyy-MM-dd"),
          enum_.status,
          enum_.scope,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `qa-enums-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Enums data has been exported to CSV",
    })
  }

  const handleMarkSolved = (enum_: EnumWithStats) => {
    setSelectedEnum(enum_)
    setShowMarkSolved(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge variant="destructive">Open</Badge>
      case "SOLVED":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Solved
          </Badge>
        )
      case "REGRESSED":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-700">
            Regressed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScopeBadge = (scope: string) => {
    const colors = {
      GLOBAL: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      DEALERSHIP: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      AGENT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      AGENT_VERSION: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    }

    return (
      <Badge variant="secondary" className={colors[scope as keyof typeof colors] || ""}>
        {scope.replace("_", " ")}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Enums Overview ({enumsWithStats.length})</CardTitle>
            <Button onClick={exportToCsv} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {enumsWithStats.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No enums found</h3>
              <p className="text-muted-foreground">No enums match your current filters.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Occurrences</TableHead>
                    <TableHead className="text-right">Weighted Score</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enumsWithStats.map((enum_) => (
                    <TableRow key={enum_.id}>
                      <TableCell className="font-mono font-medium">{enum_.code}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={enum_.title}>
                          {enum_.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {enum_.occurrences > 0 ? (
                          <Badge variant="outline">{enum_.occurrences}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {enum_.weightedScore > 0 ? (
                          <Badge variant="outline">{enum_.weightedScore}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(enum_.lastSeen), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{getStatusBadge(enum_.status)}</TableCell>
                      <TableCell>{getScopeBadge(enum_.scope)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {enum_.status === "OPEN" && (
                            <Button variant="ghost" size="sm" onClick={() => handleMarkSolved(enum_)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Solved
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View in Review
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedEnum && <MarkSolvedDialog open={showMarkSolved} onOpenChange={setShowMarkSolved} enum_={selectedEnum} />}
    </>
  )
}
