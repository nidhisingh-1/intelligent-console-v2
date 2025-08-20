"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Filter, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarkIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (issue: { issues: Array<{ type: string; severity: string }>; description: string }) => void
  transcriptText: string
  timestamp: number
}

// Flattened issue types with category metadata for easier navigation
const ISSUE_TYPES = [
  // Communication Issues
  { id: "long-pauses", text: "Long/awkward pauses or random breaks", category: "Communication" },
  { id: "lag-reply", text: "Lag in agent reply", category: "Communication" },
  { id: "call-collision", text: "Call collision (agent & customer talk over each other)", category: "Communication" },
  { id: "cuts-customer", text: "Agent cuts customer mid-speech", category: "Communication" },
  { id: "speaks-slowly", text: "Agent speaks too slowly", category: "Communication" },
  { id: "rushes-info", text: "Agent rushes info (too fast after search)", category: "Communication" },
  { id: "monologue", text: "Agent dumps >3 sentences at once (monologue)", category: "Communication" },
  { id: "endless-confirmations", text: "Endless confirmations / repeating same question", category: "Communication" },
  { id: "silence-not-handled", text: "Silence not handled (no checkback after 2–3s)", category: "Communication" },
  { id: "overly-friendly", text: "Overly friendly (e.g., \"Nice choice\", \"Good choice\")", category: "Communication" },
  { id: "uses-slang", text: "Uses slang (\"slick\", \"trendy\")", category: "Communication" },
  { id: "overuses-filler", text: "Overuses filler (\"Good question\" after everything)", category: "Communication" },
  { id: "sounds-robotic", text: "Sounds robotic", category: "Communication" },
  
  // Technical Problems
  { id: "call-cut-abruptly", text: "Call cut abruptly (no recovery)", category: "Technical" },
  { id: "background-noise", text: "Background noise not handled", category: "Technical" },
  { id: "stock-search-failed", text: "Search by stock number not working", category: "Technical" },
  { id: "vin-search-failed", text: "Search by VIN not working", category: "Technical" },
  { id: "inventory-search-failed", text: "Inventory search failed (no data returned)", category: "Technical" },
  { id: "dealer-crm-not-linked", text: "Dealer CRM not linked", category: "Technical" },
  { id: "call-log-sync", text: "Call log data sync issues", category: "Technical" },
  { id: "vin-solutions-data", text: "VIN Solutions data not handled", category: "Technical" },
  { id: "past-conversation-missing", text: "Past conversation data missing", category: "Technical" },
  { id: "fuzzy-search-missing", text: "Fuzzy stock search missing", category: "Technical" },
  { id: "no-inventory-data", text: "Agent doesn't have inventory data", category: "Technical" },
  
  // Information Accuracy
  { id: "wrong-car-color", text: "Wrong car color informed", category: "Information" },
  { id: "wrong-stock-vin", text: "Wrong/missing stock number or VIN", category: "Information" },
  { id: "stock-number-confusion", text: "Confusion between \"a\" and \"8\" in stock number", category: "Information" },
  { id: "fabricates-info", text: "Agent fabricates inventory info", category: "Information" },
  { id: "cant-narrow-search", text: "Agent unable to narrow down search results", category: "Information" },
  { id: "carfax-missing", text: "Carfax info missing or not explained", category: "Information" },
  { id: "dealer-location-early", text: "Dealer location given too early", category: "Information" },
  { id: "dealer-details-assumed", text: "Dealer details assumed incorrectly", category: "Information" },
  { id: "missing-date-context", text: "Current date/time context missing", category: "Information" },
  { id: "rounded-pricing", text: "Agent provides rounded-off pricing", category: "Information" },
  { id: "incorrect-miles-format", text: "Agent uses \"k\" for miles incorrectly", category: "Information" },
  { id: "missing-otd-price", text: "Out-the-door price missing", category: "Information" },
  
  // Process & Workflow
  { id: "callback-setup-failed", text: "Callback setup failed (customer left waiting)", category: "Process" },
  { id: "customer-name-not-asked", text: "Customer name not asked", category: "Process" },
  { id: "appointment-not-booked", text: "Appointment not booked", category: "Process" },
  { id: "appointment-repeated", text: "Appointment booking repeated unnecessarily", category: "Process" },
  { id: "appointment-off-day", text: "Appointment booked on dealership off-day", category: "Process" },
  { id: "phone-number-repeated", text: "Asking phone number even though customer already called", category: "Process" },
  { id: "timezone-mismatch", text: "Call log time not aligned with dealer timezone", category: "Process" },
  { id: "trade-in-missing", text: "Trade-in / pre-qualification flow missing", category: "Process" },
  { id: "no-human-transfer", text: "Didn't transfer to human when requested", category: "Process" },
  { id: "vin-not-shortened", text: "VIN not shortened (6 digits)", category: "Process" },
  { id: "vin-letter-confirmation", text: "VIN confirmed letter by letter (annoying)", category: "Process" },
  { id: "email-letter-confirmation", text: "Email confirmed letter by letter (annoying)", category: "Process" },
  { id: "test-drive-repeated", text: "Test drive appointment flow repeated", category: "Process" },
  { id: "no-email-summary", text: "No email summary of call sent", category: "Process" },
  { id: "no-sms-confirmation", text: "No SMS confirmation for appointments", category: "Process" },
  
  // Customer Experience
  { id: "carfax-robotic", text: "Carfax explanation robotic/unhelpful", category: "Experience" },
  { id: "car-info-overload", text: "Car info overload (too much detail from inventory)", category: "Experience" },
  { id: "repetitive-car-info", text: "Car make/model/year repeated too often", category: "Experience" },
  { id: "unprompted-finance", text: "Agent provides too much finance info unprompted", category: "Experience" },
  { id: "goes-off-scope", text: "Agent goes off-scope into finance", category: "Experience" },
  { id: "car-not-held", text: "Car not held correctly for test drive (or agent creates FOMO)", category: "Experience" }
]

interface SelectedIssue {
  id: string
  text: string
  category: string
  severity: string
}

export function MarkIssueDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  transcriptText, 
  timestamp 
}: MarkIssueDialogProps) {
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
    if (selectedIssues.length > 0 && description) {
      const issuesData = selectedIssues.map(issue => ({
        type: issue.text,
        severity: issue.severity
      }))

      onSubmit({
        issues: issuesData,
        description
      })
      
      // Reset form
      setSelectedIssues([])
      setDescription("")
      setSearchQuery("")
      setSelectedCategory("")
      onOpenChange(false)
    }
  }

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
  }

  const severityOptions = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800 border-green-200" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800 border-orange-200" },
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-800 border-red-200" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Mark Issues</DialogTitle>
          <DialogDescription>
            Report issues found in this transcript line at {formatTimestamp(timestamp)}s
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transcript-text">Transcript Text</Label>
              <div className="p-3 bg-muted rounded-md text-sm max-h-20 overflow-y-auto">
              "{transcriptText}"
            </div>
          </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Available Issues */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Available Issues</Label>
                  <Badge variant="outline">{filteredIssues.length} available</Badge>
          </div>

                {/* Search and Filter Bar */}
          <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {(searchQuery || selectedCategory) && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>

                {/* Available Issues List */}
                <div className="border rounded-md h-80 overflow-y-auto">
                  {filteredIssues.length > 0 ? (
                    <div className="divide-y">
                      {filteredIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <span className="text-sm font-medium">{issue.text}</span>
                              <Badge variant="outline" className="text-xs flex-shrink-0">
                                {issue.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addIssue(issue)}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      {selectedIssues.length > 0 ? "All issues have been selected" : "No issues found matching your search."}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Selected Issues */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Selected Issues</Label>
                  <Badge variant="secondary">{selectedIssues.length} selected</Badge>
                </div>

                {/* Selected Issues List */}
                <div className="border rounded-md h-80 overflow-y-auto">
                  {selectedIssues.length > 0 ? (
                    <div className="divide-y">
                      {selectedIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-3 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-sm font-medium">{issue.text}</span>
                                <Badge variant="outline" className="text-xs flex-shrink-0">
                                  {issue.category}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIssue(issue.id)}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Severity Selection */}
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Severity:</Label>
                            <div className="grid grid-cols-2 gap-1">
                              {severityOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updateIssueSeverity(issue.id, option.value)}
                                  className={cn(
                                    "px-2 py-1 text-xs rounded border transition-colors",
                                    issue.severity === option.value
                                      ? option.color
                                      : "bg-background border-border hover:bg-muted/50"
                                  )}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No issues selected. Choose issues from the left panel.
                    </div>
                  )}
                </div>
              </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
                placeholder="Describe the issues in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={selectedIssues.length === 0 || !description}
            >
              Mark {selectedIssues.length > 0 ? `${selectedIssues.length} Issue${selectedIssues.length > 1 ? 's' : ''}` : 'Issues'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
