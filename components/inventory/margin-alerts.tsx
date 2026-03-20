"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Bell, Mail, MessageSquare, Smartphone, ArrowRight, CheckCircle2, Shield } from "lucide-react"

interface MarginAlertsProps {
  onDismiss: () => void
}

export function MarginAlerts({ onDismiss }: MarginAlertsProps) {
  const [channels, setChannels] = React.useState({
    email: false,
    sms: false,
    push: false,
  })
  const [showAppModal, setShowAppModal] = React.useState(false)
  const anyEnabled = channels.email || channels.sms || channels.push

  const toggleChannel = (ch: keyof typeof channels) => {
    if (ch === "push" && !channels.push) {
      setShowAppModal(true)
    }
    setChannels((c) => ({ ...c, [ch]: !c[ch] }))
  }

  return (
    <>
      <Card className="border border-primary/20 bg-primary/[0.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Enable Margin Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get notified when vehicles hit Risk stage, margin depletes, or campaigns underperform.
          </p>

          <div className="space-y-2">
            <ChannelToggle
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              description="Daily digest + urgent alerts"
              enabled={channels.email}
              onToggle={() => toggleChannel("email")}
            />
            <ChannelToggle
              icon={<MessageSquare className="h-4 w-4" />}
              label="SMS"
              description="Critical alerts only"
              enabled={channels.sms}
              onToggle={() => toggleChannel("sms")}
            />
            <ChannelToggle
              icon={<Smartphone className="h-4 w-4" />}
              label="Mobile App Push"
              description="Real-time notifications"
              enabled={channels.push}
              onToggle={() => toggleChannel("push")}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            {anyEnabled && (
              <Button size="sm" className="flex-1 h-8 text-xs gap-1" onClick={onDismiss}>
                <CheckCircle2 className="h-3 w-3" />
                Save Preferences
              </Button>
            )}
            <Button size="sm" variant="ghost" className="text-xs h-8 text-muted-foreground" onClick={onDismiss}>
              Not now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Download Modal */}
      <Dialog open={showAppModal} onOpenChange={setShowAppModal}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl font-bold">Spyne Velocity Mobile</DialogTitle>
              <DialogDescription className="text-sm">
                Inventory doesn&apos;t wait. Neither should you.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 text-left">
              <Feature text="Real-time alerts when vehicles hit Risk stage" />
              <Feature text="Margin depletion notifications" />
              <Feature text="Campaign performance updates" />
              <Feature text="One-tap acceleration actions" />
            </div>

            <Button className="w-full h-11 gap-2">
              <Smartphone className="h-4 w-4" />
              Send Me the App
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ChannelToggle({
  icon,
  label,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode
  label: string
  description: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
        enabled
          ? "bg-primary/5 border-primary/20"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-md",
        enabled ? "bg-primary/10 text-primary" : "bg-gray-100 text-muted-foreground"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
      <div className={cn(
        "w-8 h-5 rounded-full transition-colors flex-shrink-0 p-0.5",
        enabled ? "bg-primary" : "bg-gray-200"
      )}>
        <div className={cn(
          "w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
          enabled ? "translate-x-3" : "translate-x-0"
        )} />
      </div>
    </button>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
      <span className="text-sm">{text}</span>
    </div>
  )
}
