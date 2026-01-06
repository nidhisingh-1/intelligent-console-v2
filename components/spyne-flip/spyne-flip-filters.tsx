"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronDown, X, Filter, RotateCcw } from "lucide-react"
import type { SpyneFlipFilters, DateRange } from "@/services/spyne-flip/spyne-flip.types"
import { mockSalesUsers, mockDealers } from "@/lib/spyne-flip-mocks"

interface SpyneFlipFiltersProps {
  filters: SpyneFlipFilters
  onFiltersChange: (filters: SpyneFlipFilters) => void
}

export function SpyneFlipFiltersComponent({ filters, onFiltersChange }: SpyneFlipFiltersProps) {
  const [salesUserOpen, setSalesUserOpen] = React.useState(false)
  const [dealerOpen, setDealerOpen] = React.useState(false)

  const handleDateRangeChange = (value: DateRange) => {
    onFiltersChange({
      ...filters,
      dateRange: value,
      customDateFrom: undefined,
      customDateTo: undefined,
    })
  }

  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    if (filters.salesUserId) count++
    if (filters.dealerId) count++
    if (filters.dealerType && filters.dealerType !== 'all') count++
    if (filters.pageType && filters.pageType !== 'all') count++
    if (filters.feature && filters.feature !== 'all') count++
    return count
  }, [filters])

  const resetFilters = () => {
    onFiltersChange({
      dateRange: '7d',
      dealerType: 'all',
      pageType: 'all',
      feature: 'all',
    })
  }

  const selectedSalesUser = mockSalesUsers.find(u => u.id === filters.salesUserId)
  const selectedDealer = mockDealers.find(d => d.id === filters.dealerId)

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
      {/* Date Range */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-slate-400" />
        <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-[140px] bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="today" className="text-slate-200 focus:bg-slate-700">Today</SelectItem>
            <SelectItem value="7d" className="text-slate-200 focus:bg-slate-700">Last 7 Days</SelectItem>
            <SelectItem value="30d" className="text-slate-200 focus:bg-slate-700">Last 30 Days</SelectItem>
            <SelectItem value="custom" className="text-slate-200 focus:bg-slate-700">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filters.dateRange === 'custom' && (
        <div className="flex items-center gap-2">
          <DatePicker
            value={filters.customDateFrom}
            onValueChange={(date) => onFiltersChange({ ...filters, customDateFrom: date })}
            placeholder="Start date"
            className="w-auto bg-slate-800/80 border-slate-600"
          />
          <span className="text-slate-400">to</span>
          <DatePicker
            value={filters.customDateTo}
            onValueChange={(date) => onFiltersChange({ ...filters, customDateTo: date })}
            placeholder="End date"
            className="w-auto bg-slate-800/80 border-slate-600"
          />
        </div>
      )}

      <div className="w-px h-6 bg-slate-600" />

      {/* Sales User */}
      <Popover open={salesUserOpen} onOpenChange={setSalesUserOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`justify-between bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors min-w-[160px] ${
              filters.salesUserId ? 'border-cyan-500/50 bg-cyan-500/10' : ''
            }`}
          >
            <span className="truncate">
              {selectedSalesUser?.name || 'Sales User'}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0 bg-slate-800 border-slate-600">
          <Command className="bg-transparent">
            <CommandInput placeholder="Search users..." className="text-slate-200" />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all-users"
                  onSelect={() => {
                    onFiltersChange({ ...filters, salesUserId: undefined })
                    setSalesUserOpen(false)
                  }}
                  className="text-slate-200 hover:bg-slate-700"
                >
                  All Sales Users
                </CommandItem>
                {mockSalesUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    onSelect={() => {
                      onFiltersChange({ ...filters, salesUserId: user.id })
                      setSalesUserOpen(false)
                    }}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Dealer */}
      <Popover open={dealerOpen} onOpenChange={setDealerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`justify-between bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors min-w-[180px] max-w-[240px] ${
              filters.dealerId ? 'border-cyan-500/50 bg-cyan-500/10' : ''
            }`}
          >
            <span className="truncate">
              {selectedDealer?.name || 'Dealer'}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 bg-slate-800 border-slate-600">
          <Command className="bg-transparent">
            <CommandInput placeholder="Search dealers..." className="text-slate-200" />
            <CommandList>
              <CommandEmpty>No dealers found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all-dealers"
                  onSelect={() => {
                    onFiltersChange({ ...filters, dealerId: undefined })
                    setDealerOpen(false)
                  }}
                  className="text-slate-200 hover:bg-slate-700"
                >
                  All Dealers
                </CommandItem>
                {mockDealers.map((dealer) => (
                  <CommandItem
                    key={dealer.id}
                    value={dealer.name}
                    onSelect={() => {
                      onFiltersChange({ ...filters, dealerId: dealer.id })
                      setDealerOpen(false)
                    }}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    {dealer.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Dealer Type */}
      <Select 
        value={filters.dealerType || 'all'} 
        onValueChange={(value) => onFiltersChange({ ...filters, dealerType: value as any })}
      >
        <SelectTrigger className={`w-[140px] bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors ${
          filters.dealerType && filters.dealerType !== 'all' ? 'border-cyan-500/50 bg-cyan-500/10' : ''
        }`}>
          <SelectValue placeholder="Dealer Type" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">All Dealers</SelectItem>
          <SelectItem value="new" className="text-slate-200 focus:bg-slate-700">New Dealers</SelectItem>
          <SelectItem value="existing" className="text-slate-200 focus:bg-slate-700">Existing Dealers</SelectItem>
        </SelectContent>
      </Select>

      {/* Page Type */}
      <Select 
        value={filters.pageType || 'all'} 
        onValueChange={(value) => onFiltersChange({ ...filters, pageType: value as any })}
      >
        <SelectTrigger className={`w-[120px] bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors ${
          filters.pageType && filters.pageType !== 'all' ? 'border-cyan-500/50 bg-cyan-500/10' : ''
        }`}>
          <SelectValue placeholder="Page" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">All Pages</SelectItem>
          <SelectItem value="vlp" className="text-slate-200 focus:bg-slate-700">VLP Only</SelectItem>
          <SelectItem value="vdp" className="text-slate-200 focus:bg-slate-700">VDP Only</SelectItem>
        </SelectContent>
      </Select>

      {/* Feature */}
      <Select 
        value={filters.feature || 'all'} 
        onValueChange={(value) => onFiltersChange({ ...filters, feature: value as any })}
      >
        <SelectTrigger className={`w-[130px] bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700/80 transition-colors ${
          filters.feature && filters.feature !== 'all' ? 'border-cyan-500/50 bg-cyan-500/10' : ''
        }`}>
          <SelectValue placeholder="Feature" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">All Features</SelectItem>
          <SelectItem value="studio" className="text-slate-200 focus:bg-slate-700">Studio AI</SelectItem>
          <SelectItem value="vini" className="text-slate-200 focus:bg-slate-700">VINI AI</SelectItem>
          <SelectItem value="both" className="text-slate-200 focus:bg-slate-700">Both</SelectItem>
        </SelectContent>
      </Select>

      {/* Active Filters Badge & Reset */}
      {activeFiltersCount > 0 && (
        <>
          <div className="w-px h-6 bg-slate-600" />
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30">
            <Filter className="h-3 w-3 mr-1" />
            {activeFiltersCount} Active
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </>
      )}
    </div>
  )
}

