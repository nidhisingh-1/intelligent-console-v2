"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  Activity,
  Building2,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Eye,
  Camera,
  RefreshCw,
  MonitorPlay,
  AlertCircle,
  ArrowRight,
  PhoneIncoming,
  PhoneOutgoing,
  Car,
  Trophy,
  Medal,
  Download,
  FileSpreadsheet,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  UserCheck,
  Repeat,
  CalendarDays,
  UserPlus,
  UsersRound,
  Timer,
  Flame,
  Star,
  Award
} from "lucide-react"
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Treemap
} from "recharts"
import { format, formatDistanceToNow } from "date-fns"
import {
  mockOverviewKPIs,
  mockAIDemoSuccessScore,
  mockDealerDemos,
  mockSalesUserMetrics,
  mockDealerMetrics,
  mockDemoFunnel,
  mockFailureReports,
  mockViniActivation,
  mockViniInteraction,
  mockDailyTrends,
  mockWeeklyTrends,
  mockPerformanceMetrics,
  mockReliabilityMetrics,
  mockSalesUsers,
  mockDealers,
  mockSalesLeaderboard,
  mockDealerCoverageSplit,
  mockDealerCoverage,
  mockUsageHeatmap,
  mockFeatureAdoption,
  mockUserActivityTimeline,
  mockSessionDurationDistribution,
} from "@/lib/spyne-flip-mocks"

// KPI Card Component
export function KPICard({ 
  title, 
  value, 
  change, 
  format: formatType = 'number',
  icon: Icon,
  color
}: { 
  title: string
  value: number
  change: number
  format?: 'number' | 'percent' | 'duration'
  icon: React.ElementType
  color: string
}) {
  const formatValue = (val: number) => {
    if (formatType === 'percent') return `${val.toFixed(1)}%`
    if (formatType === 'duration') {
      const minutes = Math.floor(val / 60)
      const seconds = val % 60
      return `${minutes}m ${seconds}s`
    }
    return val.toLocaleString()
  }

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{formatValue(value)}</p>
            <div className={`inline-flex items-center gap-1 text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{change >= 0 ? '+' : ''}{change.toFixed(1)}% vs prev</span>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
            <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// AI Score Component
export function AIScoreSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const data = mockAIDemoSuccessScore
  const scoreLevel = data.overallAverage >= 80 ? 'Excellent' : data.overallAverage >= 50 ? 'Good' : 'Needs Improvement'
  const scoreColor = data.overallAverage >= 80 ? 'text-green-600' : data.overallAverage >= 50 ? 'text-amber-600' : 'text-red-600'
  const totalDist = data.distribution.high + data.distribution.medium + data.distribution.low

  const distributionData = [
    { name: 'High (80-100)', value: data.distribution.high, color: '#10b981' },
    { name: 'Medium (50-79)', value: data.distribution.medium, color: '#f59e0b' },
    { name: 'Low (0-49)', value: data.distribution.low, color: '#ef4444' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          AI Demo Success Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Overview */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Average</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{data.overallAverage.toFixed(0)}</span>
                    <span className="text-xl text-muted-foreground">/100</span>
                  </div>
                  <p className={`mt-2 font-medium ${scoreColor}`}>{scoreLevel}</p>
                </div>
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <circle 
                      cx="40" cy="40" r="32" 
                      stroke="#8b5cf6" strokeWidth="6" fill="none"
                      strokeDasharray={`${(data.overallAverage / 100) * 201} 201`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="flex items-center gap-4">
              {mounted && (
                <div className="w-28 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={distributionData} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value" paddingAngle={2}>
                        {distributionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="space-y-2 flex-1">
                {distributionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.value}</span>
                      <span className="text-muted-foreground text-xs">({((item.value / totalDist) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Score Trend (7 days)</p>
            {mounted && (
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" fontSize={11} tickFormatter={(v) => format(new Date(v), 'MMM d')} />
                    <YAxis fontSize={11} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      formatter={(v: number) => [v, 'Score']}
                    />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Demo Funnel Component
export function DemoFunnelSection() {
  const data = mockDemoFunnel
  const maxCount = data.steps[0]?.count || 1

  const STEP_COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6']

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-violet-500" />
            Demo Funnel
          </CardTitle>
          <Badge variant="secondary">{data.totalSessions.toLocaleString()} Sessions</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.steps.map((step, i) => {
            const width = (step.count / maxCount) * 100
            const color = STEP_COLORS[i % STEP_COLORS.length]
            return (
              <div key={step.step} className="relative">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                  <div 
                    className="flex items-center justify-center w-7 h-7 rounded-md text-white text-sm font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm truncate">{step.step}</span>
                      <span className="font-bold" style={{ color }}>{step.count.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, backgroundColor: color }} />
                    </div>
                  </div>
                  {i > 0 && (
                    <div className="flex flex-col items-end text-xs">
                      <Badge variant={step.conversionRate >= 80 ? 'default' : step.conversionRate >= 60 ? 'secondary' : 'destructive'} className="text-xs">
                        {step.conversionRate.toFixed(0)}%
                      </Badge>
                      {step.dropOff > 0 && (
                        <span className="text-red-500 mt-1">-{step.dropOff}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Overall Conv.</p>
            <p className="text-xl font-bold text-cyan-600">
              {((data.steps[data.steps.length - 1]?.count / data.steps[0]?.count) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Biggest Drop</p>
            <p className="text-xl font-bold text-red-600">
              {Math.max(...data.steps.map(s => s.dropOff)).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-xl font-bold text-green-600">
              {data.steps[data.steps.length - 1]?.count.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Dealer Table Component
export function DealerTableSection() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const data = mockDealerDemos

  const filtered = data.filter(d => 
    d.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.salesUserName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Dealer-Level View
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search dealers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dealer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sales User</TableHead>
              <TableHead>Demo Type</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center">VINs</TableHead>
              <TableHead className="text-center">VINI</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((dealer) => (
              <TableRow key={dealer.dealerId} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium max-w-[200px] truncate">{dealer.dealerName}</TableCell>
                <TableCell>
                  <Badge variant={dealer.isNewDealer ? 'default' : 'secondary'}>
                    {dealer.isNewDealer ? 'New' : 'Existing'}
                  </Badge>
                </TableCell>
                <TableCell>{dealer.salesUserName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    dealer.demoType === 'both' ? 'border-violet-500 text-violet-600' :
                    dealer.demoType === 'studio' ? 'border-purple-500 text-purple-600' :
                    'border-cyan-500 text-cyan-600'
                  }>
                    {dealer.demoType === 'both' ? 'Both' : dealer.demoType === 'studio' ? 'Studio' : 'VINI'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`font-mono font-bold ${
                    dealer.aiDemoSuccessScore >= 80 ? 'text-green-600' :
                    dealer.aiDemoSuccessScore >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {dealer.aiDemoSuccessScore}
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">{dealer.vinsProcessed}</TableCell>
                <TableCell className="text-center">
                  {dealer.viniUsed ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />}
                </TableCell>
                <TableCell>
                  <Badge variant={
                    dealer.demoStatus === 'completed' ? 'default' :
                    dealer.demoStatus === 'partial' ? 'secondary' : 'destructive'
                  }>
                    {dealer.demoStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Enhanced Usage & Adoption Component
export function UsageAdoptionSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const salesData = mockSalesUserMetrics
  const dealerData = mockDealerMetrics
  const heatmapData = mockUsageHeatmap
  const featureData = mockFeatureAdoption
  const timelineData = mockUserActivityTimeline
  const durationData = mockSessionDurationDistribution

  const dealerSplit = [
    { name: 'New', value: dealerData.newDealersDemoed, color: '#06b6d4' },
    { name: 'Existing', value: dealerData.existingDealersDemoed, color: '#8b5cf6' },
  ]

  // Days of week for heatmap
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500 text-white">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-cyan-600 font-medium">Daily Active Users</p>
                <p className="text-3xl font-bold text-cyan-800">{salesData.dau}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-violet-500 text-white">
                <UsersRound className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-violet-600 font-medium">Weekly Active Users</p>
                <p className="text-3xl font-bold text-violet-800">{salesData.wau}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium">Avg Demos/User</p>
                <p className="text-3xl font-bold text-amber-800">{salesData.avgDemosPerUser.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500 text-white">
                <Repeat className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Repeat Usage Rate</p>
                <p className="text-3xl font-bold text-green-800">{salesData.repeatUsageRate.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales User Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-500" />
              Sales User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Stickiness Gauge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-violet-50 border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">DAU/WAU Stickiness</span>
                  </div>
                  <Badge className="bg-cyan-600 text-lg px-3">{((salesData.dau / salesData.wau) * 100).toFixed(0)}%</Badge>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all" 
                    style={{ width: `${(salesData.dau / salesData.wau) * 100}%` }} 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {salesData.dau} daily users out of {salesData.wau} weekly users
                </p>
              </div>

              {/* User Activity Timeline */}
              <div>
                <p className="text-sm font-medium mb-3">Activity This Week</p>
                {mounted && (
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timelineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" fontSize={11} />
                        <YAxis fontSize={11} />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="activeUsers" stroke="#06b6d4" fill="url(#activityGrad)" strokeWidth={2} />
                        <Line type="monotone" dataKey="newUsers" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dealer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-500" />
              Dealer Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              {mounted && (
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dealerSplit} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                        {dealerSplit.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="flex-1 space-y-3">
                {dealerSplit.map(item => (
                  <div key={item.name} className="p-3 rounded-lg border" style={{ borderLeftColor: item.color, borderLeftWidth: 4 }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.name === 'New' ? <UserPlus className="h-4 w-4" style={{ color: item.color }} /> : <Users className="h-4 w-4" style={{ color: item.color }} />}
                        <span className="text-sm font-medium">{item.name} Dealers</span>
                      </div>
                      <span className="font-bold text-lg">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-secondary text-center">
                <CalendarDays className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xl font-bold">{dealerData.dealersPerDay.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Dealers/Day</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xl font-bold">{dealerData.dealersPerWeek}</p>
                <p className="text-xs text-muted-foreground">Dealers/Week</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <Car className="h-5 w-5 mx-auto mb-2 text-amber-600" />
                <p className="text-xl font-bold text-amber-700">{dealerData.avgVinsPerDealer.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg VINs/Demo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Duration & Feature Adoption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Duration Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-amber-500" />
              Session Duration Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mounted && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={durationData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="range" fontSize={11} angle={-20} textAnchor="end" height={50} />
                    <YAxis fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                      {durationData.map((entry, index) => (
                        <Cell key={index} fill={entry.range.includes('5-10') || entry.range.includes('10-15') ? '#10b981' : '#f59e0b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-secondary text-center">
                <p className="text-xs text-muted-foreground">Avg Duration</p>
                <p className="text-lg font-bold">5m 42s</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-xs text-muted-foreground">Optimal (5-15m)</p>
                <p className="text-lg font-bold text-green-700">68%</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center">
                <p className="text-xs text-muted-foreground">Too Short (&lt;2m)</p>
                <p className="text-lg font-bold text-red-700">12%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Adoption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-violet-500" />
              Feature Adoption Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureData.map((feature, i) => (
                <div key={feature.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: feature.color + '20' }}>
                        <Award className="h-4 w-4" style={{ color: feature.color }} />
                      </div>
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{feature.adoption}%</span>
                      <Badge variant={feature.trend > 0 ? 'default' : 'destructive'} className="text-xs">
                        {feature.trend > 0 ? '+' : ''}{feature.trend}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all" 
                      style={{ width: `${feature.adoption}%`, backgroundColor: feature.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.users} users adopted</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-pink-500" />
            Usage Heatmap - Peak Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Hour labels */}
              <div className="flex mb-2">
                <div className="w-12"></div>
                {hours.filter((_, i) => i % 2 === 0).map(hour => (
                  <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
                    {hour}:00
                  </div>
                ))}
              </div>
              {/* Heatmap grid */}
              {days.map((day, dayIndex) => (
                <div key={day} className="flex items-center mb-1">
                  <div className="w-12 text-xs font-medium text-muted-foreground">{day}</div>
                  <div className="flex-1 flex gap-0.5">
                    {heatmapData
                      .filter(d => d.day === dayIndex)
                      .map((cell) => {
                        const intensity = cell.sessions / 50 // Normalize to 0-1
                        const bg = intensity > 0.7 ? 'bg-violet-600' : 
                                   intensity > 0.4 ? 'bg-violet-400' : 
                                   intensity > 0.2 ? 'bg-violet-200' : 'bg-violet-50'
                        return (
                          <div
                            key={`${cell.day}-${cell.hour}`}
                            className={`h-6 flex-1 rounded-sm ${bg} hover:ring-2 hover:ring-violet-300 cursor-pointer transition-all`}
                            title={`${days[cell.day]} ${cell.hour}:00 - ${cell.sessions} sessions`}
                          />
                        )
                      })}
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center justify-end gap-4 mt-4">
                <span className="text-xs text-muted-foreground">Low</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-violet-50"></div>
                  <div className="w-4 h-4 rounded bg-violet-200"></div>
                  <div className="w-4 h-4 rounded bg-violet-400"></div>
                  <div className="w-4 h-4 rounded bg-violet-600"></div>
                </div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Failure Report Component
export function FailureReportSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const data = mockFailureReports.sort((a, b) => b.count - a.count)
  const total = data.reduce((sum, d) => sum + d.count, 0)

  const ICONS: Record<string, React.ElementType> = {
    plugin_crash: Zap,
    dealer_detection_failed: Eye,
    scan_failed: Camera,
    transform_failed: RefreshCw,
    preview_load_failed: MonitorPlay,
    vini_widget_init_failed: MessageSquare,
    plugin_loaded_too_frequently: AlertCircle,
  }

  const LABELS: Record<string, string> = {
    plugin_crash: 'Plugin Crash',
    dealer_detection_failed: 'Dealer Detection Failed',
    scan_failed: 'Scan Failed',
    transform_failed: 'Transform Failed',
    preview_load_failed: 'Preview Load Failed',
    vini_widget_init_failed: 'VINI Widget Init Failed',
    plugin_loaded_too_frequently: 'Plugin Loaded Too Frequently',
  }

  const chartData = data.map(d => ({ name: LABELS[d.type], count: d.count, percent: d.percentOfSessions }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Failure & Error Reporting
          </CardTitle>
          <Badge variant="destructive">{total} Total Failures</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mounted && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" fontSize={11} />
                  <YAxis type="category" dataKey="name" fontSize={11} width={95} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} formatter={(v: number, n, p: any) => [`${v} (${p.payload.percent.toFixed(1)}%)`, 'Count']} />
                  <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">% Sessions</TableHead>
                  <TableHead className="text-right">Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((f) => {
                  const Icon = ICONS[f.type] || AlertCircle
                  return (
                    <TableRow key={f.type}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{LABELS[f.type]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">{f.count}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={f.percentOfSessions > 5 ? 'destructive' : 'secondary'}>
                          {f.percentOfSessions.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(f.lastOccurrence), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// VINI Engagement Component
export function VINIEngagementSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const activation = mockViniActivation
  const interaction = mockViniInteraction
  const activationRate = ((activation.widgetActivated / activation.widgetShown) * 100).toFixed(1)

  const ibOb = [
    { name: 'Inbound', value: activation.inboundCount, color: '#06b6d4' },
    { name: 'Outbound', value: activation.outboundCount, color: '#8b5cf6' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-cyan-500" />
          VINI Engagement Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Activation</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 rounded-lg bg-cyan-50 border border-cyan-200 text-center">
                <p className="text-sm text-muted-foreground">Shown</p>
                <p className="text-2xl font-bold text-cyan-700">{activation.widgetShown}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-sm text-muted-foreground">Activated</p>
                <p className="text-2xl font-bold text-green-700">{activation.widgetActivated}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Activation Rate</span>
                <Badge variant="default">{activationRate}%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${activationRate}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {mounted && (
                <div className="w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={ibOb} cx="50%" cy="50%" innerRadius={20} outerRadius={35} dataKey="value" paddingAngle={2}>
                        {ibOb.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-cyan-50">
                  <div className="flex items-center gap-2">
                    <PhoneIncoming className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Inbound</span>
                  </div>
                  <span className="font-bold">{activation.inboundCount}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-violet-50">
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="h-4 w-4 text-violet-600" />
                    <span className="text-sm">Outbound</span>
                  </div>
                  <span className="font-bold">{activation.outboundCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Interaction</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border text-center">
                <Phone className="h-5 w-5 mx-auto mb-2 text-cyan-500" />
                <p className="text-xl font-bold">{interaction.callsInitiated}</p>
                <p className="text-xs text-muted-foreground">Calls</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <MessageCircle className="h-5 w-5 mx-auto mb-2 text-violet-500" />
                <p className="text-xl font-bold">{interaction.chatsInitiated}</p>
                <p className="text-xs text-muted-foreground">Chats</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <Mail className="h-5 w-5 mx-auto mb-2 text-pink-500" />
                <p className="text-xl font-bold">{interaction.emailsInitiated}</p>
                <p className="text-xs text-muted-foreground">Emails</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">Avg Call Duration</span>
                </div>
                <p className="text-xl font-bold text-amber-700">
                  {Math.floor(interaction.avgCallDuration / 60)}m {interaction.avgCallDuration % 60}s
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">End-Call Summary</span>
                </div>
                <p className="text-xl font-bold text-green-700">{interaction.callsWithEndCallSummaryPercent.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Trends Section Component
export function TrendsChartSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const daily = mockDailyTrends.map(d => ({
    ...d,
    date: format(new Date(d.date), 'MMM d'),
    successRate: d.sessions > 0 ? ((d.successfulSessions / d.sessions) * 100).toFixed(1) : 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Time-Based Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mounted && (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={daily} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis yAxisId="left" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <defs>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area yAxisId="left" type="monotone" dataKey="successfulSessions" fill="url(#successGrad)" stroke="#10b981" strokeWidth={2} name="Successful" />
                <Bar yAxisId="left" dataKey="failedSessions" fill="#ef4444" opacity={0.8} radius={[4, 4, 0, 0]} name="Failed" />
                <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} name="Total" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Sales Leaderboard Component
export function SalesLeaderboardSection() {
  const data = mockSalesLeaderboard

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg"><Trophy className="h-4 w-4 text-white" /></div>
    if (rank === 2) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow"><Medal className="h-4 w-4 text-white" /></div>
    if (rank === 3) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow"><Medal className="h-4 w-4 text-white" /></div>
    return <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground">{rank}</div>
  }

  const getRankChange = (change: number) => {
    if (change > 0) return <span className="flex items-center gap-0.5 text-green-600 text-xs"><ArrowUp className="h-3 w-3" />{change}</span>
    if (change < 0) return <span className="flex items-center gap-0.5 text-red-600 text-xs"><ArrowDown className="h-3 w-3" />{Math.abs(change)}</span>
    return <span className="flex items-center gap-0.5 text-muted-foreground text-xs"><Minus className="h-3 w-3" /></span>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Sales Leaderboard
          </CardTitle>
          <Badge variant="secondary">{data.length} Users</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Sales Rep</TableHead>
              <TableHead className="text-center">Demos</TableHead>
              <TableHead className="text-center">Success Rate</TableHead>
              <TableHead className="text-center">Avg Score</TableHead>
              <TableHead className="text-center">Dealers</TableHead>
              <TableHead className="text-center">VINI %</TableHead>
              <TableHead className="text-center w-16">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={user.userId} className={i < 3 ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''}>
                <TableCell>{getRankBadge(user.rank)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{user.userName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-mono font-bold">{user.totalDemos}</span>
                  <span className="text-muted-foreground text-xs ml-1">({user.successfulDemos}✓)</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={user.successRate >= 85 ? 'default' : user.successRate >= 75 ? 'secondary' : 'destructive'}>
                    {user.successRate.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`font-mono font-bold ${
                    user.avgScore >= 85 ? 'text-green-600' :
                    user.avgScore >= 70 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {user.avgScore}
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">{user.dealersDemoed}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 rounded-full" 
                        style={{ width: `${user.viniUsageRate}%` }} 
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{user.viniUsageRate.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getRankChange(user.rankChange)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Dealer Coverage Visualization Component
export function DealerCoverageSection() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const coverage = mockDealerCoverage
  const split = mockDealerCoverageSplit

  const pieData = [
    { name: 'Studio Only', value: split.studioOnly.count, color: '#8b5cf6', percentage: split.studioOnly.percentage },
    { name: 'VINI Only', value: split.viniOnly.count, color: '#06b6d4', percentage: split.viniOnly.percentage },
    { name: 'Both', value: split.both.count, color: '#10b981', percentage: split.both.percentage },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-green-500" />
          Dealer Coverage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex items-center gap-6">
            {mounted && (
              <div className="w-44 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={3}
                      label={({ percentage }) => `${percentage.toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number, n, p: any) => [`${v} dealers (${p.payload.percentage.toFixed(1)}%)`, p.payload.name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="flex-1 space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="p-3 rounded-lg border" style={{ borderLeftColor: item.color, borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{item.value}</span>
                      <Badge variant="secondary">{item.percentage.toFixed(1)}%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-violet-50 border border-violet-200">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="h-4 w-4 text-violet-600" />
                  <span className="text-sm text-muted-foreground">Studio Only</span>
                </div>
                <p className="text-2xl font-bold text-violet-700">{split.studioOnly.count}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  Top: {split.studioOnly.topDealers[0]}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm text-muted-foreground">VINI Only</span>
                </div>
                <p className="text-2xl font-bold text-cyan-700">{split.viniOnly.count}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  Top: {split.viniOnly.topDealers[0]}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Both Features</span>
                </div>
                <Badge className="bg-green-600">{split.both.percentage.toFixed(0)}%</Badge>
              </div>
              <p className="text-3xl font-bold text-green-700">{split.both.count}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <p className="font-medium mb-1">Top Dealers:</p>
                <div className="flex flex-wrap gap-1">
                  {split.both.topDealers.map((dealer, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{dealer}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border">
                <p className="text-xs text-muted-foreground">Avg VINs/Dealer</p>
                <p className="text-xl font-bold">{coverage.vinsScrapedPerDealer.toFixed(1)}</p>
              </div>
              <div className="p-3 rounded-lg border">
                <p className="text-xs text-muted-foreground">Cached Inventory</p>
                <p className="text-xl font-bold">{coverage.dealersWithCachedInventory}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Export Data Utility Functions
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        const stringValue = String(value ?? '')
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(',')
    )
  ]
  
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

// Export Panel Component
export function ExportPanelSection() {
  const [isExporting, setIsExporting] = React.useState<string | null>(null)

  const handleExport = async (type: string) => {
    setIsExporting(type)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    switch (type) {
      case 'dealers':
        exportToCSV(mockDealerDemos.map(d => ({
          'Dealer Name': d.dealerName,
          'Type': d.isNewDealer ? 'New' : 'Existing',
          'Last Demo': format(new Date(d.lastDemoDate), 'yyyy-MM-dd HH:mm'),
          'Sales User': d.salesUserName,
          'Demo Type': d.demoType,
          'AI Score': d.aiDemoSuccessScore,
          'VINs Processed': d.vinsProcessed,
          'VINI Used': d.viniUsed ? 'Yes' : 'No',
          'Status': d.demoStatus,
        })), 'dealer_demos')
        break
      case 'funnel':
        exportToCSV(mockDemoFunnel.steps.map(s => ({
          'Step': s.step,
          'Count': s.count,
          'Conversion Rate (%)': s.conversionRate,
          'Drop Off': s.dropOff,
        })), 'demo_funnel')
        break
      case 'leaderboard':
        exportToCSV(mockSalesLeaderboard.map(u => ({
          'Rank': u.rank,
          'Sales Rep': u.userName,
          'Total Demos': u.totalDemos,
          'Successful Demos': u.successfulDemos,
          'Success Rate (%)': u.successRate,
          'Avg Score': u.avgScore,
          'Dealers Demoed': u.dealersDemoed,
          'VINI Usage (%)': u.viniUsageRate,
        })), 'sales_leaderboard')
        break
      case 'failures':
        exportToCSV(mockFailureReports.map(f => ({
          'Type': f.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          'Count': f.count,
          '% of Sessions': f.percentOfSessions,
          'Last Occurrence': format(new Date(f.lastOccurrence), 'yyyy-MM-dd HH:mm'),
        })), 'failure_reports')
        break
      case 'trends':
        exportToCSV(mockDailyTrends.map(t => ({
          'Date': t.date,
          'Total Sessions': t.sessions,
          'Successful': t.successfulSessions,
          'Failed': t.failedSessions,
          'Success Rate (%)': ((t.successfulSessions / t.sessions) * 100).toFixed(1),
        })), 'daily_trends')
        break
    }
    
    setIsExporting(null)
  }

  const exports = [
    { id: 'dealers', label: 'Dealer Demos', icon: Building2, description: 'All dealer demo data with scores and status' },
    { id: 'leaderboard', label: 'Sales Leaderboard', icon: Trophy, description: 'Sales rep rankings and performance metrics' },
    { id: 'funnel', label: 'Demo Funnel', icon: Layers, description: 'Funnel steps with conversion rates' },
    { id: 'failures', label: 'Error Reports', icon: AlertTriangle, description: 'Failure types and occurrences' },
    { id: 'trends', label: 'Daily Trends', icon: TrendingUp, description: 'Session data over time' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-green-500" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exports.map(exp => {
            const Icon = exp.icon
            const isLoading = isExporting === exp.id
            return (
              <div 
                key={exp.id} 
                className="p-4 rounded-lg border hover:border-green-300 hover:bg-green-50/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-secondary group-hover:bg-green-100">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-green-600" />
                    </div>
                    <span className="font-medium">{exp.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{exp.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600"
                  onClick={() => handleExport(exp.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? 'Exporting...' : 'Download CSV'}
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// System Health Component
export function SystemHealthSection() {
  const perf = mockPerformanceMetrics
  const reliability = mockReliabilityMetrics

  const metrics = [
    { name: 'Scan Time', value: perf.avgScanTime, unit: 's', threshold: { good: 3, warn: 5 }, icon: Clock, color: 'cyan' },
    { name: 'Transform Time', value: perf.avgTransformTime, unit: 's', threshold: { good: 5, warn: 8 }, icon: Zap, color: 'violet' },
    { name: 'Preview Load', value: perf.avgPreviewLoadTime, unit: 's', threshold: { good: 2, warn: 4 }, icon: MonitorPlay, color: 'amber' },
    { name: 'VINI Widget', value: perf.avgViniWidgetLoadTime, unit: 's', threshold: { good: 1, warn: 2 }, icon: MessageSquare, color: 'green' },
  ]

  const getStatus = (value: number, threshold: { good: number; warn: number }) => {
    if (value <= threshold.good) return { label: 'Healthy', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
    if (value <= threshold.warn) return { label: 'Warning', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' }
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-500" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map(m => {
            const status = getStatus(m.value, m.threshold)
            const Icon = m.icon
            return (
              <div key={m.name} className={`p-4 rounded-lg border ${status.bg} ${status.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 text-${m.color}-500`} />
                    <span className="text-sm font-medium">{m.name}</span>
                  </div>
                  <Badge variant="secondary" className={status.color}>{status.label}</Badge>
                </div>
                <p className="text-2xl font-bold">{m.value.toFixed(1)}{m.unit}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Plugin Crashes/Day</span>
              </div>
              <Badge variant={reliability.pluginCrashesPerDay <= 2 ? 'default' : reliability.pluginCrashesPerDay <= 5 ? 'secondary' : 'destructive'}>
                {reliability.pluginCrashesPerDay <= 2 ? 'Low' : reliability.pluginCrashesPerDay <= 5 ? 'Moderate' : 'High'}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{reliability.pluginCrashesPerDay.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground mt-1">Target: &lt;2/day</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Abrupt Terminations</span>
              </div>
              <Badge variant={reliability.abruptSessionTerminations <= 30 ? 'default' : reliability.abruptSessionTerminations <= 60 ? 'secondary' : 'destructive'}>
                {reliability.abruptSessionTerminations <= 30 ? 'Low' : reliability.abruptSessionTerminations <= 60 ? 'Moderate' : 'High'}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{reliability.abruptSessionTerminations}</p>
            <p className="text-xs text-muted-foreground mt-1">Sessions unexpectedly closed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Re-export icons and data for use in pages
export { 
  Activity, Users, Building2, CheckCircle2, Clock, MessageSquare, Sparkles, Trophy, Target,
  LayoutDashboard, Layers, AlertTriangle, TrendingUp, Download
}
export { mockOverviewKPIs, mockSalesLeaderboard }

