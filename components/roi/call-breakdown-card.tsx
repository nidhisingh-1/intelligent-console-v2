"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  PhoneIncoming, 
  PhoneOutgoing, 
  Car, 
  Wrench,
  ArrowRightLeft,
  PhoneForwarded
} from "lucide-react"
import type { CallBreakdown, TransferBreakdown } from "@/services/roi/roi.types"

interface CallBreakdownCardProps {
  callBreakdown: CallBreakdown
  transferBreakdown: TransferBreakdown
  isLoading?: boolean
}

export function CallBreakdownCard({ callBreakdown, transferBreakdown, isLoading }: CallBreakdownCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalSales = callBreakdown.sales.inbound + callBreakdown.sales.outbound
  const totalService = callBreakdown.service.inbound + callBreakdown.service.outbound

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-gray-900">
          Call Breakdown
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Sales vs Service */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sales */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Car className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-700">Sales</span>
              <Badge className="ml-auto bg-blue-100 text-blue-700 text-xs">
                {callBreakdown.sales.qualificationRate}% qualified
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <PhoneIncoming className="h-3.5 w-3.5" />
                  Inbound
                </span>
                <span className="font-semibold text-gray-900">{callBreakdown.sales.inbound}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <PhoneOutgoing className="h-3.5 w-3.5" />
                  Outbound
                </span>
                <span className="font-semibold text-gray-900">{callBreakdown.sales.outbound}</span>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-blue-700">Total</span>
                  <span className="font-bold text-blue-700">{totalSales}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service */}
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-orange-600" />
              <span className="font-semibold text-orange-700">Service</span>
              <Badge className="ml-auto bg-orange-100 text-orange-700 text-xs">
                {callBreakdown.service.qualificationRate}% qualified
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <PhoneIncoming className="h-3.5 w-3.5" />
                  Inbound
                </span>
                <span className="font-semibold text-gray-900">{callBreakdown.service.inbound}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <PhoneOutgoing className="h-3.5 w-3.5" />
                  Outbound
                </span>
                <span className="font-semibold text-gray-900">{callBreakdown.service.outbound}</span>
              </div>
              <div className="pt-2 border-t border-orange-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-orange-700">Total</span>
                  <span className="font-bold text-orange-700">{totalService}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer vs Callback */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">
            How Qualified Calls Were Handled
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-100">
                <ArrowRightLeft className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{transferBreakdown.transferred}</p>
                <p className="text-xs text-gray-500">Transferred</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100">
                <PhoneForwarded className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{transferBreakdown.callbackArranged}</p>
                <p className="text-xs text-gray-500">Callback Arranged</p>
              </div>
            </div>
          </div>
          
          {/* Visual bar */}
          <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden flex">
            <div 
              className="h-full bg-violet-500 transition-all"
              style={{ width: `${(transferBreakdown.transferred / transferBreakdown.totalQualified) * 100}%` }}
            />
            <div 
              className="h-full bg-teal-500 transition-all"
              style={{ width: `${(transferBreakdown.callbackArranged / transferBreakdown.totalQualified) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{((transferBreakdown.transferred / transferBreakdown.totalQualified) * 100).toFixed(0)}% Transferred</span>
            <span>{((transferBreakdown.callbackArranged / transferBreakdown.totalQualified) * 100).toFixed(0)}% Callbacks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
