"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle2,
  Users,
  ArrowRight,
  PhoneIncoming,
  PhoneOutgoing
} from "lucide-react"
import type { ViniActivation, ViniInteraction } from "@/services/spyne-flip/spyne-flip.types"

interface ViniEngagementProps {
  activation: ViniActivation
  interaction: ViniInteraction
  isLoading?: boolean
}

const PERSONALITY_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24']

export function ViniEngagement({ activation, interaction, isLoading }: ViniEngagementProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading || !mounted) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            VINI Engagement Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse grid grid-cols-2 gap-4">
            <div className="h-64 bg-slate-700/50 rounded-xl" />
            <div className="h-64 bg-slate-700/50 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const activationRate = ((activation.widgetActivated / activation.widgetShown) * 100).toFixed(1)
  
  const ibOBData = [
    { name: 'Inbound', value: activation.inboundCount, color: '#22d3ee' },
    { name: 'Outbound', value: activation.outboundCount, color: '#a78bfa' },
  ]

  const interactionData = [
    { name: 'Calls', value: interaction.callsInitiated, icon: Phone, color: '#22d3ee' },
    { name: 'Chats', value: interaction.chatsInitiated, icon: MessageCircle, color: '#a78bfa' },
    { name: 'Emails', value: interaction.emailsInitiated, icon: Mail, color: '#f472b6' },
  ]

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-200 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-cyan-400" />
          VINI Engagement Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activation Metrics */}
          <div className="space-y-4">
            <p className="text-sm text-slate-400 uppercase tracking-wider">Activation</p>
            
            {/* Activation Funnel */}
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 text-center">
                <p className="text-sm text-slate-400 mb-1">Widget Shown</p>
                <p className="text-3xl font-bold text-white">{activation.widgetShown}</p>
              </div>
              <ArrowRight className="h-6 w-6 text-slate-600 flex-shrink-0" />
              <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 text-center">
                <p className="text-sm text-slate-400 mb-1">Activated</p>
                <p className="text-3xl font-bold text-white">{activation.widgetActivated}</p>
              </div>
            </div>

            {/* Activation Rate */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Activation Rate</span>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono">
                  {activationRate}%
                </Badge>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${activationRate}%` }}
                />
              </div>
            </div>

            {/* IB vs OB Split */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ibOBData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {ibOBData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-500/10">
                  <div className="flex items-center gap-2">
                    <PhoneIncoming className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">Inbound</span>
                  </div>
                  <span className="font-bold text-white">{activation.inboundCount}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-violet-500/10">
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="h-4 w-4 text-violet-400" />
                    <span className="text-sm text-slate-300">Outbound</span>
                  </div>
                  <span className="font-bold text-white">{activation.outboundCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Metrics */}
          <div className="space-y-4">
            <p className="text-sm text-slate-400 uppercase tracking-wider">Interaction</p>
            
            {/* Interaction Types */}
            <div className="grid grid-cols-3 gap-3">
              {interactionData.map((item) => {
                const Icon = item.icon
                return (
                  <div 
                    key={item.name}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center"
                  >
                    <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: item.color }} />
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                )
              })}
            </div>

            {/* Call Duration & Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-slate-400">Avg Call Duration</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {Math.floor(interaction.avgCallDuration / 60)}m {interaction.avgCallDuration % 60}s
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-slate-400">End-Call Summary</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {interaction.callsWithEndCallSummaryPercent.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Agent Personality Distribution */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">Agent Personality Usage</span>
              </div>
              <div className="space-y-2">
                {activation.agentPersonalityDistribution.map((item, index) => {
                  const maxCount = Math.max(...activation.agentPersonalityDistribution.map(p => p.count))
                  const percent = (item.count / maxCount) * 100
                  return (
                    <div key={item.personality} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.personality}</span>
                        <span className="text-slate-400">{item.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percent}%`,
                            backgroundColor: PERSONALITY_COLORS[index % PERSONALITY_COLORS.length]
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

