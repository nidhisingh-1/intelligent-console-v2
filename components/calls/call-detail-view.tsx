"use client"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Clock, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AudioPlayer } from "@/components/audio/audio-player"
import { TranscriptView } from "@/components/transcript/transcript-view"
import { AnnotationsList } from "@/components/annotations/annotations-list"
import { ReviewSummaryCard } from "@/components/calls/review-summary-card"
import { MOCKS, formatDuration } from "@/lib/mocks"
import type { Call } from "@/lib/types"

interface CallDetailViewProps {
  call: Call
}

export function CallDetailView({ call }: CallDetailViewProps) {
  const agent = MOCKS.agents.find((a) => a.id === call.agentId)!
  const dealership = MOCKS.dealerships.find((d) => d.id === call.dealershipId)!
  const review = MOCKS.reviews.find((r) => r.callId === call.id)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/review">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calls
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Call {call.id}</h1>
              <Badge variant={agent.type === "AI" ? "default" : "secondary"}>{agent.type}</Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                {dealership.name}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {agent.name}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(call.startedAt), "MMM d, yyyy 'at' HH:mm")}
              </div>
              <span>Duration: {formatDuration(call.durationSec)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Panel - Audio & Waveform */}
          <div className="border-r bg-card">
            <div className="p-6 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Audio Recording</h2>
                <p className="text-sm text-muted-foreground">Customer: {call.customerPhoneMasked}</p>
              </div>

              <div className="flex-1">
                <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSec} callId={call.id} />
              </div>
            </div>
          </div>

          {/* Right Panel - Transcript & Annotations */}
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Transcript */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Transcript</h2>
                    <TranscriptView transcript={call.transcript} callId={call.id} />
                  </div>

                  <Separator />

                  {/* Annotations */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Annotations</h2>
                    <AnnotationsList callId={call.id} />
                  </div>
                </div>
              </div>
            </div>

            {/* Review Summary - Fixed at bottom */}
            <div className="border-t bg-card p-6">
              <ReviewSummaryCard callId={call.id} review={review} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
