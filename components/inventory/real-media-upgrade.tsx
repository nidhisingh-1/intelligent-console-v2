"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, ArrowRight, Award, TrendingUp, Clock } from "lucide-react"

interface RealMediaUpgradeProps {
  onUpgrade: () => void
}

export function RealMediaUpgrade({ onUpgrade }: RealMediaUpgradeProps) {
  return (
    <Card className="border border-violet-200 bg-gradient-to-br from-violet-50/50 to-white overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Before/After preview */}
          <div className="flex-shrink-0 relative">
            <div className="flex gap-1">
              <div className="w-20 h-14 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300 relative">
                <span className="text-[8px] text-gray-500 font-mono">CLONE</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gray-400" />
              </div>
              <div className="w-20 h-14 rounded-lg bg-violet-100 flex items-center justify-center border border-violet-300 relative">
                <span className="text-[8px] text-violet-600 font-mono">REAL</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="h-4 w-4 text-violet-600" />
              <p className="text-sm font-semibold text-foreground">
                Upgrade to Real Media
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Vehicles with Real Media close{" "}
              <span className="font-semibold text-violet-700">18% faster</span>{" "}
              and generate{" "}
              <span className="font-semibold text-violet-700">24% more leads</span>.
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span>+18% velocity</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 text-blue-500" />
                <span>4 days faster avg</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs border-violet-300 text-violet-700 hover:bg-violet-50 gap-1.5"
              onClick={onUpgrade}
            >
              <Camera className="h-3.5 w-3.5" />
              Unlock Real Media
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
