"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Save } from "lucide-react"
import { MOCKS } from "@/lib/mocks"
import { toast } from "@/hooks/use-toast"

interface EnumWithStats {
  id: string
  code: string
  title: string
  occurrences: number
  weightedScore: number
  lastSeen: string
  status: "OPEN" | "SOLVED" | "REGRESSED"
  scope: string
}

interface MarkSolvedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enum_: EnumWithStats
}

export function MarkSolvedDialog({ open, onOpenChange, enum_ }: MarkSolvedDialogProps) {
  const [scope, setScope] = React.useState<"GLOBAL" | "DEALERSHIP" | "AGENT" | "AGENT_VERSION">("GLOBAL")
  const [dealershipId, setDealershipId] = React.useState("")
  const [agentId, setAgentId] = React.useState("")
  const [agentVersion, setAgentVersion] = React.useState("")
  const [note, setNote] = React.useState("")

  const handleSave = () => {
    // In a real app, this would save to the backend
    const resolution = {
      enumId: enum_.id,
      scope,
      dealershipId: scope === "DEALERSHIP" || scope === "AGENT" || scope === "AGENT_VERSION" ? dealershipId : undefined,
      agentId: scope === "AGENT" || scope === "AGENT_VERSION" ? agentId : undefined,
      agentVersion: scope === "AGENT_VERSION" ? agentVersion : undefined,
      status: "SOLVED" as const,
      effectiveFrom: new Date().toISOString(),
      note: note || undefined,
    }



    toast({
      title: "Enum marked as solved",
      description: `${enum_.code} has been marked as solved with ${scope.toLowerCase()} scope`,
    })

    // Reset form
    setScope("GLOBAL")
    setDealershipId("")
    setAgentId("")
    setAgentVersion("")
    setNote("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Mark Enum as Solved
          </DialogTitle>
          <DialogDescription>
            Mark this quality issue as resolved and specify the scope of the resolution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Enum</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {enum_.code}
              </Badge>
              <span className="text-sm text-muted-foreground">{enum_.title}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope">Resolution Scope</Label>
            <Select value={scope} onValueChange={(value: any) => setScope(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GLOBAL">Global - All agents and dealerships</SelectItem>
                <SelectItem value="DEALERSHIP">Dealership - Specific dealership only</SelectItem>
                <SelectItem value="AGENT">Agent - Specific agent only</SelectItem>
                <SelectItem value="AGENT_VERSION">Agent Version - Specific agent version</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(scope === "DEALERSHIP" || scope === "AGENT" || scope === "AGENT_VERSION") && (
            <div className="space-y-2">
              <Label htmlFor="dealership">Dealership</Label>
              <Select value={dealershipId} onValueChange={setDealershipId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dealership..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCKS.dealerships.map((dealership) => (
                    <SelectItem key={dealership.id} value={dealership.id}>
                      {dealership.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(scope === "AGENT" || scope === "AGENT_VERSION") && (
            <div className="space-y-2">
              <Label htmlFor="agent">Agent</Label>
              <Select value={agentId} onValueChange={setAgentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCKS.agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name} ({agent.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {scope === "AGENT_VERSION" && (
            <div className="space-y-2">
              <Label htmlFor="version">Agent Version</Label>
              <Select value={agentVersion} onValueChange={setAgentVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.9.8">1.9.8</SelectItem>
                  <SelectItem value="2.0.3">2.0.3</SelectItem>
                  <SelectItem value="2.1.0">2.1.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="note">Resolution Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Describe the resolution or action taken..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Mark as Solved
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
