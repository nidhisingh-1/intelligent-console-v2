"use client"

import * as React from "react"
import type { DealerMode } from "@/services/roi/roi.types"

interface SalesServiceToggleProps {
  value: DealerMode
  onChange: (mode: DealerMode) => void
}

export function SalesServiceToggle({ value, onChange }: SalesServiceToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-gray-100 p-0.5 text-sm">
      <button
        type="button"
        onClick={() => onChange('sales')}
        className={`px-3 py-1 rounded-md font-medium transition-all ${
          value === 'sales'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Sales
      </button>
      <button
        type="button"
        onClick={() => onChange('service')}
        className={`px-3 py-1 rounded-md font-medium transition-all ${
          value === 'service'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Service
      </button>
    </div>
  )
}
