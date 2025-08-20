"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, AlertTriangle } from "lucide-react"
import { MOCKS } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"
import type { QAEnum, Severity } from "@/lib/types"

interface EnumFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enum_?: QAEnum
}

export function EnumFormDialog({ open, onOpenChange, enum_ }: EnumFormDialogProps) {
  const [code, setCode] = React.useState(enum_?.code || "")
  const [title, setTitle] = React.useState(enum_?.title || "")
  const [description, setDescription] = React.useState(enum_?.description || "")
  const [defaultSeverity, setDefaultSeverity] = React.useState<Severity>((enum_?.severity as Severity) || "MEDIUM")
  const [isActive, setIsActive] = React.useState(enum_?.isActive ?? true)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const isEditing = !!enum_

  // Reset form when dialog opens/closes or enum changes
  React.useEffect(() => {
    if (open) {
      setCode(enum_?.code || "")
      setTitle(enum_?.title || "")
      setDescription(enum_?.description || "")
      setDefaultSeverity((enum_?.severity as Severity) || "MEDIUM")
      setIsActive(enum_?.isActive ?? true)
      setErrors({})
    }
  }, [open, enum_])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!code.trim()) {
      newErrors.code = "Code is required"
    } else if (!/^[A-Z_]+$/.test(code)) {
      newErrors.code = "Code must contain only uppercase letters and underscores"
    } else {
      // Check for duplicate code (excluding current enum when editing)
      const existingEnum = MOCKS.enums.find((e) => e.code === code && e.id !== enum_?.id)
      if (existingEnum) {
        newErrors.code = "This code already exists"
      }
    }

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    const enumData = {
      id: enum_?.id || `enum-${Date.now()}`,
      code: code.trim(),
      title: title.trim(),
      description: description.trim(),
      defaultSeverity,
      isActive,
      updatedAt: new Date().toISOString(),
    }

    // In a real app, this would save to the backend
    console.log(isEditing ? "Updating enum:" : "Creating enum:", enumData)

    toast({
      title: isEditing ? "Enum updated" : "Enum created",
      description: `${code} has been ${isEditing ? "updated" : "created"} successfully`,
    })

    onOpenChange(false)
  }

  const handleCodeChange = (value: string) => {
    // Auto-format to uppercase with underscores
    const formatted = value.toUpperCase().replace(/[^A-Z_]/g, "")
    setCode(formatted)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {isEditing ? "Edit Enum" : "Create New Enum"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the enum details below." : "Create a new quality assurance enumeration code."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">
              Code *<span className="text-xs text-muted-foreground ml-2">(uppercase letters and underscores only)</span>
            </Label>
            <Input
              id="code"
              placeholder="e.g., GREETING_MISSING"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className={errors.code ? "border-red-500" : ""}
            />
            {errors.code && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertTriangle className="h-3 w-3" />
                {errors.code}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Missing Professional Greeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertTriangle className="h-3 w-3" />
                {errors.title}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of this quality issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Default Severity</Label>
            <Select value={defaultSeverity} onValueChange={(value: Severity) => setDefaultSeverity(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">LOW</Badge>
                    <span>Low</span>
                  </div>
                </SelectItem>
                <SelectItem value="MEDIUM">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      MEDIUM
                    </Badge>
                    <span>Medium</span>
                  </div>
                </SelectItem>
                <SelectItem value="HIGH">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      HIGH
                    </Badge>
                    <span>High</span>
                  </div>
                </SelectItem>
                <SelectItem value="CRITICAL">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">CRITICAL</Badge>
                    <span>Critical</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
            <Label htmlFor="active">Active</Label>
            <span className="text-xs text-muted-foreground">
              {isActive ? "Available for use in annotations" : "Hidden from annotation selection"}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Update" : "Create"} Enum
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
