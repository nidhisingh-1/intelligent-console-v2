"use client"

import * as React from "react"
import { Search, Plus, Edit, Merge, MoreHorizontal, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { MOCKS, getSeverityColor } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"
import { EnumFormDialog } from "./enum-form-dialog"
import { MergeEnumDialog } from "./merge-enum-dialog"
import type { QAEnum } from "@/lib/types"

export function EnumCatalogManager() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedEnums, setSelectedEnums] = React.useState<string[]>([])
  const [showNewEnum, setShowNewEnum] = React.useState(false)
  const [editingEnum, setEditingEnum] = React.useState<QAEnum | null>(null)
  const [mergingEnum, setMergingEnum] = React.useState<QAEnum | null>(null)

  // Filter enums based on search query
  const filteredEnums = React.useMemo(() => {
    if (!searchQuery.trim()) return MOCKS.enums

    const query = searchQuery.toLowerCase()
    return MOCKS.enums.filter(
      (enum_) =>
        enum_.code.toLowerCase().includes(query) ||
        enum_.title.toLowerCase().includes(query) ||
        enum_.description.toLowerCase().includes(query),
    )
  }, [searchQuery])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEnums(filteredEnums.map((e) => e.id))
    } else {
      setSelectedEnums([])
    }
  }

  const handleSelectEnum = (enumId: string, checked: boolean) => {
    if (checked) {
      setSelectedEnums((prev) => [...prev, enumId])
    } else {
      setSelectedEnums((prev) => prev.filter((id) => id !== enumId))
    }
  }

  const handleToggleActive = (enumId: string, isActive: boolean) => {
    // In a real app, this would update the backend
    console.log(`Toggling enum ${enumId} to ${isActive ? "active" : "inactive"}`)
    toast({
      title: isActive ? "Enum activated" : "Enum deactivated",
      description: `Enum has been ${isActive ? "activated" : "deactivated"} successfully`,
    })
  }

  const handleBulkActivate = (activate: boolean) => {
    if (selectedEnums.length === 0) {
      toast({
        title: "No enums selected",
        description: "Please select enums to perform bulk actions",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would update the backend
    console.log(`Bulk ${activate ? "activating" : "deactivating"} enums:`, selectedEnums)
    toast({
      title: `Enums ${activate ? "activated" : "deactivated"}`,
      description: `${selectedEnums.length} enum(s) have been ${activate ? "activated" : "deactivated"}`,
    })
    setSelectedEnums([])
  }

  const handleEdit = (enum_: QAEnum) => {
    setEditingEnum(enum_)
  }

  const handleMerge = (enum_: QAEnum) => {
    setMergingEnum(enum_)
  }

  const isAllSelected = filteredEnums.length > 0 && selectedEnums.length === filteredEnums.length
  const isIndeterminate = selectedEnums.length > 0 && selectedEnums.length < filteredEnums.length

  return (
    <div className="space-y-6">
      {/* Toolbar - Attio Style */}
      <div className="attio-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search enums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="attio-input pl-9 w-full"
              />
            </div>

            {selectedEnums.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="attio-body-small text-muted-foreground">{selectedEnums.length} selected</span>
                <button 
                  className="attio-button-secondary text-sm"
                  onClick={() => handleBulkActivate(true)}
                >
                  Activate
                </button>
                <button 
                  className="attio-button-secondary text-sm"
                  onClick={() => handleBulkActivate(false)}
                >
                  Deactivate
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowNewEnum(true)}
            className="attio-button-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Enum
          </button>
        </div>
      </div>

      {/* Enums Grid - Attio Style */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="attio-heading-3">Enums ({filteredEnums.length})</h3>
          {filteredEnums.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={isAllSelected} 
                onCheckedChange={handleSelectAll} 
                aria-label="Select all enums"
                {...(isIndeterminate && { "data-state": "indeterminate" })}
              />
              <span className="attio-body-small">Select all</span>
            </div>
          )}
        </div>

        {filteredEnums.length === 0 ? (
          <div className="attio-card p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="attio-heading-3 mb-2">
              {searchQuery ? "No enums found" : "No enums available"}
            </h3>
            <p className="attio-body-small text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search criteria." : "Create your first enum to get started."}
            </p>
            {!searchQuery && (
              <button 
                className="attio-button-primary flex items-center gap-2 mx-auto"
                onClick={() => setShowNewEnum(true)}
              >
                <Plus className="h-4 w-4" />
                Create First Enum
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEnums.map((enum_) => (
              <div key={enum_.id} className="attio-card p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedEnums.includes(enum_.id)}
                      onCheckedChange={(checked) => handleSelectEnum(enum_.id, checked as boolean)}
                      aria-label={`Select ${enum_.code}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{enum_.code}</code>
                        <span className={`attio-badge ${
                          enum_.severity === 'HIGH' ? 'attio-badge-error' :
                          enum_.severity === 'MEDIUM' ? 'attio-badge-warning' :
                          'attio-badge-info'
                        }`}>
                          {enum_.severity}
                        </span>
                      </div>
                      <h4 className="attio-body font-medium">{enum_.title}</h4>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu for {enum_.code}</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(enum_)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMerge(enum_)}>
                        <Merge className="h-4 w-4 mr-2" />
                        Merge
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="attio-body-small text-muted-foreground mb-4 line-clamp-2">
                  {enum_.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={enum_.isActive}
                      onCheckedChange={(checked) => handleToggleActive(enum_.id, checked)}
                      aria-label={`Toggle ${enum_.code} active status`}
                    />
                    <span className="attio-body-small text-muted-foreground">
                      {enum_.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <span className="attio-caption">
                    {format(new Date(enum_.updatedAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <EnumFormDialog open={showNewEnum} onOpenChange={setShowNewEnum} />

      {editingEnum && (
        <EnumFormDialog
          open={!!editingEnum}
          onOpenChange={(open) => !open && setEditingEnum(null)}
          enum_={editingEnum}
        />
      )}

      {mergingEnum && (
        <MergeEnumDialog
          open={!!mergingEnum}
          onOpenChange={(open) => !open && setMergingEnum(null)}
          sourceEnum={mergingEnum}
        />
      )}
    </div>
  )
}
