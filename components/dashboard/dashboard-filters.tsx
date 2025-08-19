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

export function DashboardFilters() {
  const { filters, setDealerships, setAgents, setSeverity, setEnumStatus, setAiOnly, resetFilters } = useFiltersStore()

  const dealershipOptions = MOCKS.dealerships.map((d) => ({
    value: d.id,
    label: d.name,
  }))

  const agentOptions = MOCKS.agents.map((a) => ({
    value: a.id,
    label: `${a.name} ${a.type === "AI" ? "(AI)" : ""}`,
  }))

  const severityOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
    { value: "CRITICAL", label: "Critical" },
  ]

  const enumStatusOptions = [
    { value: "OPEN", label: "Open" },
    { value: "SOLVED", label: "Solved" },
    { value: "REGRESSED", label: "Regressed" },
  ]

  const activeFiltersCount = [
    filters.dealerships.length > 0,
    filters.agents.length > 0,
    filters.severity.length > 0,
    filters.enumStatus.length > 0,
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
            <Label>Severity</Label>
            <MultiSelect
              options={severityOptions}
              value={filters.severity}
              onValueChange={setSeverity}
              placeholder="Select severity..."
            />
          </div>

          <div className="space-y-2">
            <Label>Enum Status</Label>
            <MultiSelect
              options={enumStatusOptions}
              value={filters.enumStatus}
              onValueChange={setEnumStatus}
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
