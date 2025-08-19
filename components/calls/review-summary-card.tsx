"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { QAReview } from "@/lib/types"

interface ReviewSummaryCardProps {
  callId: string
  review?: QAReview
}

export function ReviewSummaryCard({ callId, review }: ReviewSummaryCardProps) {
  const [pass, setPass] = React.useState<boolean | null>(review?.pass ?? null)
  const [summary, setSummary] = React.useState(review?.overallSummary ?? "")

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving review:", {
      callId,
      pass,
      summary,
    })

    toast({
      title: "Review saved",
      description: "Call review has been updated successfully",
    })
  }

  const getPassFailBadge = () => {
    if (pass === null) return <Badge variant="outline">Not Reviewed</Badge>
    if (pass)
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Pass
        </Badge>
      )
    return <Badge variant="destructive">Fail</Badge>
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Review Summary</CardTitle>
          {getPassFailBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <Label htmlFor="fail-toggle">Fail</Label>
              <Switch
                id="pass-fail-toggle"
                checked={pass === true}
                onCheckedChange={(checked) => setPass(checked ? true : false)}
              />
              <Label htmlFor="pass-toggle">Pass</Label>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>

          {pass !== null && (
            <Button variant="outline" size="sm" onClick={() => setPass(null)}>
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Overall Summary</Label>
          <Textarea
            id="summary"
            placeholder="Provide an overall summary of the call quality, key issues, and recommendations..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Review
        </Button>
      </CardContent>
    </Card>
  )
}
