import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { Plan } from '@iva360/shared/payload-types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

type TierSelectProps = {
  tiers: Plan[]
  value: string
  onChange: (planId: string) => void
}

export function TierSelect({ tiers, value, onChange }: TierSelectProps) {
  const current = tiers.find((tier) => tier.id === value) ?? tiers[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background pr-2.5 pl-3 text-base font-medium tabular-nums transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/40">
        <span className="min-w-0 truncate text-left leading-9">{current?.name}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          className="shrink-0 text-muted-foreground transition-transform group-data-popup-open:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-(--anchor-width)">
        <DropdownMenuRadioGroup value={value} onValueChange={(planId) => onChange(String(planId))}>
          {tiers.map((tier) => (
            <DropdownMenuRadioItem key={tier.id} value={tier.id} className="tabular-nums">
              {tier.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
