"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, BarChart3, Settings, Phone, Filter, FileText } from "lucide-react"
import { useFiltersStore, useGlobalSearch } from "@/lib/uiState"
import { MOCKS } from "@/lib/mocks"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const resetFilters = useFiltersStore((state) => state.resetFilters)
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data: searchResults } = useGlobalSearch(searchQuery)

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange],
  )

  React.useEffect(() => {
    if (!open) {
      setSearchQuery("")
    }
  }, [open])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." value={searchQuery} onValueChange={setSearchQuery} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/review"))}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Call Review Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>QA Status Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/enums"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Enum Catalog Manager</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => resetFilters())}>
            <Filter className="mr-2 h-4 w-4" />
            <span>Reset All Filters</span>
          </CommandItem>
        </CommandGroup>

        {searchQuery.trim() && searchResults && (
          <>
            {searchResults.calls.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Calls">
                  {searchResults.calls.slice(0, 5).map((call) => {
                    const agent = MOCKS.agents.find((a) => a.id === call.agentId)
                    const dealership = MOCKS.dealerships.find((d) => d.id === call.dealershipId)
                    return (
                      <CommandItem key={call.id} onSelect={() => runCommand(() => router.push(`/review/${call.id}`))}>
                        <Phone className="mr-2 h-4 w-4" />
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{call.id}</span>
                          <Badge variant="outline">{dealership?.name}</Badge>
                          <Badge variant={agent?.type === "AI" ? "default" : "secondary"}>{agent?.type}</Badge>
                        </div>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </>
            )}

            {searchResults.enums.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Enums">
                  {searchResults.enums.slice(0, 5).map((enum_) => (
                    <CommandItem key={enum_.id} onSelect={() => runCommand(() => router.push("/enums"))}>
                      <Settings className="mr-2 h-4 w-4" />
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{enum_.code}</span>
                        <span className="text-muted-foreground">- {enum_.title}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {searchResults.annotations.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Annotations">
                  {searchResults.annotations.slice(0, 3).map((annotation) => {
                    const review = MOCKS.reviews.find((r) => r.id === annotation.reviewId)
                    const call = review ? MOCKS.calls.find((c) => c.id === review.callId) : null
                    return (
                      <CommandItem
                        key={annotation.id}
                        onSelect={() => runCommand(() => call && router.push(`/review/${call.id}`))}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="truncate">{annotation.note}</span>
                          {call && <span className="text-xs text-muted-foreground">Call {call.id}</span>}
                        </div>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
