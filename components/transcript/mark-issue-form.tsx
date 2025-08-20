"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Filter, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarkIssueFormProps {
  transcriptText: string
  timestamp: number
  onSubmit: (issue: { issues: Array<{ type: string; severity: string }>; description: string }) => void
  onCancel: () => void
}

// Flattened issue types with category metadata for easier navigation
const ISSUE_TYPES = [
  // Communication Issues
  { id: "communication_breakdown", text: "Communication Breakdown", category: "Communication", severity: "medium" },
  { id: "misunderstanding", text: "Misunderstanding", category: "Communication", severity: "low" },
  { id: "language_barrier", text: "Language Barrier", category: "Communication", severity: "medium" },
  { id: "tone_issues", text: "Tone Issues", category: "Communication", severity: "medium" },
  
  // Technical Issues
  { id: "system_error", text: "System Error", category: "Technical", severity: "high" },
  { id: "connection_problem", text: "Connection Problem", category: "Technical", severity: "medium" },
  { id: "audio_quality", text: "Audio Quality", category: "Technical", severity: "low" },
  { id: "feature_unavailable", text: "Feature Unavailable", category: "Technical", severity: "medium" },
  
  // Process Issues
  { id: "procedure_not_followed", text: "Procedure Not Followed", category: "Process", severity: "high" },
  { id: "missing_information", text: "Missing Information", category: "Process", severity: "medium" },
  { id: "incorrect_process", text: "Incorrect Process", category: "Process", severity: "high" },
  { id: "timing_issue", text: "Timing Issue", category: "Process", severity: "medium" },
  
  // Customer Service Issues
  { id: "unprofessional_behavior", text: "Unprofessional Behavior", category: "Customer Service", severity: "high" },
  { id: "lack_of_empathy", text: "Lack of Empathy", category: "Customer Service", severity: "medium" },
  { id: "poor_resolution", text: "Poor Resolution", category: "Customer Service", severity: "medium" },
  { id: "follow_up_missing", text: "Follow-up Missing", category: "Customer Service", severity: "low" },
  
  // Product/Service Issues
  { id: "product_defect", text: "Product Defect", category: "Product/Service", severity: "high" },
  { id: "service_failure", text: "Service Failure", category: "Product/Service", severity: "high" },
  { id: "pricing_error", text: "Pricing Error", category: "Product/Service", severity: "medium" },
  { id: "availability_issue", text: "Availability Issue", category: "Product/Service", severity: "medium" }
]

interface SelectedIssue {
  id: string
  text: string
  category: string
  severity: string
}

export function MarkIssueForm({ 
  transcriptText, 
  timestamp, 
  onSubmit, 
  onCancel 
}: MarkIssueFormProps) {
  const [selectedIssues, setSelectedIssues] = React.useState<SelectedIssue[]>([])
  const [description, setDescription] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("")

  // Filter issues based on search query and category
  const filteredIssues = React.useMemo(() => {
    let filtered = ISSUE_TYPES

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(issue => 
        issue.text.toLowerCase().includes(query) || 
        issue.category.toLowerCase().includes(query)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(issue => issue.category === selectedCategory)
    }

    // Filter out already selected issues
    filtered = filtered.filter(issue => !selectedIssues.some(selected => selected.id === issue.id))

    return filtered
  }, [searchQuery, selectedCategory, selectedIssues])

  // Get unique categories for filter
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(ISSUE_TYPES.map(issue => issue.category))]
    return uniqueCategories.sort()
  }, [])

  const addIssue = (issue: typeof ISSUE_TYPES[0]) => {
    const newSelectedIssue: SelectedIssue = {
      id: issue.id,
      text: issue.text,
      category: issue.category,
      severity: "medium" // Default severity
    }
    setSelectedIssues(prev => [...prev, newSelectedIssue])
  }

  const removeIssue = (issueId: string) => {
    setSelectedIssues(prev => prev.filter(issue => issue.id !== issueId))
  }

  const updateIssueSeverity = (issueId: string, severity: string) => {
    setSelectedIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, severity } : issue
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedIssues.length > 0 && description.trim()) {
      onSubmit({
        issues: selectedIssues.map(issue => ({
          type: issue.text,
          severity: issue.severity
        })),
        description: description.trim()
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transcript Context */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Transcript Context</Label>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">{transcriptText}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Timestamp: {Math.floor(timestamp / 60)}:{(timestamp % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Issue Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Select Issues</Label>
        
        {/* Search and Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              type="button"
              variant={selectedCategory === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Available Issues */}
        <div className="max-h-48 overflow-y-auto space-y-2">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 cursor-pointer"
              onClick={() => addIssue(issue)}
            >
              <div className="flex items-center gap-2">
                <Checkbox checked={false} readOnly />
                <span className="text-sm">{issue.text}</span>
                <Badge variant="outline" className="text-xs">
                  {issue.category}
                </Badge>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Issues */}
      {selectedIssues.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Selected Issues</Label>
          <div className="space-y-2">
            {selectedIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{issue.text}</span>
                  <Badge variant="outline" className="text-xs">
                    {issue.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={issue.severity}
                    onChange={(e) => updateIssueSeverity(issue.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIssue(issue.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={selectedIssues.length === 0 || !description.trim()}
          className="flex-1"
        >
          Mark {selectedIssues.length > 0 ? `${selectedIssues.length} Issue${selectedIssues.length > 1 ? 's' : ''}` : 'Issues'}
        </Button>
      </div>
    </form>
  )
}
