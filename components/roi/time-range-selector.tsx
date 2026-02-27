"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import type { TimeRange } from "@/services/roi/roi.types"

interface TimeRangeSelectorProps {
  value: TimeRange
  onChange: (value: TimeRange) => void
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-gray-400" />
      <Select value={value} onValueChange={(v) => onChange(v as TimeRange)}>
        <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="this_week">This Week</SelectItem>
          <SelectItem value="mtd">Month to Date</SelectItem>
          <SelectItem value="last_month">Last Month</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
