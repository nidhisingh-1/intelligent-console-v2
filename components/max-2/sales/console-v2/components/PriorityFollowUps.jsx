"use client"

import { useState } from 'react'
import { SpyneLineTab, SpyneLineTabBadge, SpyneLineTabStrip } from '@/components/max-2/spyne-line-tabs'
import { spyneComponentClasses } from '@/lib/design-system/max-2'
import InfoTooltip from './InfoTooltip'

const TABS = [
  { id: 'todaysCallbacks', label: "Today's Callbacks" },
  { id: 'hot',             label: 'Hot'              },
  { id: 'warm',            label: 'Warm'             },
]

// Map tag names to .spyne-badge variant
const TAG_VARIANTS = {
  'Callback Requested':  'spyne-badge-info',
  'Needs human attention': 'spyne-badge-danger',
  'Follow-up needed':    'spyne-badge-warning',
}

const SERVICE_PRIORITY_BADGE = {
  urgent: 'spyne-badge-danger',
  high: 'spyne-badge-warning',
}

export default function PriorityFollowUps({ followUps, variant = 'sales', items: serviceItems, urgentCount }) {
  const [activeTab, setActiveTab] = useState('todaysCallbacks')
  const isService = variant === 'service'
  const items = isService ? (serviceItems ?? []) : (followUps[activeTab] ?? [])

  const tabBadge = {
    todaysCallbacks: followUps?.todaysCallbacks?.length,
    hot: followUps?.hot?.length,
    warm: followUps?.warm?.length,
  }

  return (
    <div className="spyne-card spyne-animate-fade-in p-4 flex flex-col gap-4" style={{ animationDelay: '100ms' }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={spyneComponentClasses.cardTitle}>Priority Follow-ups</span>
          <InfoTooltip
            text={
              isService
                ? "Customers who need advisor action after Mark flagged no-shows, pending RO approval, or overdue service with no response."
                : "High-priority leads flagged by Vini for human review. These are leads that showed strong intent signals (e.g. repeated visits, price requests, trade-in questions) but have not yet converted to an appointment."
            }
          />
        </div>
        {isService && urgentCount != null ? (
          <span className="spyne-caption shrink-0 tabular-nums text-spyne-text-secondary">{urgentCount} urgent</span>
        ) : null}
      </div>

      {/* Tabs */}
      {!isService ? (
        <SpyneLineTabStrip bleed compact tight>
          {TABS.map((tab) => {
            const count = tabBadge[tab.id]
            return (
              <SpyneLineTab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.label}
                {count ? <SpyneLineTabBadge>{count}</SpyneLineTabBadge> : null}
              </SpyneLineTab>
            )
          })}
        </SpyneLineTabStrip>
      ) : null}

      {/* Lead list */}
      <div className="space-y-3 flex-1 overflow-y-auto" style={{ maxHeight: 280 }}>
        {items.map((lead) => (
          <div key={lead.id} className="flex items-start gap-2.5">
            <div
              className={`${lead.color} flex h-7 w-7 shrink-0 items-center justify-center text-white`}
              style={{ borderRadius: '50%', fontSize: 11, fontWeight: 700 }}
            >
              {lead.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="spyne-label" style={{ color: 'var(--spyne-text-primary)', fontWeight: 700 }}>
                  {lead.name}
                </span>
                <span className="spyne-caption shrink-0" style={{ color: 'var(--spyne-text-muted)' }}>
                  {lead.timeAgo}
                </span>
              </div>
              <div
                className="spyne-caption mt-0.5 truncate"
                style={{ color: 'var(--spyne-text-secondary)', fontStyle: isService ? 'normal' : 'italic' }}
              >
                {lead.message}
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                {isService && lead.priority ? (
                  <span
                    className={`spyne-badge ${SERVICE_PRIORITY_BADGE[lead.priority] || 'spyne-badge-neutral'}`}
                  >
                    {lead.priority === 'urgent' ? 'Urgent' : 'High'}
                  </span>
                ) : (
                  <>
                    <span className={`spyne-badge ${TAG_VARIANTS[lead.tag] || 'spyne-badge-neutral'}`}>
                      {lead.tag}
                    </span>
                    {lead.scheduledTime && (
                      <span className="spyne-caption" style={{ color: 'var(--spyne-text-muted)' }}>
                        {lead.scheduledTime}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-6 text-center spyne-caption" style={{ color: 'var(--spyne-text-muted)' }}>
            {isService ? 'No priority follow-ups' : 'No leads in this category'}
          </div>
        )}
      </div>
    </div>
  )
}
