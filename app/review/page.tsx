import { AppShell } from "@/components/app-shell"
import { CallsTable } from "@/components/calls/calls-table"
import { CallsFilters } from "@/components/calls/calls-filters"

export default function ReviewPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Call Review Dashboard</h1>
          <p className="text-muted-foreground">Review and annotate customer service calls for quality assurance.</p>
        </div>

        <CallsFilters />
        <CallsTable />
      </div>
    </AppShell>
  )
}
