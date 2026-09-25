import type { Plan } from '@iva360/shared/payload-types'

export function hasQuantityField(plan: Plan): boolean {
  return (plan.unit?.max ?? 0) > (plan.unit?.min ?? 0)
}

export function getDefaultQuantity(plan: Plan): number {
  return plan.unit?.defaultCount ?? plan.unit?.min ?? 0
}

export function getPlanPrice(plan: Plan, months: number, quantity: number): number | null {
  const period = String(months)
  const rate = plan.unit?.unitRates?.find((item) => item.duration === period)

  if (rate) {
    return Math.round(rate.fixedPrice + rate.unitPrice * quantity)
  }

  return plan.prices?.find((item) => item.duration === period)?.price ?? null
}
