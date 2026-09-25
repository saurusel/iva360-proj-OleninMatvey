'use client'

import { useI18n } from '@/shared/i18n'
import { Plus } from '@/shared/lib/icons'
import { cn } from '@/shared/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

import { SupportGlyph } from './support-glyph'

const MEET_ACTIONS = [
  {
    label: 'createMeeting',
    glyph: 'meet',
    tile: 'bg-primary/10 text-primary',
    hover: 'hover:bg-primary/10 hover:text-primary',
  },
  {
    label: 'joinMeeting',
    glyph: 'users',
    tile: 'bg-indigo-500/10 text-indigo-500',
    hover: 'hover:bg-indigo-500/10 hover:text-indigo-500',
  },
  {
    label: 'scheduleMeeting',
    glyph: 'calendar',
    tile: 'bg-blue-500/10 text-blue-500',
    hover: 'hover:bg-blue-500/10 hover:text-blue-500',
  },
] as const

export function MeetActions({ href }: { href: string }) {
  const { t } = useI18n()

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white transition-opacity hover:opacity-90 lg:size-14">
        <SupportGlyph name="meet" className="size-[22px] lg:size-8" />
        <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-md bg-white lg:size-6 lg:rounded-lg">
          <Plus strokeWidth={2.25} className="size-3.5 text-blue-500 lg:size-4" />
        </span>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="w-[216px] rounded-2xl border-border/60 bg-background py-2 pr-3 pl-2 shadow-none drop-shadow-[0_12px_40px_rgba(15,23,42,0.16)]"
      >
        {MEET_ACTIONS.map(({ label, glyph, tile, hover }) => (
          <a
            key={label}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg py-2 pr-4 pl-2 text-sm font-semibold transition-colors',
              hover,
            )}
          >
            <span
              className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', tile)}
            >
              <SupportGlyph name={glyph} className="size-6" />
            </span>
            <span className="min-w-0 flex-1 whitespace-nowrap">{t.support[label]}</span>
          </a>
        ))}
        <a
          href={href}
          className="mt-1.5 block text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
        >
          {t.support.allMeetActions}
        </a>
      </PopoverContent>
    </Popover>
  )
}
