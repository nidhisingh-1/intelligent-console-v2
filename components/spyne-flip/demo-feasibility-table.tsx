"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Monitor,
  ChevronUp,
  ChevronDown,
  Shield,
  Zap
} from "lucide-react"
import type { DealerDemoFeasibility, DemoFeasibilityStatus } from "@/services/spyne-flip/spyne-flip.types"

interface DemoFeasibilityTableProps {
  data: DealerDemoFeasibility[]
  isLoading?: boolean
}

export function DemoFeasibilityTable({ data, isLoading }: DemoFeasibilityTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortField, setSortField] = React.useState<keyof DealerDemoFeasibility | null>('dealerName')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [filterStatus, setFilterStatus] = React.useState<DemoFeasibilityStatus | 'all'>('all')

  const handleSort = (field: keyof DealerDemoFeasibility) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = React.useMemo(() => {
    let result = [...data]

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((d) => d.flipDemoPossible === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (d) =>
          d.dealerName.toLowerCase().includes(term) ||
          d.websiteUrl.toLowerCase().includes(term)
      )
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let aVal = a[sortField] as string
        let bVal = b[sortField] as string

        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, searchTerm, sortField, sortDirection, filterStatus])

  const SortableHeader = ({ field, children }: { field: keyof DealerDemoFeasibility; children: React.ReactNode }) => (
    <TableHead
      className="text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <div className="flex flex-col ml-1">
          <ChevronUp className={`h-3 w-3 ${sortField === field && sortDirection === 'asc' ? 'text-violet-500' : 'text-muted-foreground/40'}`} />
          <ChevronDown className={`h-3 w-3 -mt-1 ${sortField === field && sortDirection === 'desc' ? 'text-violet-500' : 'text-muted-foreground/40'}`} />
        </div>
      </div>
    </TableHead>
  )

  const getStatusBadge = (status: DemoFeasibilityStatus) => {
    switch (status) {
      case 'yes':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Yes
          </Badge>
        )
      case 'partial':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        )
      case 'no':
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">
            <XCircle className="h-3 w-3 mr-1" />
            No
          </Badge>
        )
    }
  }

  // Calculate stats
  const stats = React.useMemo(() => {
    const yes = data.filter(d => d.flipDemoPossible === 'yes').length
    const partial = data.filter(d => d.flipDemoPossible === 'partial').length
    const no = data.filter(d => d.flipDemoPossible === 'no').length
    return { yes, partial, no, total: data.length }
  }, [data])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            Demo Feasibility Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Dealers</p>
                <p className="text-2xl font-bold text-violet-700">{stats.total}</p>
              </div>
              <div className="p-3 bg-violet-100 rounded-xl">
                <Sparkles className="h-5 w-5 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flip Ready</p>
                <p className="text-2xl font-bold text-emerald-700">{stats.yes}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Partial Support</p>
                <p className="text-2xl font-bold text-amber-700">{stats.partial}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-rose-50 to-red-50 border-rose-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Console Only</p>
                <p className="text-2xl font-bold text-rose-700">{stats.no}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-xl">
                <Monitor className="h-5 w-5 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-500" />
                Demo Feasibility Checker
              </CardTitle>
              <CardDescription className="mt-1">
                Quickly validate Flip demo eligibility for each dealer
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Status Filter Pills */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    filterStatus === 'all' 
                      ? 'bg-violet-100 text-violet-700' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('yes')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    filterStatus === 'yes' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Flip Ready
                </button>
                <button
                  onClick={() => setFilterStatus('partial')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    filterStatus === 'partial' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Partial
                </button>
                <button
                  onClick={() => setFilterStatus('no')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    filterStatus === 'no' 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Console Only
                </button>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dealers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <SortableHeader field="dealerName">Dealer Name</SortableHeader>
                  <TableHead className="text-muted-foreground font-medium">Website URL</TableHead>
                  <SortableHeader field="flipDemoPossible">Flip Demo Possible?</SortableHeader>
                  <TableHead className="text-muted-foreground font-medium">Flip Demo Link</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Console Demo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((dealer) => (
                  <TableRow 
                    key={dealer.dealerId} 
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <span className="max-w-[200px] truncate block">{dealer.dealerName}</span>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={dealer.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:text-violet-700 hover:underline flex items-center gap-1 max-w-[200px] truncate"
                      >
                        {dealer.websiteUrl.replace('https://', '').replace('www.', '')}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(dealer.flipDemoPossible)}
                    </TableCell>
                    <TableCell>
                      {dealer.flipDemoPossible === 'yes' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100 hover:text-violet-800 gap-1.5"
                          asChild
                        >
                          <a href={dealer.websiteUrl} target="_blank" rel="noopener noreferrer">
                            <Zap className="h-3.5 w-3.5" />
                            Launch Flip Demo
                          </a>
                        </Button>
                      ) : (
                        <span className="text-muted-foreground/50 text-sm">Not available</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 gap-1.5"
                        asChild
                      >
                        <a href={dealer.consoleDemoLink} target="_blank" rel="noopener noreferrer">
                          <Shield className="h-3.5 w-3.5" />
                          Guaranteed Demo
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-lg font-medium">No dealers found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Helpful Note */}
      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Every dealer has a demo path</p>
              <p className="text-sm text-blue-700 mt-0.5">
                The Console Demo is always available as a guaranteed fallback—perfect for situations where Flip cannot be demonstrated directly on the dealer's website.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
