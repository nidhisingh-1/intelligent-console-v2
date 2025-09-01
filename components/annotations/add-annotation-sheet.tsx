"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Plus, Save } from "lucide-react"
import { MOCKS, formatTimestamp } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"
import type { Severity } from "@/lib/types"

interface AddAnnotationSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  callId: string
  initialTimestamp?: number
}

export function AddAnnotationSheet({ open, onOpenChange, callId, initialTimestamp = 0 }: AddAnnotationSheetProps) {
  const [timestamp, setTimestamp] = React.useState(initialTimestamp)
  const [note, setNote] = React.useState("")
  const [severity, setSeverity] = React.useState<Severity>("MEDIUM")
  const [enumId, setEnumId] = React.useState<string>("")
  const [showNewEnum, setShowNewEnum] = React.useState(false)
  const [newEnumCode, setNewEnumCode] = React.useState("")
  const [newEnumTitle, setNewEnumTitle] = React.useState("")
  const [newEnumDescription, setNewEnumDescription] = React.useState("")

  const handleSave = () => {
    if (!note.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note for the annotation",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to the backend
    // Saving annotation: {
    //   callId,
    //   timestamp,
    //   note,
    //   severity,
    //   enumId: enumId || undefined,
    // }

    toast({
      title: "Annotation saved",
      description: `Added annotation at ${formatTimestamp(timestamp)}`,
    })

    // Reset form
    setNote("")
    setSeverity("MEDIUM")
    setEnumId("")
    setShowNewEnum(false)
    setNewEnumCode("")
    setNewEnumTitle("")
    setNewEnumDescription("")
    onOpenChange(false)
  }

  const handleCreateEnum = () => {
    if (!newEnumCode.trim() || !newEnumTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter both code and title for the new enum",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would create the enum and return its ID
    const newEnumId = `enum-new-${Date.now()}`

    // Creating new enum: {
    //   code: newEnumCode,
    //   title: newEnumTitle,
    //   description: newEnumDescription,
    //   defaultSeverity: severity,
    // }

    setEnumId(newEnumId)
    setShowNewEnum(false)

    toast({
      title: "Enum created",
      description: `Created new enum: ${newEnumCode}`,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Annotation</SheetTitle>
          <SheetDescription>
            Add a quality assurance annotation to this call at the specified timestamp.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <div className="flex items-center gap-2">
              <Input
                id="timestamp"
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(Number(e.target.value))}
                min={0}
                step={1}
              />
              <Badge variant="outline">{formatTimestamp(timestamp)}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note *</Label>
            <Textarea
              id="note"
              placeholder="Describe the issue or observation..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={(value: Severity) => setSeverity(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enum">QA Enum (Optional)</Label>
            <Select value={enumId} onValueChange={setEnumId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an enum..." />
              </SelectTrigger>
              <SelectContent>
                {MOCKS.enums
                  .filter((e) => e.isActive)
                  .map((enum_) => (
                    <SelectItem key={enum_.id} value={enum_.id}>
                      {enum_.code} - {enum_.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={() => setShowNewEnum(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create New Enum
            </Button>
          </div>

          {showNewEnum && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium">Create New Enum</h4>

              <div className="space-y-2">
                <Label htmlFor="enum-code">Code *</Label>
                <Input
                  id="enum-code"
                  placeholder="e.g., GREETING_MISSING"
                  value={newEnumCode}
                  onChange={(e) => setNewEnumCode(e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enum-title">Title *</Label>
                <Input
                  id="enum-title"
                  placeholder="e.g., Missing Professional Greeting"
                  value={newEnumTitle}
                  onChange={(e) => setNewEnumTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enum-description">Description</Label>
                <Textarea
                  id="enum-description"
                  placeholder="Detailed description of this enum..."
                  value={newEnumDescription}
                  onChange={(e) => setNewEnumDescription(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateEnum} size="sm">
                  Create & Select
                </Button>
                <Button variant="outline" onClick={() => setShowNewEnum(false)} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Annotation
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
