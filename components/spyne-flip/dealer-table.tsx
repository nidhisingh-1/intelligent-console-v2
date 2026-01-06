"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Building2, 
  ChevronUp, 
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  MessageSquare
} from "lucide-react"
import type { DealerDemo } from "@/services/spyne-flip/spyne-flip.types"
import { format } from "date-fns"

interface DealerTableProps {
  data: DealerDemo[]
  isLoading?: boolean
}

export function DealerTable({ data, isLoading }: DealerTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortField, setSortField] = React.useState<keyof DealerDemo | null>('lastDemoDate')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof DealerDemo) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = React.useMemo(() => {
    let result = [...data]

    // Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (d) =>
          d.dealerName.toLowerCase().includes(term) ||
          d.salesUserName.toLowerCase().includes(term)
      )
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]

        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, searchTerm, sortField, sortDirection])

  const SortableHeader = ({ field, children }: { field: keyof DealerDemo; children: React.ReactNode }) => (
    <TableHead
      className="text-slate-400 font-medium cursor-pointer hover:text-slate-200 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <div className="flex flex-col ml-1">
          <ChevronUp className={`h-3 w-3 ${sortField === field && sortDirection === 'asc' ? 'text-cyan-400' : 'text-slate-600'}`} />
          <ChevronDown className={`h-3 w-3 -mt-1 ${sortField === field && sortDirection === 'desc' ? 'text-cyan-400' : 'text-slate-600'}`} />
        </div>
      </div>
    </TableHead>
  )

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono">
          {score}
        </Badge>
      )
    }
    if (score >= 50) {
      return (
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono">
          {score}
        </Badge>
      )
    }
    return (
      <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/30 font-mono">
        {score}
      </Badge>
    )
  }

  const getStatusBadge = (status: DealerDemo['demoStatus']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case 'partial':
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
    }
  }

  const getDemoTypeBadge = (type: DealerDemo['demoType']) => {
    switch (type) {
      case 'studio':
        return (
          <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Studio
          </Badge>
        )
      case 'vini':
        return (
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            <MessageSquare className="h-3 w-3 mr-1" />
            VINI
          </Badge>
        )
      case 'both':
        return (
          <Badge className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30">
            Both
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-400" />
            Dealer-Level View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-slate-700/50 rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-400" />
            Dealer-Level View
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search dealers or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <SortableHeader field="dealerName">Dealer</SortableHeader>
                <TableHead className="text-slate-400 font-medium">Type</TableHead>
                <SortableHeader field="lastDemoDate">Last Demo</SortableHeader>
                <SortableHeader field="salesUserName">Sales User</SortableHeader>
                <TableHead className="text-slate-400 font-medium">Demo Type</TableHead>
                <SortableHeader field="aiDemoSuccessScore">Score</SortableHeader>
                <SortableHeader field="vinsProcessed">VINs</SortableHeader>
                <TableHead className="text-slate-400 font-medium">VINI</TableHead>
                <TableHead className="text-slate-400 font-medium">Status</TableHead>
                <TableHead className="text-slate-400 font-medium w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((dealer) => (
                <TableRow 
                  key={dealer.dealerId} 
                  className="border-slate-700/50 hover:bg-slate-800/50 transition-colors group"
                >
                  <TableCell className="font-medium text-slate-200">
                    <div className="flex flex-col">
                      <span className="max-w-[200px] truncate">{dealer.dealerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={dealer.isNewDealer 
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                      : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                    }>
                      {dealer.isNewDealer ? 'New' : 'Existing'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">
                    {format(new Date(dealer.lastDemoDate), 'MMM d, h:mm a')}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {dealer.salesUserName}
                  </TableCell>
                  <TableCell>
                    {getDemoTypeBadge(dealer.demoType)}
                  </TableCell>
                  <TableCell>
                    {getScoreBadge(dealer.aiDemoSuccessScore)}
                  </TableCell>
                  <TableCell className="text-slate-300 font-mono">
                    {dealer.vinsProcessed}
                  </TableCell>
                  <TableCell>
                    {dealer.viniUsed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(dealer.demoStatus)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-cyan-400"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No dealers found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

