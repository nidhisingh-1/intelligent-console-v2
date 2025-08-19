"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, Play, ExternalLink, Clock, Phone } from "lucide-react"
import { useCallsQuery } from "@/lib/uiState"
import { MOCKS, formatDuration, getSeverityColor } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"
import type { Call, Agent, Dealership, QAReview } from "@/lib/types"

interface CallWithDetails extends Call {
  agent: Agent
  dealership: Dealership
  review?: QAReview
  enumCount: number
  severityHeat: { severity: string; count: number }[]
}

export function CallsTable() {
  const { data: calls, isLoading } = useCallsQuery()

  const callsWithDetails: CallWithDetails[] = React.useMemo(() => {
    if (!calls) return []

    return calls.map((call) => {
      const agent = MOCKS.agents.find((a) => a.id === call.agentId)!
      const dealership = MOCKS.dealerships.find((d) => d.id === call.dealershipId)!
      const review = MOCKS.reviews.find((r) => r.callId === call.id)

      // Calculate enum count and severity heat from annotations
      const annotations = MOCKS.annotations.filter((a) =>
        MOCKS.reviews.some((r) => r.id === a.reviewId && r.callId === call.id),
      )

      const enumCount = annotations.length
      const severityHeat = annotations.reduce(
        (acc, annotation) => {
          const existing = acc.find((s) => s.severity === annotation.severity)
          if (existing) {
            existing.count++
          } else {
            acc.push({ severity: annotation.severity, count: 1 })
          }
          return acc
        },
        [] as { severity: string; count: number }[],
      )

      return {
        ...call,
        agent,
        dealership,
        review,
        enumCount,
        severityHeat,
      }
    })
  }, [calls])

  const copyCallId = (callId: string) => {
    navigator.clipboard.writeText(callId)
    toast({
      title: "Copied to clipboard",
      description: `Call ID ${callId} copied to clipboard`,
    })
  }

  const getReviewStatusBadge = (review?: QAReview) => {
    if (!review) {
      return <Badge variant="outline">Unreviewed</Badge>
    }
    if (review.pass === null) {
      return <Badge variant="secondary">In Progress</Badge>
    }
    if (review.pass) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Pass
        </Badge>
      )
    }
    return <Badge variant="destructive">Fail</Badge>
  }

  const SeverityHeatBar = ({ severityHeat }: { severityHeat: { severity: string; count: number }[] }) => {
    if (severityHeat.length === 0) return <div className="w-16 h-2 bg-gray-200 rounded" />

    const total = severityHeat.reduce((sum, s) => sum + s.count, 0)

    return (
      <div className="flex w-16 h-2 rounded overflow-hidden">
        {severityHeat.map((item, index) => (
          <div
            key={index}
            className={`h-full ${getSeverityColor(item.severity as any).split(" ")[0]}`}
            style={{ width: `${(item.count / total) * 100}%` }}
            title={`${item.severity}: ${item.count}`}
          />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (!callsWithDetails.length) {
    return (
      <Card className="p-12 text-center">
        <Phone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No calls found</h3>
        <p className="text-muted-foreground">
          No calls match your current filters. Try adjusting your search criteria.
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Calls ({callsWithDetails.length})</h2>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call ID</TableHead>
                <TableHead>Dealership</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsWithDetails.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{call.id}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCallId(call.id)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{call.dealership.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{call.agent.name}</span>
                      <Badge variant={call.agent.type === "AI" ? "default" : "secondary"} className="text-xs">
                        {call.agent.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(new Date(call.startedAt), "MMM d, HH:mm")}
                    </div>
                  </TableCell>
                  <TableCell>{formatDuration(call.durationSec)}</TableCell>
                  <TableCell>{getReviewStatusBadge(call.review)}</TableCell>
                  <TableCell>
                    {call.enumCount > 0 ? (
                      <Badge variant="outline">{call.enumCount}</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <SeverityHeatBar severityHeat={call.severityHeat} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {call.recordingUrl && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/review/${call.id}`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}
