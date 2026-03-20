"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, LayoutGrid } from "lucide-react"
import type { DashboardFilters, CampaignStatus, MediaType, SegmentView } from "@/services/inventory/inventory.types"

interface FiltersPanelProps {
  filters: DashboardFilters
  onFiltersChange: (filters: Partial<DashboardFilters>) => void
  segmentView?: SegmentView
  onSegmentViewChange?: (view: SegmentView) => void
}

const segmentOptions: { value: SegmentView; label: string }[] = [
  { value: "stage", label: "Stage" },
  { value: "priceBand", label: "Price Band" },
  { value: "source", label: "Source" },
  { value: "mediaType", label: "Media Type" },
]

export function FiltersPanel({ filters, onFiltersChange, segmentView, onSegmentViewChange }: FiltersPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by VIN, make, model..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-9 h-9"
        />
      </div>

      <Select
        value={filters.campaignStatus}
        onValueChange={(v) => onFiltersChange({ campaignStatus: v as CampaignStatus | "all" })}
      >
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Campaigns</SelectItem>
          <SelectItem value="none">No Campaign Active</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="scheduled">Scheduled</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.mediaType}
        onValueChange={(v) => onFiltersChange({ mediaType: v as MediaType | "all" })}
      >
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Media" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Media</SelectItem>
          <SelectItem value="clone">Clone Media</SelectItem>
          <SelectItem value="real">Real Media</SelectItem>
          <SelectItem value="none">No Media</SelectItem>
        </SelectContent>
      </Select>

      {/* Segmentation toggle */}
      {onSegmentViewChange && segmentView && (
        <div className="flex items-center gap-1.5 ml-auto">
          <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium mr-1">View by:</span>
          <div className="flex items-center p-0.5 rounded-lg bg-gray-100">
            {segmentOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSegmentViewChange(opt.value)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
                  segmentView === opt.value
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
