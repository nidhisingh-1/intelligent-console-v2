"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Phone, MessageSquare, X, Car, DollarSign, Sparkles } from 'lucide-react'

// ── Mock data (2 weeks) ───────────────────────────────────────

const WEEK_DATA = [
  {
    weekLabel: 'Mar 31 – Apr 6',
    days: [
      {
        key: 'mon-mar31', dayLabel: 'Mon', date: 'Mar 31', isToday: false,
        appts: [
          { id: 'a1', type: 'test-drive',  timeStart: 10.0, timeEnd: 11.0, customer: 'Robert Kim',    phone: '+1 (555) 112-3344', vehicle: '2024 Toyota Highlander XLE', budget: '$42,000',       agentAction: 'Vini AI confirmed appointment', status: 'upcoming' },
          { id: 'a2', type: 'negotiation', timeStart: 14.0, timeEnd: 14.5, customer: 'Nina Patel',    phone: '+1 (555) 877-2200', vehicle: '2023 Subaru Outback XT',    budget: '$35,000',       agentAction: 'Inbound inquiry via Cars.com', status: 'upcoming' },
        ],
      },
      {
        key: 'tue-apr1', dayLabel: 'Tue', date: 'Apr 1', isToday: false,
        appts: [
          { id: 'b1', type: 'close-deal',  timeStart: 9.0,  timeEnd: 10.0, customer: 'Alex Turner',  phone: '+1 (555) 334-9910', vehicle: '2023 Honda CR-V EX-L AWD', budget: '$37,500 OTD',  agentAction: 'OTD price confirmed by customer', status: 'upcoming' },
          { id: 'b2', type: 'test-drive',  timeStart: 11.0, timeEnd: 12.0, customer: 'Claire Wong',  phone: '+1 (555) 662-7711', vehicle: '2024 Mazda CX-5 Turbo',    budget: '$38,000',       agentAction: 'Vini AI booked test drive', status: 'upcoming' },
          { id: 'b3', type: 'negotiation', timeStart: 15.0, timeEnd: 15.5, customer: 'Ryan Brooks',  phone: '+1 (555) 990-4412', vehicle: '2022 Jeep Wrangler Sport',  budget: '$45,000',       agentAction: 'Price comparison requested', status: 'upcoming' },
        ],
      },
      {
        key: 'wed-apr2', dayLabel: 'Wed', date: 'Apr 2', isToday: false,
        appts: [],
      },
      {
        key: 'thu-apr3', dayLabel: 'Thu', date: 'Apr 3', isToday: true,
        appts: [
          { id: '1', type: 'test-drive',  timeStart: 9.0,  timeEnd: 10.0, customer: 'Sarah Delgado',  phone: '+1 (555) 312-4490', vehicle: '2025 Toyota Camry XSE · Midnight Black', budget: '$450/mo',     agentAction: 'Vini AI confirmed appointment', status: 'started' },
          { id: '2', type: 'negotiation', timeStart: 10.5, timeEnd: 11.0, customer: 'Marcus Webb',    phone: '+1 (555) 891-3344', vehicle: '2023 Honda CR-V EX-L',                  budget: '$36,500',     agentAction: 'Inbound call — price discussion pending', status: 'upcoming' },
          { id: '3', type: 'test-drive',  timeStart: 12.5, timeEnd: 13.0, customer: 'Jessica Parker', phone: '+1 (555) 678-9901', vehicle: '2024 Ford Mustang GT · Race Red',        budget: '$42,000',     agentAction: 'Vini AI booked test drive', status: 'upcoming' },
          { id: '4', type: 'close-deal',  timeStart: 12.5, timeEnd: 13.5, customer: 'Maria Torres',   phone: '+1 (555) 234-5678', vehicle: '2023 Honda CR-V EX-L AWD',              budget: '$35,900 OTD', agentAction: 'Paperwork requested by customer', status: 'upcoming' },
          { id: '5', type: 'test-drive',  timeStart: 14.0, timeEnd: 14.5, customer: 'Emma Stone',     phone: '+1 (555) 678-2210', vehicle: '2018 Honda CR-V',                       budget: '$15,000 – $25,000', agentAction: 'Outgoing SMS by Vini', status: 'upcoming' },
          { id: '6', type: 'negotiation', timeStart: 15.0, timeEnd: 15.5, customer: 'Daniel Craig',   phone: '+1 (555) 901-3344', vehicle: '2020 Toyota RAV4',                      budget: '$20,000 – $30,000', agentAction: 'Email sent by Vini', status: 'upcoming' },
          { id: '7', type: 'pickup',      timeStart: 16.5, timeEnd: 17.0, customer: 'James Carter',   phone: '+1 (555) 445-7821', vehicle: '2022 Ford Explorer',                    budget: '$25,000 – $35,000', agentAction: 'Outgoing call by Marcus', status: 'upcoming' },
        ],
      },
      {
        key: 'fri-apr4', dayLabel: 'Fri', date: 'Apr 4', isToday: false,
        appts: [
          { id: 't1', type: 'test-drive',  timeStart: 10.0, timeEnd: 11.0, customer: 'Sarah Mitchell', phone: '+1 (555) 223-9900', vehicle: '2023 Audi Q5',          budget: '$30,000 – $40,000', agentAction: 'Incoming call from Jake', status: 'upcoming' },
          { id: 't2', type: 'negotiation', timeStart: 13.0, timeEnd: 13.5, customer: 'Kevin Walsh',    phone: '+1 (555) 551-0032', vehicle: '2021 Chevy Equinox',     budget: '$20,000 – $28,000', agentAction: 'Outgoing call by Vini', status: 'upcoming' },
          { id: 't3', type: 'close-deal',  timeStart: 15.5, timeEnd: 16.0, customer: 'Diana Torres',   phone: '+1 (555) 447-2291', vehicle: '2024 Toyota RAV4 XLE',  budget: '$33,000 – $38,000', agentAction: 'Incoming call from Marcus', status: 'upcoming' },
        ],
      },
      {
        key: 'sat-apr5', dayLabel: 'Sat', date: 'Apr 5', isToday: false,
        appts: [
          { id: 's1', type: 'test-drive', timeStart: 10.0, timeEnd: 11.0, customer: 'Jessica Parker', phone: '+1 (555) 678-9901', vehicle: '2024 Ford Mustang GT', budget: '$42,000', agentAction: 'Vini AI confirmed', status: 'upcoming' },
        ],
      },
      {
        key: 'sun-apr6', dayLabel: 'Sun', date: 'Apr 6', isToday: false,
        appts: [],
      },
    ],
  },
  {
    weekLabel: 'Apr 7 – Apr 13',
    days: [
      {
        key: 'mon-apr7', dayLabel: 'Mon', date: 'Apr 7', isToday: false,
        appts: [
          { id: 'w2a', type: 'test-drive',  timeStart: 9.5,  timeEnd: 10.5, customer: 'Lena Fischer',  phone: '+1 (555) 321-6677', vehicle: '2024 BMW X3 xDrive30i', budget: '$55,000',       agentAction: 'Vini AI confirmed test drive', status: 'upcoming' },
          { id: 'w2b', type: 'close-deal',  timeStart: 14.0, timeEnd: 15.0, customer: 'Tom Bradley',   phone: '+1 (555) 883-4420', vehicle: '2023 Ford F-150 XLT',   budget: '$50,000 OTD',  agentAction: 'Financing approved — ready to sign', status: 'upcoming' },
        ],
      },
      {
        key: 'tue-apr8', dayLabel: 'Tue', date: 'Apr 8', isToday: false,
        appts: [
          { id: 'w2c', type: 'negotiation', timeStart: 11.0, timeEnd: 11.5, customer: 'Amy Santos',    phone: '+1 (555) 776-2201', vehicle: '2024 Hyundai Tucson SEL', budget: '$34,000',     agentAction: 'Lease vs finance comparison pending', status: 'upcoming' },
        ],
      },
      {
        key: 'wed-apr9', dayLabel: 'Wed', date: 'Apr 9', isToday: false,
        appts: [
          { id: 'w2d', type: 'pickup',     timeStart: 10.0, timeEnd: 10.5, customer: 'Brian Moore',   phone: '+1 (555) 440-8833', vehicle: '2022 Honda Accord Sport', budget: '$28,000',      agentAction: 'Vehicle prepped and ready', status: 'upcoming' },
          { id: 'w2e', type: 'test-drive', timeStart: 13.5, timeEnd: 14.5, customer: 'Olivia Nash',   phone: '+1 (555) 119-3305', vehicle: '2024 Kia Telluride SX',   budget: '$48,000',      agentAction: 'Incoming CarGurus lead', status: 'upcoming' },
        ],
      },
      { key: 'thu-apr10', dayLabel: 'Thu', date: 'Apr 10', isToday: false, appts: [] },
      {
        key: 'fri-apr11', dayLabel: 'Fri', date: 'Apr 11', isToday: false,
        appts: [
          { id: 'w2f', type: 'close-deal', timeStart: 15.0, timeEnd: 16.0, customer: 'Carlos Rivera', phone: '+1 (555) 557-9920', vehicle: '2023 Toyota Tacoma TRD',  budget: '$46,000 OTD',  agentAction: 'All docs prepared — finance waiting', status: 'upcoming' },
        ],
      },
      { key: 'sat-apr12', dayLabel: 'Sat', date: 'Apr 12', isToday: false, appts: [] },
      { key: 'sun-apr13', dayLabel: 'Sun', date: 'Apr 13', isToday: false, appts: [] },
    ],
  },
]

// ── Config ────────────────────────────────────────────────────

const TYPE_CONFIG = {
  'test-drive':  { label: 'Test Drive',  color: '#4F46E5', bg: '#EEF2FF' },
  'close-deal':  { label: 'Close Deal',  color: '#10B981', bg: '#ECFDF5' },
  'negotiation': { label: 'Negotiation', color: '#D97706', bg: '#FFFBEB' },
  'pickup':      { label: 'Pickup',      color: '#0EA5E9', bg: '#F0F9FF' },
  'appointment': { label: 'Appointment', color: '#7C3AED', bg: '#F5F3FF' },
}

const HOUR_START = 8
const HOUR_END   = 19
const HOURS      = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
const ROW_HEIGHT = 64 // px per hour

// ── Appointment Detail Overlay ────────────────────────────────

function AppointmentDetailPanel({ appt, onClose }) {
  if (!appt) return null
  const cfg    = TYPE_CONFIG[appt.type] || TYPE_CONFIG['appointment']
  const startH = Math.floor(appt.timeStart)
  const startM = ((appt.timeStart % 1) * 60).toString().padStart(2, '0')
  const endH   = Math.floor(appt.timeEnd)
  const endM   = ((appt.timeEnd % 1) * 60).toString().padStart(2, '0')
  const fmt    = (h, m) => `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? 'PM' : 'AM'}`

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 59 }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
        background: 'var(--spyne-surface)', borderLeft: '1px solid var(--spyne-border)',
        zIndex: 60, display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--spyne-border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: cfg.color, background: cfg.bg,
                borderRadius: 'var(--spyne-radius-pill)', padding: '2px 8px', marginBottom: 8,
              }}>
                {cfg.label}
              </span>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--spyne-text-primary)', margin: 0 }}>{appt.customer}</h2>
              <p style={{ fontSize: 13, color: 'var(--spyne-text-muted)', marginTop: 3 }}>
                {fmt(startH, startM)} – {fmt(endH, endM)}
              </p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--spyne-text-muted)', padding: 4 }}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Car size={14} style={{ color: 'var(--spyne-text-muted)', marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--spyne-text-muted)', marginBottom: 2 }}>Vehicle</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--spyne-text-primary)' }}>{appt.vehicle}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <DollarSign size={14} style={{ color: 'var(--spyne-text-muted)', marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--spyne-text-muted)', marginBottom: 2 }}>Budget</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--spyne-text-primary)' }}>{appt.budget}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Sparkles size={14} style={{ color: 'var(--spyne-brand)', marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--spyne-text-muted)', marginBottom: 2 }}>Agent Note</p>
              <p style={{ fontSize: 13, color: 'var(--spyne-text-secondary)', lineHeight: 1.5 }}>{appt.agentAction}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
            <a href={`tel:${appt.phone}`} className="spyne-btn-primary" style={{ flex: 1, justifyContent: 'center', gap: 6, fontSize: 13 }}>
              <Phone size={13} /> Call
            </a>
            <button className="spyne-btn-ghost" style={{ flex: 1, justifyContent: 'center', gap: 6, fontSize: 13 }}>
              <MessageSquare size={13} /> Message
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Column appointment layout (overlap detection) ─────────────

function layoutAppts(list) {
  const sorted = [...list].sort((a, b) => a.timeStart - b.timeStart)
  const columns = []
  sorted.forEach((appt) => {
    let placed = false
    for (const col of columns) {
      if (appt.timeStart >= col[col.length - 1].timeEnd) {
        col.push(appt)
        placed = true
        break
      }
    }
    if (!placed) columns.push([appt])
  })
  const totalCols = columns.length
  return columns.flatMap((col, colIdx) =>
    col.map((appt) => ({ appt, colIdx, totalCols }))
  )
}

// ── Week grid ─────────────────────────────────────────────────

function WeekGrid({ days, onSelectAppt }) {
  const GUTTER = 52

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Day column headers */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--spyne-border)', paddingBottom: 10, marginBottom: 0 }}>
        {/* Gutter spacer */}
        <div style={{ width: GUTTER, flexShrink: 0 }} />
        {days.map((day) => {
          const total = day.appts.length
          return (
            <div
              key={day.key}
              style={{
                flex: 1, textAlign: 'center', paddingBottom: 8,
                borderLeft: '1px solid var(--spyne-border)',
                background: day.isToday ? 'var(--spyne-brand-subtle)' : 'transparent',
              }}
            >
              <p style={{
                fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
                color: day.isToday ? 'var(--spyne-brand)' : 'var(--spyne-text-muted)',
                marginBottom: 3, paddingTop: 10,
              }}>
                {day.dayLabel}
              </p>
              <p style={{
                fontSize: 16, fontWeight: 700,
                color: day.isToday ? 'var(--spyne-brand)' : 'var(--spyne-text-primary)',
                lineHeight: 1,
              }}>
                {day.date.split(' ')[1]}
              </p>
              <p style={{ fontSize: 10, color: 'var(--spyne-text-muted)', marginTop: 2 }}>
                {day.date.split(' ')[0]}
              </p>
              {total > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 5, minWidth: 18, height: 18, borderRadius: 'var(--spyne-radius-pill)',
                  padding: '0 5px', fontSize: 10, fontWeight: 700,
                  background: day.isToday ? 'var(--spyne-brand)' : 'var(--spyne-border)',
                  color: day.isToday ? '#fff' : 'var(--spyne-text-secondary)',
                }}>
                  {total}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Time gutter */}
        <div style={{ width: GUTTER, flexShrink: 0, position: 'relative' }}>
          {HOURS.map((h) => (
            <div key={h} style={{ height: ROW_HEIGHT, position: 'relative' }}>
              <span style={{
                position: 'absolute', top: -8, right: 8,
                fontSize: 10, fontWeight: 500, color: 'var(--spyne-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day) => {
          const laid = layoutAppts(day.appts)
          return (
            <div
              key={day.key}
              style={{
                flex: 1,
                position: 'relative',
                borderLeft: '1px solid var(--spyne-border)',
                background: day.isToday ? 'var(--spyne-brand-subtle)' : 'transparent',
              }}
            >
              {/* Hour lines */}
              {HOURS.map((h) => (
                <div key={h} style={{
                  position: 'absolute', left: 0, right: 0,
                  top: (h - HOUR_START) * ROW_HEIGHT,
                  height: ROW_HEIGHT,
                  borderTop: `1px solid ${day.isToday ? 'var(--spyne-brand-muted)' : 'var(--spyne-border)'}`,
                  opacity: day.isToday ? 0.5 : 1,
                }} />
              ))}

              {/* Spacer to set column height */}
              <div style={{ height: HOURS.length * ROW_HEIGHT }} />

              {/* Appointment blocks */}
              {laid.map(({ appt, colIdx, totalCols }) => {
                const cfg    = TYPE_CONFIG[appt.type] || TYPE_CONFIG['appointment']
                const top    = (appt.timeStart - HOUR_START) * ROW_HEIGHT + 2
                const height = Math.max((appt.timeEnd - appt.timeStart) * ROW_HEIGHT - 4, 22)
                const width  = totalCols > 1 ? `calc(${100 / totalCols}% - 3px)` : 'calc(100% - 6px)'
                const left   = totalCols > 1 ? `calc(${(colIdx / totalCols) * 100}% + 3px)` : '3px'

                return (
                  <div
                    key={appt.id}
                    onClick={() => onSelectAppt(appt)}
                    style={{
                      position: 'absolute',
                      top, left, width, height,
                      background: cfg.bg,
                      border: `1.5px solid ${cfg.color}44`,
                      borderLeft: `3px solid ${cfg.color}`,
                      borderRadius: 5,
                      padding: '3px 6px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxShadow: appt.status === 'started' ? `0 0 0 2px ${cfg.color}` : 'none',
                      transition: 'box-shadow 150ms',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 2px 8px ${cfg.color}44`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = appt.status === 'started' ? `0 0 0 2px ${cfg.color}` : 'none'}
                  >
                    <p style={{ fontSize: 11, fontWeight: 700, color: cfg.color, lineHeight: 1.3, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {appt.customer.split(' ')[0]}
                    </p>
                    {height > 32 && (
                      <p style={{ fontSize: 9, color: cfg.color, opacity: 0.8, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cfg.label}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [weekIdx,      setWeekIdx]      = useState(0)
  const [selectedAppt, setSelectedAppt] = useState(null)

  const week = WEEK_DATA[weekIdx]
  const totalAppts = week.days.reduce((s, d) => s + d.appts.length, 0)

  return (
    <div className="spyne-animate-fade-in">
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 44, zIndex: 20,
        background: 'var(--spyne-bg)',
        paddingTop: 20, paddingBottom: 12, marginTop: -20,
        borderBottom: '1px solid var(--spyne-border)',
        marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h1 className="spyne-title" style={{ color: 'var(--spyne-text-primary)' }}>Appointments</h1>
            <p className="spyne-body-sm" style={{ color: 'var(--spyne-text-muted)', marginTop: 2 }}>
              {week.weekLabel} · {totalAppts} appointment{totalAppts !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
              {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: cfg.color, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: 'var(--spyne-text-muted)', fontWeight: 500 }}>{cfg.label}</span>
                </div>
              ))}
            </div>

            {/* Week navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setWeekIdx((i) => Math.max(0, i - 1))}
                disabled={weekIdx === 0}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: 'var(--spyne-radius-md)',
                  border: '1px solid var(--spyne-border)', background: 'var(--spyne-surface)',
                  cursor: weekIdx === 0 ? 'not-allowed' : 'pointer',
                  opacity: weekIdx === 0 ? 0.4 : 1,
                  color: 'var(--spyne-text-secondary)',
                }}
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => setWeekIdx(0)}
                style={{
                  padding: '0 12px', height: 32, fontSize: 12, fontWeight: 600,
                  border: '1px solid var(--spyne-border)',
                  background: weekIdx === 0 ? 'var(--spyne-brand-subtle)' : 'var(--spyne-surface)',
                  color: weekIdx === 0 ? 'var(--spyne-brand)' : 'var(--spyne-text-secondary)',
                  borderRadius: 'var(--spyne-radius-md)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                This Week
              </button>

              <button
                onClick={() => setWeekIdx((i) => Math.min(WEEK_DATA.length - 1, i + 1))}
                disabled={weekIdx === WEEK_DATA.length - 1}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: 'var(--spyne-radius-md)',
                  border: '1px solid var(--spyne-border)', background: 'var(--spyne-surface)',
                  cursor: weekIdx === WEEK_DATA.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: weekIdx === WEEK_DATA.length - 1 ? 0.4 : 1,
                  color: 'var(--spyne-text-secondary)',
                }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Week grid card */}
      <div className="spyne-card mt-4" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 720 }}>
          <WeekGrid days={week.days} onSelectAppt={setSelectedAppt} />
        </div>
      </div>

      {selectedAppt && (
        <AppointmentDetailPanel appt={selectedAppt} onClose={() => setSelectedAppt(null)} />
      )}
    </div>
  )
}
