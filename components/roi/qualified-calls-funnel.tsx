"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  CheckCircle2, 
  CalendarCheck, 
  UserCheck, 
  HandCoins,
  ArrowDown,
  TrendingUp
} from "lucide-react"
import type { QualifiedCallsFunnel as FunnelType } from "@/services/roi/roi.types"

interface QualifiedCallsFunnelProps {
  data: FunnelType
  isLoading?: boolean
}

const funnelSteps = [
  { key: 'callsHandled', icon: Phone, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  { key: 'qualifiedCalls', icon: CheckCircle2, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
  { key: 'appointmentsBooked', icon: CalendarCheck, color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200' },
  { key: 'appointmentsShown', icon: UserCheck, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
  { key: 'dealsClosed', icon: HandCoins, color: 'bg-pink-500', lightColor: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
] as const

export function QualifiedCallsFunnel({ data, isLoading }: QualifiedCallsFunnelProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxValue = data.callsHandled.value
  
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.contributedRevenue.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data.contributedRevenue.value)

  const getFunnelData = (key: string) => {
    switch (key) {
      case 'callsHandled': return data.callsHandled
      case 'qualifiedCalls': return data.qualifiedCalls
      case 'appointmentsBooked': return data.appointmentsBooked
      case 'appointmentsShown': return data.appointmentsShown
      case 'dealsClosed': return data.dealsClosed
      default: return data.callsHandled
    }
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Qualified Calls Journey
          </CardTitle>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            {formattedRevenue} Contributed
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {funnelSteps.map((step, index) => {
          const stepData = getFunnelData(step.key)
          const Icon = step.icon
          const widthPercent = (stepData.value / maxValue) * 100
          
          return (
            <React.Fragment key={step.key}>
              <div 
                className={`relative p-4 rounded-xl border ${step.lightColor} ${step.borderColor} transition-all hover:shadow-md`}
              >
                {/* Progress bar background */}
                <div 
                  className={`absolute inset-0 ${step.color} opacity-10 rounded-xl transition-all`}
                  style={{ width: `${widthPercent}%` }}
                />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${step.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={`font-semibold ${step.textColor}`}>
                        {stepData.label}
                      </p>
                      {stepData.conversionRate && (
                        <p className="text-xs text-gray-500">
                          {stepData.conversionRate.toFixed(1)}% from previous step
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${step.textColor}`}>
                      {stepData.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Arrow between steps */}
              {index < funnelSteps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown className="h-4 w-4 text-gray-300" />
                </div>
              )}
            </React.Fragment>
          )
        })}
        
        {/* Revenue Result */}
        <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Contributed Revenue</p>
              <p className="text-xs text-gray-500 mt-0.5">From qualified leads you converted</p>
            </div>
            <p className="text-3xl font-bold text-emerald-700">
              {formattedRevenue}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
