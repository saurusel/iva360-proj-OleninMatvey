import type { Plan, TariffsPage } from '@iva360/shared/payload-types'

export type TariffLine = NonNullable<TariffsPage['lines']>[number]
export type TariffLineKey = TariffLine['key']
export type BillingPeriod = NonNullable<TariffsPage['durations']>[number]
export type PlanQuantity = NonNullable<Plan['unit']>
