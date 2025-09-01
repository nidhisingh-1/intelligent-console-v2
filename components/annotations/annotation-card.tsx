"use client"
import { Edit, Trash2, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatTimestamp, getSeverityColor, MOCKS } from "@/lib/mocks"
import type { QAAnnotation } from "@/lib/types"

interface AnnotationCardProps {
  annotation: QAAnnotation
}

export function AnnotationCard({ annotation }: AnnotationCardProps) {
  const enum_ = annotation.enumId ? MOCKS.enums.find((e) => e.id === annotation.enumId) : null

  const handleJumpToTime = () => {
    // In a real app, this would seek the audio player

  }

  const handleEdit = () => {
    // In a real app, this would open the edit annotation sheet

  }

  const handleDelete = () => {
    // In a real app, this would show a confirmation dialog and delete

  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-6 px-2 font-mono text-xs" onClick={handleJumpToTime}>
                <Play className="h-3 w-3 mr-1" />
                {formatTimestamp(annotation.callTsSec)}
              </Button>
              <Badge className={getSeverityColor(annotation.severity)}>{annotation.severity}</Badge>
              {enum_ && (
                <Badge variant="outline" className="text-xs">
                  {enum_.code}
                </Badge>
              )}
            </div>

            <p className="text-sm">{annotation.note}</p>

            {enum_ && (
              <div className="text-xs text-muted-foreground">
                <strong>{enum_.title}:</strong> {enum_.description}
              </div>
            )}

            {annotation.aiSummary && (
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <strong>AI Summary:</strong> {annotation.aiSummary}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEdit}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
