import type { ReactNode } from "react"
import StudioSecondaryNav from "@/components/max-2/studio/console-v2/components/StudioSecondaryNav"
import { max2Classes } from "@/lib/design-system/max-2"
import { cn } from "@/lib/utils"

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0">
      <StudioSecondaryNav />
      <div className={cn("min-w-0", max2Classes.moduleSecondaryNavPageBodyStudio)}>{children}</div>
    </div>
  )
}
