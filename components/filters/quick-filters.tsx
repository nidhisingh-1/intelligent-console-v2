"use client"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useFiltersStore } from "@/lib/uiState"

export function QuickFilters() {
  const { filters, setAiOnly, resetFilters } = useFiltersStore()

  const activeFiltersCount = [
    filters.dealerships.length > 0,
    filters.agents.length > 0,
    filters.severity.length > 0,
    filters.status.length > 0,
    filters.aiOnly,
    filters.enumStatus.length > 0,
    filters.dateRange.from || filters.dateRange.to,
  ].filter(Boolean).length

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="ai-only" checked={filters.aiOnly} onCheckedChange={setAiOnly} />
              <Label htmlFor="ai-only" className="text-sm font-medium">
                AI Agents Only
              </Label>
            </div>

            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="w-full bg-transparent">
                <X className="mr-2 h-4 w-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
