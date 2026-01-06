"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts"
import { AlertTriangle, Zap, Eye, Camera, MonitorPlay, MessageSquare, RefreshCw, AlertCircle } from "lucide-react"
import type { FailureReport as FailureReportType, DailyTrend } from "@/services/spyne-flip/spyne-flip.types"
import { format, formatDistanceToNow } from "date-fns"

interface FailureReportProps {
  data: FailureReportType[]
  trends?: DailyTrend[]
  isLoading?: boolean
}

const FAILURE_ICONS: Record<string, React.ReactNode> = {
  plugin_crash: <Zap className="h-4 w-4" />,
  dealer_detection_failed: <Eye className="h-4 w-4" />,
  scan_failed: <Camera className="h-4 w-4" />,
  transform_failed: <RefreshCw className="h-4 w-4" />,
  preview_load_failed: <MonitorPlay className="h-4 w-4" />,
  vini_widget_init_failed: <MessageSquare className="h-4 w-4" />,
  plugin_loaded_too_frequently: <AlertCircle className="h-4 w-4" />,
}

const FAILURE_LABELS: Record<string, string> = {
  plugin_crash: 'Plugin Crash',
  dealer_detection_failed: 'Dealer Detection Failed',
  scan_failed: 'Scan Failed',
  transform_failed: 'Transform Failed',
  preview_load_failed: 'Preview Load Failed',
  vini_widget_init_failed: 'VINI Widget Init Failed',
  plugin_loaded_too_frequently: 'Plugin Loaded Too Frequently',
}

const SEVERITY_COLORS = [
  '#ef4444', // Most critical
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
]

export function FailureReport({ data, trends, isLoading }: FailureReportProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const sortedData = React.useMemo(() => 
    [...data].sort((a, b) => b.count - a.count),
    [data]
  )

  const chartData = React.useMemo(() => 
    sortedData.map((item, index) => ({
      name: FAILURE_LABELS[item.type] || item.type,
      count: item.count,
      percent: item.percentOfSessions,
      fill: SEVERITY_COLORS[Math.min(index, SEVERITY_COLORS.length - 1)],
    })),
    [sortedData]
  )

  const failureTrendData = React.useMemo(() => {
    if (!trends) return []
    return trends.map(t => ({
      date: t.date,
      failures: t.failedSessions,
      rate: t.sessions > 0 ? ((t.failedSessions / t.sessions) * 100).toFixed(1) : 0,
    }))
  }, [trends])

  if (isLoading || !mounted) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            Failure & Error Reporting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-slate-700/50 rounded-xl" />
            <div className="h-48 bg-slate-700/50 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalFailures = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            Failure & Error Reporting
          </CardTitle>
          <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/30 px-3 py-1">
            {totalFailures.toLocaleString()} Total Failures
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400 uppercase tracking-wider">Failure Distribution</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={95} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percent.toFixed(1)}%)`,
                      'Count'
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Chart */}
          {failureTrendData.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-400 uppercase tracking-wider">Failure Trend</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={failureTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      fontSize={11}
                      tickFormatter={(value) => format(new Date(value), 'MMM d')}
                    />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'failures' ? value : `${value}%`,
                        name === 'failures' ? 'Failures' : 'Rate'
                      ]}
                      labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                    />
                    <Line
                      type="monotone"
                      dataKey="failures"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#ef4444' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Failure Table */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium">Failure Type</TableHead>
                <TableHead className="text-slate-400 font-medium text-right">Count</TableHead>
                <TableHead className="text-slate-400 font-medium text-right">% of Sessions</TableHead>
                <TableHead className="text-slate-400 font-medium text-right">Last Occurrence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((failure, index) => (
                <TableRow key={failure.type} className="border-slate-700/50 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${SEVERITY_COLORS[Math.min(index, SEVERITY_COLORS.length - 1)]}20` }}
                      >
                        <span style={{ color: SEVERITY_COLORS[Math.min(index, SEVERITY_COLORS.length - 1)] }}>
                          {FAILURE_ICONS[failure.type]}
                        </span>
                      </div>
                      <span className="text-slate-200 font-medium">
                        {FAILURE_LABELS[failure.type] || failure.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-slate-200 font-mono font-medium">
                      {failure.count.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      className={`font-mono ${
                        failure.percentOfSessions > 5 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                          : failure.percentOfSessions > 2 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                      }`}
                    >
                      {failure.percentOfSessions.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-slate-400 text-sm">
                    {formatDistanceToNow(new Date(failure.lastOccurrence), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

