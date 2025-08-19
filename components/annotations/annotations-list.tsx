"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnnotationCard } from "./annotation-card"
import { AddAnnotationSheet } from "./add-annotation-sheet"
import { MOCKS } from "@/lib/mocks"

interface AnnotationsListProps {
  callId: string
}

export function AnnotationsList({ callId }: AnnotationsListProps) {
  const [showAddAnnotation, setShowAddAnnotation] = React.useState(false)

  // Get annotations for this call
  const review = MOCKS.reviews.find((r) => r.callId === callId)
  const annotations = review ? MOCKS.annotations.filter((a) => a.reviewId === review.id) : []

  // Global keyboard shortcut for adding annotations
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "a" || e.key === "A") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          const target = e.target as HTMLElement
          // Only trigger if not in an input field
          if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
            e.preventDefault()
            setShowAddAnnotation(true)
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {annotations.length} annotation{annotations.length !== 1 ? "s" : ""}
        </span>
        <Button size="sm" onClick={() => setShowAddAnnotation(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Annotation
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            A
          </kbd>
        </Button>
      </div>

      {annotations.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Plus className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>No annotations yet</p>
            <p className="text-sm">Press 'A' or click the button above to add your first annotation</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {annotations
            .sort((a, b) => a.callTsSec - b.callTsSec)
            .map((annotation) => (
              <AnnotationCard key={annotation.id} annotation={annotation} />
            ))}
        </div>
      )}

      <AddAnnotationSheet open={showAddAnnotation} onOpenChange={setShowAddAnnotation} callId={callId} />
    </div>
  )
}
