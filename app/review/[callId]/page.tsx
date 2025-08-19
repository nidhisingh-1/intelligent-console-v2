import { notFound } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { CallDetailView } from "@/components/calls/call-detail-view"
import { MOCKS } from "@/lib/mocks"

interface CallDetailPageProps {
  params: {
    callId: string
  }
}

export default function CallDetailPage({ params }: CallDetailPageProps) {
  const call = MOCKS.calls.find((c) => c.id === params.callId)

  if (!call) {
    notFound()
  }

  return (
    <AppShell>
      <CallDetailView call={call} />
    </AppShell>
  )
}
