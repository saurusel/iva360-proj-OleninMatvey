import { useI18n } from '@/shared/i18n'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import type { BillingPeriod } from '../model/types'

type PeriodSwitcherProps = {
  periods: BillingPeriod[]
  activeMonths: number
  onSelect: (months: number) => void
}

export function PeriodSwitcher({ periods, activeMonths, onSelect }: PeriodSwitcherProps) {
  const { t } = useI18n()

  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-white p-1 shadow-sm">
      {periods.map(({ months, discount }, index) => {
        const isActive = months === activeMonths

        const discountPercent = index > 0 && discount ? Math.round(discount * 100) : 0

        return (
          <Button
            key={months}
            variant="ghost"
            size="sm"
            className={cn(
              'border-0',
              isActive ? 'bg-slate-800 text-white hover:bg-slate-800' : 'hover:bg-card',
            )}
            onClick={() => onSelect(months)}
          >
            {months} {t.tariffs.monthsShort}
            {discountPercent > 0 && (
              <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-xs leading-none font-semibold text-primary">
                −{discountPercent}%
              </span>
            )}
          </Button>
        )
      })}
    </div>
  )
}
