/**
 * Preview / QA controls for Max 2 Studio (modal shortcuts, variant toggles).
 *
 * - Local dev: always on.
 * - Production / staging: set `NEXT_PUBLIC_MAX2_PREVIEW_TOOLS=true` in the deployment env.
 *
 * Holding cost also respects legacy `NEXT_PUBLIC_SHOW_HOLDING_COST_DEV_BUTTON` (same effect for that button only).
 */
export function isMax2PreviewToolsEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true
  return process.env.NEXT_PUBLIC_MAX2_PREVIEW_TOOLS === "true"
}

export function isMax2HoldingCostPreviewButtonEnabled(): boolean {
  return (
    isMax2PreviewToolsEnabled() ||
    process.env.NEXT_PUBLIC_SHOW_HOLDING_COST_DEV_BUTTON === "true"
  )
}
