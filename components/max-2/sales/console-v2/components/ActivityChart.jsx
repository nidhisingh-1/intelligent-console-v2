"use client"

import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList,
  LineChart, Line, Legend,
} from 'recharts'
import { Phone, MessageSquare, Mail, ChevronDown } from 'lucide-react'

const TOGGLES_INBOUND = [
  { id: 'leadsInteracted',   label: 'Leads Interacted',          color: '#4F46E5' },
  { id: 'leadsQualified',    label: 'Leads Qualified',           color: '#0D9488' },
  { id: 'afterHoursEngaged', label: 'After Hours Leads Engaged', color: '#D97706' },
  { id: 'humanHandoffs',     label: 'Human Handoffs',            color: '#7C3AED' },
  { id: 'appointments',      label: 'Appointments Booked',       color: '#10B981' },
]

const TOGGLES_OUTBOUND = [
  { id: 'crmLeadsWorked',    label: 'CRM Leads Worked',    color: '#4F46E5' },
  { id: 'responseRate',      label: 'Response Rate',       color: '#0D9488' },
  { id: 'reEngagements',     label: 'Re-engagements',      color: '#D97706' },
  { id: 'humanHandoffs',     label: 'Human Handoffs',      color: '#7C3AED' },
  { id: 'appointmentsBooked', label: 'Appointments Booked', color: '#10B981' },
]

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="spyne-caption px-2.5 py-1.5 shadow-lg"
      style={{
        background: 'var(--spyne-text-primary)',
        color: '#fff',
        borderRadius: 'var(--spyne-radius-md)',
      }}
    >
      <div style={{ fontWeight: 700 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}{unit || ''}
        </div>
      ))}
    </div>
  )
}

export default function ActivityChart({ data, agentType }) {
  const isOutbound = agentType === 'outbound'
  const TOGGLES = isOutbound ? TOGGLES_OUTBOUND : TOGGLES_INBOUND
  const [activeMetric, setActiveMetric] = useState(isOutbound ? 'crmLeadsWorked' : 'leadsInteracted')
  const [granularity, setGranularity]   = useState('daily')
  const [chartMode, setChartMode]       = useState('perMetric') // 'perMetric' | 'pipeline'

  useEffect(() => {
    setActiveMetric(isOutbound ? 'crmLeadsWorked' : 'leadsInteracted')
  }, [isOutbound])

  const activeGranularity = (granularity === 'weekly' && data.weekly) ? 'weekly' : 'daily'
  const chartSource = data[activeGranularity] || data.daily

  // Guard against stale metric key after agent switch
  const safeMetric = chartSource.metrics[activeMetric] ? activeMetric : TOGGLES[0].id
  const metric = chartSource.metrics[safeMetric]
  const unit = metric?.unit || ''
  const lowerIsBetter = metric?.lowerIsBetter

  // Per-metric bar chart data
  const barData = chartSource.days.map((day, i) => ({
    day,
    value: metric?.data[i] ?? 0,
  }))

  // Pipeline view — all metrics as lines on one chart
  const lineData = chartSource.days.map((day, i) => {
    const entry = { day }
    TOGGLES.forEach((t) => {
      if (chartSource.metrics[t.id]) {
        entry[t.id] = chartSource.metrics[t.id].data[i]
      }
    })
    return entry
  })

  return (
    <div className="spyne-card p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="spyne-heading">Recent Activity</div>
          {/* Granularity picker */}
          <div className="relative">
            <select
              value={granularity}
              onChange={(e) => setGranularity(e.target.value)}
              className="spyne-input appearance-none cursor-pointer"
              style={{ fontSize: 11, height: 28, paddingLeft: 10, paddingRight: 24, fontFamily: 'inherit' }}
              aria-label="Chart granularity"
            >
              <option value="daily">Daily</option>
              {data.weekly && <option value="weekly">Weekly</option>}
            </select>
            <ChevronDown
              size={11}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--spyne-text-muted)' }}
            />
          </div>
        </div>

        {/* Chart mode tabs */}
        <div
          style={{
            display: 'flex',
            border: '1px solid var(--spyne-border)',
            borderRadius: 'var(--spyne-radius-md)',
            overflow: 'hidden',
            background: 'var(--spyne-surface)',
            flexShrink: 0,
          }}
        >
          {[
            { id: 'perMetric', label: 'Per Metric' },
            { id: 'pipeline',  label: 'Pipeline View' },
          ].map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setChartMode(tab.id)}
              style={{
                padding: '0 12px', height: 28, fontSize: 11, fontWeight: chartMode === tab.id ? 600 : 500,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                background: chartMode === tab.id ? 'var(--spyne-brand-subtle)' : 'transparent',
                color: chartMode === tab.id ? 'var(--spyne-brand)' : 'var(--spyne-text-muted)',
                borderRight: i === 0 ? '1px solid var(--spyne-border)' : 'none',
                transition: 'all 150ms',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric toggle pills — only in Per Metric mode */}
      {chartMode === 'perMetric' && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {TOGGLES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveMetric(t.id)}
              className={`spyne-pill ${activeMetric === t.id ? 'spyne-pill-active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Charts */}
      {chartMode === 'perMetric' ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} margin={{ top: 20, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--spyne-border)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'var(--spyne-text-muted)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
              interval={activeGranularity === 'daily' && barData.length > 14 ? Math.floor(barData.length / 10) : 0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--spyne-text-muted)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} cursor={{ fill: 'var(--spyne-brand-subtle)' }} />
            <Bar dataKey="value" name={metric?.label} fill="var(--spyne-brand)" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {barData.length <= 14 && (
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{ fontSize: 10, fill: 'var(--spyne-text-secondary)', fontWeight: 600, fontFamily: 'inherit' }}
                  formatter={(v) => `${v}${unit}`}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--spyne-border)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'var(--spyne-text-muted)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
              interval={activeGranularity === 'daily' && lineData.length > 14 ? Math.floor(lineData.length / 10) : 0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--spyne-text-muted)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            />
            {TOGGLES.map((t) => (
              chartSource.metrics[t.id] ? (
                <Line
                  key={t.id}
                  type="monotone"
                  dataKey={t.id}
                  name={t.label}
                  stroke={t.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ) : null
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {chartMode === 'perMetric' && lowerIsBetter && (
        <div className="text-center spyne-caption mt-1" style={{ color: 'var(--spyne-text-muted)' }}>
          Lower is better — faster response time
        </div>
      )}

      {/* Channel summary */}
      <div
        className="flex items-center justify-center gap-5 mt-4 pt-4"
        style={{ borderTop: '1px solid var(--spyne-border)' }}
      >
        <ChannelStat icon={Phone}         label="Calls"  value={data.channelSummary.calls} />
        <ChannelStat icon={MessageSquare} label="SMS"    value={data.channelSummary.sms} />
        <ChannelStat icon={Mail}          label="Emails" value={data.channelSummary.emails} />
      </div>
    </div>
  )
}

function ChannelStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon size={12} style={{ color: 'var(--spyne-text-muted)' }} />
      <span className="spyne-caption" style={{ color: 'var(--spyne-text-secondary)' }}>Total {label}:</span>
      <span className="spyne-caption" style={{ color: 'var(--spyne-text-primary)', fontWeight: 700 }}>{value}</span>
    </div>
  )
}
