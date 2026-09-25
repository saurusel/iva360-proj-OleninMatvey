'use client'

import type { Plan } from '@iva360/shared/payload-types'

import { useTariffsSelection } from '../model/use-tariffs-selection'
import type { BillingPeriod, TariffLine, TariffLineKey } from '../model/types'
import { LineTabs } from './line-tabs'
import { PeriodSwitcher } from './period-switcher'
import { PlanCard } from './plan-card'
import { PlanCards } from './plan-cards'
import { TierSelect } from './tier-select'

type TariffsCatalogClientProps = {
  title: string
  lines: TariffLine[]
  periods: BillingPeriod[]
  plans: Plan[]
  initialLineKey: TariffLineKey
  initialMonths: number
}

export function TariffsCatalogClient({
  title,
  lines,
  periods,
  plans,
  initialLineKey,
  initialMonths,
}: TariffsCatalogClientProps) {
  const selection = useTariffsSelection({ plans, initialLineKey, initialMonths })
  const lineTitle = lines.find((line) => line.key === selection.lineKey)?.label

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 rounded-t-3xl bg-(image:--gradient-promo) sm:h-80" />

      <div className="relative flex flex-col items-center gap-7 pt-12 pb-8 sm:px-8">
        <h1 className="text-4xl font-medium text-white sm:text-5xl">{title}</h1>
        <div className="w-full pt-3 pb-1">
          <LineTabs lines={lines} activeKey={selection.lineKey} onSelect={selection.selectLine} />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-7 pb-2 sm:px-4">
        <PeriodSwitcher
          periods={periods}
          activeMonths={selection.months}
          onSelect={selection.selectPeriod}
        />

        <PlanCards
          plans={selection.cards}
          selectedIndex={selection.selectedCardIndex}
          renderCard={(plan) => (
            <PlanCard
              plan={plan}
              months={selection.months}
              title={plan.highlighted ? lineTitle : undefined}
              quantity={selection.getQuantity(plan)}
              onQuantityChange={(value) => selection.setQuantity(plan.id, value)}
              tierSelect={
                plan.highlighted &&
                selection.tiers.length > 1 && (
                  <TierSelect
                    tiers={selection.tiers}
                    value={plan.id}
                    onChange={selection.selectTier}
                  />
                )
              }
            />
          )}
        />
      </div>
    </div>
  )
}
