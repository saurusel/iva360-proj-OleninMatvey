import { useState } from 'react'

import type { Plan } from '@iva360/shared/payload-types'

import { getDefaultQuantity } from '../lib/pricing'
import { syncSearchParams } from '../lib/search-params'
import type { TariffLineKey } from './types'

type TariffsSelectionOptions = {
  plans: Plan[]
  initialLineKey: TariffLineKey
  initialMonths: number
}

export function useTariffsSelection({
  plans,
  initialLineKey,
  initialMonths,
}: TariffsSelectionOptions) {
  const [lineKey, setLineKey] = useState(initialLineKey)
  const [months, setMonths] = useState(initialMonths)
  const [tierIdByLine, setTierIdByLine] = useState<Partial<Record<TariffLineKey, string>>>({})
  const [quantityByPlan, setQuantityByPlan] = useState<Record<string, number>>({})

  const linePlans = plans.filter((plan) => plan.line === lineKey)
  const tiers = linePlans.filter((plan) => !plan.isTrial && !plan.priceOnRequest)
  const selectedTier = tiers.find((plan) => plan.id === tierIdByLine[lineKey]) ?? tiers[0]

  const cards = [
    linePlans.find((plan) => plan.isTrial),
    selectedTier,
    linePlans.find((plan) => plan.priceOnRequest),
  ].filter((plan) => plan !== undefined)

  return {
    lineKey,
    months,
    tiers,
    cards,
    selectedCardIndex: selectedTier ? cards.indexOf(selectedTier) : 0,
    getQuantity: (plan: Plan) => quantityByPlan[plan.id] ?? getDefaultQuantity(plan),
    selectLine: (nextLineKey: TariffLineKey) => {
      setLineKey(nextLineKey)
      syncSearchParams(nextLineKey, months)
    },
    selectPeriod: (nextMonths: number) => {
      setMonths(nextMonths)
      syncSearchParams(lineKey, nextMonths)
    },
    selectTier: (planId: string) =>
      setTierIdByLine((current) => ({ ...current, [lineKey]: planId })),
    setQuantity: (planId: string, value: number) =>
      setQuantityByPlan((current) => ({ ...current, [planId]: value })),
  }
}
