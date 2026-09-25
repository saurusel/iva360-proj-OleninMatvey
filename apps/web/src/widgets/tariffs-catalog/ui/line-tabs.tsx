import { ProductGlyph } from '@/entities/product'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { LINE_ICON_PRODUCT, LINE_THEME } from '../config/line-theme'
import type { TariffLine, TariffLineKey } from '../model/types'

type LineTabsProps = {
  lines: TariffLine[]
  activeKey: TariffLineKey
  onSelect: (key: TariffLineKey) => void
}

export function LineTabs({ lines, activeKey, onSelect }: LineTabsProps) {
  return (
    <div className="flex max-w-full [scrollbar-width:none] gap-3 overflow-x-auto px-4 pt-2 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-2 [&::-webkit-scrollbar]:hidden">
      {lines.map((line) => {
        const isActive = line.key === activeKey
        const theme = LINE_THEME[line.key]

        return (
          <div
            key={line.key}
            className={cn(
              'relative shrink-0 rounded-full p-0.5',
              line.disabled ? 'bg-white/60 opacity-70 saturate-75' : 'bg-white',
            )}
          >
            <Button
              variant="ghost"
              disabled={Boolean(line.disabled)}
              className={cn(
                'h-auto gap-2 rounded-full border-0 bg-white p-1 pr-4 text-base disabled:opacity-80',
                isActive ? theme.tabActive : theme.tabIdle,
              )}
              onClick={() => onSelect(line.key)}
            >
              <span
                className={cn('flex rounded-full p-1', line.disabled ? 'bg-muted/80' : 'bg-muted')}
              >
                <ProductGlyph
                  product={LINE_ICON_PRODUCT[line.icon ?? 'meet']}
                  className={cn('size-4.5', line.disabled && 'opacity-80')}
                />
              </span>
              {line.label}
            </Button>

            {line.withAi && !line.disabled && (
              <span className="pointer-events-none absolute -top-1.5 right-0.5 inline-flex items-center gap-0.5 rounded-full border bg-white px-1 py-0.5 text-[10px] leading-none font-semibold shadow-sm">
                <ProductGlyph product="ai-assistant" className="size-2.5" />
                AI
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
