"use client"

import { cn } from "@/lib/utils"
import type { RiskViewMode } from "@/services/inventory/inventory.types"
import { Shield, Globe, Layers } from "lucide-react"

interface RiskViewToggleProps {
  value: RiskViewMode
  onChange: (mode: RiskViewMode) => void
}

const modes: { value: RiskViewMode; label: string; icon: React.ReactNode }[] = [
  { value: "capital", label: "Capital Risk", icon: <Shield className="h-3.5 w-3.5" /> },
  { value: "attraction", label: "Attraction Risk", icon: <Globe className="h-3.5 w-3.5" /> },
  { value: "combined", label: "Combined Risk", icon: <Layers className="h-3.5 w-3.5" /> },
]

export function RiskViewToggle({ value, onChange }: RiskViewToggleProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground font-medium mr-1">View Mode:</span>
      <div className="flex items-center p-0.5 rounded-lg bg-gray-100">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
              value === mode.value
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {mode.icon}
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  )
}
