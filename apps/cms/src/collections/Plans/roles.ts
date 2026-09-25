export type PlanRoleData = {
  id?: number | string
  line?: null | string
  isTrial?: boolean | null
  priceOnRequest?: boolean | null
  unit?: {
    min?: null | number
    max?: null | number
  } | null
}

export const isTrial = (data?: PlanRoleData | null) => data?.isTrial === true

export const isPriceOnRequest = (data?: PlanRoleData | null) => data?.priceOnRequest === true

export const hasNoPrice = (data?: PlanRoleData | null) => isTrial(data) || isPriceOnRequest(data)

export const hasQuantityField = (data?: PlanRoleData | null) =>
  (data?.unit?.max ?? 0) > (data?.unit?.min ?? 0)

export const resolvePinnedRole = (plan: PlanRoleData) => {
  if (plan.isTrial && plan.priceOnRequest) return 'invalid' as const
  if (plan.isTrial) return 'isTrial' as const
  if (plan.priceOnRequest) return 'priceOnRequest' as const
  return null
}
