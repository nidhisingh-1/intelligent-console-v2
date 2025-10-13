"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X, Filter } from "lucide-react"
import { useFiltersStore } from "@/lib/uiState"
import { MOCKS } from "@/lib/mocks"
import { DateRangePicker } from "@/components/filters/date-range-picker"

export function CallsFilters() {
  const { filters, setDealerships, setAgents, setStatus, setCallType, setAiOnly, resetFilters } = useFiltersStore()

  const dealershipOptions = MOCKS.dealerships.map((d) => ({
    value: d.id,
    label: d.name,
  }))

  const agentOptions = MOCKS.agents.map((a) => ({
    value: a.id,
    label: `${a.name} ${a.type === "AI" ? "(AI)" : ""}`,
  }))

  const statusOptions = [
    { value: "Reviewed", label: "Reviewed" },
    { value: "Unreviewed", label: "Unreviewed" },
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
  ]

  const callTypeOptions = [
    { value: "inbound", label: "Inbound" },
    { value: "outbound", label: "Outbound" },
  ]

  const activeFiltersCount = [
    filters.dealerships.length > 0,
    filters.agents.length > 0,
    filters.status.length > 0,
    filters.callType.length > 0,
    filters.aiOnly,
    filters.dateRange.from || filters.dateRange.to,
  ].filter(Boolean).length

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount} active</Badge>}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <DateRangePicker />
          </div>

          <div className="space-y-2">
            <Label>Dealerships</Label>
            <MultiSelect
              options={dealershipOptions}
              value={filters.dealerships}
              onValueChange={setDealerships}
              placeholder="Select dealerships..."
            />
          </div>

          <div className="space-y-2">
            <Label>Agents</Label>
            <MultiSelect
              options={agentOptions}
              value={filters.agents}
              onValueChange={setAgents}
              placeholder="Select agents..."
            />
          </div>

          <div className="space-y-2">
            <Label>Call Type</Label>
            <MultiSelect
              options={callTypeOptions}
              value={filters.callType}
              onValueChange={setCallType}
              placeholder="Select call type..."
            />
          </div>

          <div className="space-y-2">
            <Label>Review Status</Label>
            <MultiSelect
              options={statusOptions}
              value={filters.status}
              onValueChange={setStatus}
              placeholder="Select status..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="ai-only" checked={filters.aiOnly} onCheckedChange={setAiOnly} />
          <Label htmlFor="ai-only">Show AI agents only</Label>
        </div>
      </div>
    </Card>
  )
}
