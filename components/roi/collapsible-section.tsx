"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  icon?: React.ReactNode
  summary?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

export function CollapsibleSection({ 
  title, 
  icon, 
  summary, 
  defaultOpen = false, 
  children 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-gray-100">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                {title}
              </CardTitle>
              {!isOpen && summary && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {summary}
                </p>
              )}
            </div>
          </div>
          
          <button
            type="button"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0 pb-5">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
