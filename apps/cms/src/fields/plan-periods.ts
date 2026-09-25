export const PLAN_PERIODS = [3, 6, 12] as const

export const PLAN_PERIOD_OPTIONS = PLAN_PERIODS.map((months) => ({
  label: `${months} месяцев`,
  value: String(months),
}))
