'use client'

import { BookOpen02Icon, Call02Icon, HelpCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { useI18n } from '@/shared/i18n'
import { Plus, X } from '@/shared/lib/icons'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

const ITEM_CLASS =
  'flex items-center gap-3 rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors hover:bg-muted/70'

type HelpMenuProps = {
  knowledgeBaseHref: string
  email: string | null | undefined
  phoneHref: string | null
}

export function HelpMenu({ knowledgeBaseHref, email, phoneHref }: HelpMenuProps) {
  const { t } = useI18n()

  return (
    <Popover>
      <PopoverTrigger className="group flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-primary px-3 text-primary-foreground transition-[padding] duration-300 ease-in-out hover:px-[18px] data-popup-open:opacity-0 lg:h-14 lg:min-w-14 lg:px-3.5">
        <HugeiconsIcon
          icon={HelpCircleIcon}
          strokeWidth={1.75}
          className="size-[22px] shrink-0 lg:size-[26px]"
        />
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-300 ease-in-out group-hover:ml-2.5 group-hover:max-w-24 group-hover:opacity-100">
          {t.support.help}
        </span>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={({ anchor }) => -anchor.height}
        className="w-[min(100vw-2rem,320px)] rounded-2xl border-border/60 bg-background p-0 shadow-none drop-shadow-[0_12px_40px_rgba(15,23,42,0.16)]"
      >
        <div className="flex justify-end p-3 pb-0">
          <PopoverClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
              />
            }
          >
            <X className="size-[18px]" />
          </PopoverClose>
        </div>

        <div className="flex flex-col gap-1 p-3">
          <a className={ITEM_CLASS} href={knowledgeBaseHref}>
            <HugeiconsIcon icon={BookOpen02Icon} size={20} className="shrink-0" />
            {t.support.knowledgeBase}
          </a>
          {email && (
            <a className={ITEM_CLASS} href={`mailto:${email}`}>
              <Plus strokeWidth={2.25} className="size-5 shrink-0" />
              {t.support.writeRequest}
            </a>
          )}
          {phoneHref && (
            <a className={ITEM_CLASS} href={phoneHref}>
              <HugeiconsIcon icon={Call02Icon} size={20} className="shrink-0" />
              {t.support.call}
            </a>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
