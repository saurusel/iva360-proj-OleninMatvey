import type { Plan } from '@iva360/shared/payload-types'

import { plural, useI18n } from '@/shared/i18n'

import { formatPrice } from '../lib/format-price'

const PRICE_CLASS = 'text-2xl font-semibold md:text-3xl'

type PlanPriceProps = {
  plan: Plan
  price: number | null
  months: number
}

export function PlanPrice({ plan, price, months }: PlanPriceProps) {
  const { locale, t } = useI18n()

  if (plan.isTrial || plan.priceOnRequest) {
    return <p className={PRICE_CLASS}>{plan.isTrial ? t.tariffs.free : t.tariffs.onRequest}</p>
  }

  if (price === null) {
    return null
  }

  return (
    <div>
      <p className={PRICE_CLASS}>{formatPrice(price, locale)}</p>
      <p className="text-sm text-secondary">
        {t.tariffs.billedFor(months, plural(locale, months, t.tariffs.months))}
      </p>
    </div>
  )
}
