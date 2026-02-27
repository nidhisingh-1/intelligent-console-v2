"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface AIPageSummaryProps {
  summary: string
  className?: string
}

export function AIPageSummary({ summary, className }: AIPageSummaryProps) {
  const [displayed, setDisplayed] = React.useState("")
  const [done, setDone] = React.useState(false)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    if (hasAnimated.current) {
      setDisplayed(summary)
      setDone(true)
      return
    }
    hasAnimated.current = true

    let i = 0
    const timer = setInterval(() => {
      let step = 3 + Math.floor(Math.random() * 4)
      let next = Math.min(i + step, summary.length)
      while (next < summary.length && summary[next] !== " " && summary[next] !== "—") {
        next++
      }
      i = Math.min(next, summary.length)
      setDisplayed(summary.substring(0, i))
      if (i >= summary.length) {
        setDone(true)
        clearInterval(timer)
      }
    }, 18)

    return () => clearInterval(timer)
  }, [summary])

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3.5 rounded-xl relative overflow-hidden",
        "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900",
        "border border-white/[0.06]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer pointer-events-none" />

      <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 relative">
        <Sparkles className="h-4 w-4 text-white/70" />
        {!done && (
          <span className="absolute -inset-0.5 rounded-lg border border-white/20 animate-think-ring" />
        )}
      </div>

      <div className="flex-1 min-w-0 relative">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">
          AI Summary
        </p>
        <p className="text-sm text-white/85 leading-relaxed">
          {displayed}
          {!done && (
            <span className="inline-block w-[3px] h-[14px] bg-white/60 rounded-sm ml-1 align-middle animate-cursor-blink" />
          )}
        </p>
      </div>
    </div>
  )
}
