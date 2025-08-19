"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatTimestamp } from "@/lib/mocks"
import type { Call } from "@/lib/types"

interface TranscriptViewProps {
  transcript?: Call["transcript"]
  callId: string
}

export function TranscriptView({ transcript, callId }: TranscriptViewProps) {
  const [currentTime, setCurrentTime] = React.useState(0)

  // Group words into sentences for better readability
  const sentences = React.useMemo(() => {
    if (!transcript || !transcript.items.length) {
      return []
    }

    const words = transcript.items
    const grouped: { startTime: number; endTime: number; text: string; words: typeof words }[] = []

    let currentSentence: typeof words = []
    let sentenceStart = 0

    words.forEach((word, index) => {
      if (currentSentence.length === 0) {
        sentenceStart = word.t
      }

      currentSentence.push(word)

      // End sentence on punctuation or every 10-15 words
      const isEndOfSentence = word.word.match(/[.!?]/) || currentSentence.length >= 12
      const isLastWord = index === words.length - 1

      if (isEndOfSentence || isLastWord) {
        grouped.push({
          startTime: sentenceStart,
          endTime: word.t + 0.5,
          text: currentSentence.map((w) => w.word).join(" "),
          words: [...currentSentence],
        })
        currentSentence = []
      }
    })

    return grouped
  }, [transcript])

  const handleWordClick = (timestamp: number) => {
    setCurrentTime(timestamp)
    // In a real app, this would seek the audio player
    console.log(`Seeking to ${timestamp}s`)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-4">
          {!transcript || !transcript.items.length ? (
            <div className="text-muted-foreground">
              <p>No transcript available for this call</p>
            </div>
          ) : (
            sentences.map((sentence, index) => {
              const isCurrentSentence = currentTime >= sentence.startTime && currentTime <= sentence.endTime

              return (
                <div
                  key={index}
                  className={cn(
                    "flex gap-4 p-3 rounded-lg transition-colors cursor-pointer",
                    isCurrentSentence ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50",
                  )}
                  onClick={() => handleWordClick(sentence.startTime)}
                >
                  <div className="flex-shrink-0 w-16">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs font-mono text-muted-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWordClick(sentence.startTime)
                      }}
                    >
                      {formatTimestamp(sentence.startTime)}
                    </Button>
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm leading-relaxed", isCurrentSentence && "font-medium")}>
                      {sentence.words.map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          className={cn(
                            "cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-900 px-0.5 rounded",
                            Math.abs(currentTime - word.t) < 1 && "bg-yellow-100 dark:bg-yellow-900",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleWordClick(word.t)
                          }}
                        >
                          {word.word}
                          {wordIndex < sentence.words.length - 1 && " "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>

      <div className="text-xs text-muted-foreground text-center">
        Click on any word or timestamp to seek to that position in the audio
      </div>
    </div>
  )
}
