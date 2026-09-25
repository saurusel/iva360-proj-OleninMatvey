import type { ArrayFieldValidation, CheckboxField, NumberFieldValidation } from 'payload'

import { PLAN_PERIOD_OPTIONS } from '../../fields/plan-periods'
import { validateUniqueRowValue } from '../../fields/unique-row'
import type { PlanRoleData } from './roles'

const readNumber = (source: unknown, key: string): number | undefined => {
  const value =
    source && typeof source === 'object' ? (source as Record<string, unknown>)[key] : undefined

  return typeof value === 'number' ? value : undefined
}

export const validateQuantityMax: NumberFieldValidation = (value, { siblingData }) => {
  const min = readNumber(siblingData, 'min')

  if (typeof value !== 'number' || min === undefined) {
    return true
  }

  return (
    value > min ||
    'Максимум должен быть больше минимума — иначе счётчик «− / +» не появится на сайте.'
  )
}

export const validateDefaultQuantity: NumberFieldValidation = (value, { siblingData }) => {
  const min = readNumber(siblingData, 'min')
  const max = readNumber(siblingData, 'max')

  if (typeof value !== 'number' || min === undefined || max === undefined || max <= min) {
    return true
  }

  return (
    (value >= min && value <= max) || 'Значение по умолчанию должно быть от минимума до максимума.'
  )
}

export const validateTrialRole: NonNullable<CheckboxField['validate']> = (value, { data }) =>
  !(value === true && (data as PlanRoleData | undefined)?.priceOnRequest === true) ||
  'Тариф не может быть одновременно «Пробным периодом» и «Ценой по запросу».'

const requiredPeriods = PLAN_PERIOD_OPTIONS.map((option) => option.value)

export const missingPlanPeriods = (value: unknown) => {
  const rows = Array.isArray(value) ? value : []
  const present = new Set(
    rows.flatMap((row) =>
      row && typeof row === 'object' && 'duration' in row
        ? [String((row as { duration?: unknown }).duration)]
        : [],
    ),
  )

  return requiredPeriods.filter((period) => !present.has(period))
}

export const validatePeriodRows =
  (
    duplicateMessage: string,
    isRequired: (data?: PlanRoleData | null) => boolean,
  ): ArrayFieldValidation =>
  (value, { data }) => {
    const uniqueResult = validateUniqueRowValue(value, 'duration', duplicateMessage)

    if (uniqueResult !== true || !isRequired(data)) {
      return uniqueResult
    }

    const missing = missingPlanPeriods(value)

    return missing.length === 0 || `Добавьте цены для периодов: ${missing.join(', ')} мес.`
  }
