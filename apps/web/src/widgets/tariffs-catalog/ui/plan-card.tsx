import Link from 'next/link'
import type { ReactNode } from 'react'

import type { AppLocale } from '@iva360/shared/i18n'
import type { Plan } from '@iva360/shared/payload-types'

import { useI18n } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { LINE_THEME } from '../config/line-theme'
import { getPlanPrice, hasQuantityField } from '../lib/pricing'
import { PlanFeatures } from './plan-features'
import { PlanPrice } from './plan-price'
import { PlanProducts } from './plan-products'
import { QuantityField } from './quantity-field'

type PlanCardProps = {
  plan: Plan
  months: number
  quantity: number
  onQuantityChange: (value: number) => void

  title?: string
  tierSelect?: ReactNode
}

function toAction(link: Plan['cta'], locale: AppLocale) {
  const href = resolveHref(link?.href, locale)

  return link?.label && href ? { label: link.label, href } : null
}

export function PlanCard({
  plan,
  months,
  quantity,
  onQuantityChange,
  title,
  tierSelect,
}: PlanCardProps) {
  const { locale } = useI18n()
  const theme = LINE_THEME[plan.line]
  const action = toAction(plan.cta, locale)

  const secondaryAction = plan.isTrial ? null : toAction(plan.ctaSecondary, locale)

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-4 rounded-2xl border bg-white p-4 shadow-[0px_4px_24px_0px_rgba(105,116,135,0.12)] md:p-6',
        plan.highlighted ? theme.highlight : 'border-transparent',
      )}
    >
      <h3 className="text-xl font-semibold md:text-2xl">{title ?? plan.name}</h3>

      <div className="flex flex-col gap-6">
        {plan.unit && hasQuantityField(plan) && (
          <QuantityField quantity={plan.unit} value={quantity} onChange={onQuantityChange} />
        )}

        {tierSelect}

        <PlanPrice plan={plan} price={getPlanPrice(plan, months, quantity)} months={months} />

        {(action || secondaryAction) && (
          <div className="flex flex-col gap-3">
            {action && (
              <Button
                variant={theme.button}
                size="lg"
                className="w-full"
                render={<Link href={action.href} />}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                size="lg"
                className={cn('w-full', theme.outline)}
                render={<Link href={secondaryAction.href} />}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {plan.isTrial && <PlanProducts products={plan.products} />}
          <PlanFeatures features={plan.features} />
        </div>
      </div>
    </div>
  )
}
