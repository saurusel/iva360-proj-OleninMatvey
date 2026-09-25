import type { Where } from 'payload'

import { TARIFF_LINES } from '../../fields/tariff-lines'

export const ALL_LINES = 'all'

export type PlanTypeFilter = 'all' | 'onRequest' | 'ordinary' | 'trial'
export type PriceModelFilter = 'all' | 'fixed' | 'unit'

export type QuickFilters = {
  line: string
  planType: PlanTypeFilter
  priceModel: PriceModelFilter
}

export const EMPTY_QUICK_FILTERS: QuickFilters = {
  line: ALL_LINES,
  planType: 'all',
  priceModel: 'all',
}

export const LINE_VALUES = TARIFF_LINES.map((line) => line.value)

export const LINE_OPTIONS = [
  { label: 'Все', value: ALL_LINES },
  ...TARIFF_LINES.map((line) => ({ label: line.label, value: line.value })),
]

export const PLAN_TYPE_OPTIONS = [
  { label: 'Все', value: 'all' },
  { label: 'Пробный', value: 'trial' },
  { label: 'Обычный', value: 'ordinary' },
  { label: 'По запросу', value: 'onRequest' },
]

export const PRICE_MODEL_OPTIONS = [
  { label: 'Все', value: 'all' },
  { label: 'Фиксированная цена', value: 'fixed' },
  { label: 'Цена зависит от количества', value: 'unit' },
]

export const lineCondition = (line: string): Where => ({ line: { equals: line } })

export const planTypeCondition = (type: Exclude<PlanTypeFilter, 'all'>): Where => {
  if (type === 'trial') {
    return { isTrial: { equals: true } }
  }

  if (type === 'onRequest') {
    return { priceOnRequest: { equals: true } }
  }

  return {
    and: [{ isTrial: { not_equals: true } }, { priceOnRequest: { not_equals: true } }],
  }
}

export const priceModelCondition = (model: Exclude<PriceModelFilter, 'all'>): Where =>
  model === 'unit' ? { 'unit.max': { exists: true } } : { 'unit.max': { exists: false } }

const QUICK_CONDITIONS: Where[] = [
  ...LINE_VALUES.map(lineCondition),
  planTypeCondition('trial'),
  planTypeCondition('onRequest'),
  planTypeCondition('ordinary'),
  priceModelCondition('unit'),
  priceModelCondition('fixed'),
]

const normalize = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(normalize)
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .map((key) => [key, normalize((value as Record<string, unknown>)[key])])
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value)
  }

  return value
}

const isSameCondition = (left: unknown, right: unknown): boolean =>
  JSON.stringify(normalize(left)) === JSON.stringify(normalize(right))

const isQuickCondition = (value: unknown): boolean =>
  QUICK_CONDITIONS.some((condition) => isSameCondition(value, condition))

const conditionNodes = (where?: null | Where): unknown[] => {
  const nodes: unknown[] = []

  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') {
      return
    }

    nodes.push(node)

    const and = (node as { and?: unknown }).and

    if (Array.isArray(and)) {
      and.forEach(visit)
    }
  }

  visit(where)

  return nodes
}

export const readQuickFilters = (where?: null | Where): QuickFilters => {
  const quick: QuickFilters = { ...EMPTY_QUICK_FILTERS }

  for (const node of conditionNodes(where)) {
    for (const line of LINE_VALUES) {
      if (isSameCondition(node, lineCondition(line))) {
        quick.line = line
      }
    }

    if (isSameCondition(node, planTypeCondition('trial'))) {
      quick.planType = 'trial'
    } else if (isSameCondition(node, planTypeCondition('onRequest'))) {
      quick.planType = 'onRequest'
    } else if (isSameCondition(node, planTypeCondition('ordinary'))) {
      quick.planType = 'ordinary'
    }

    if (isSameCondition(node, priceModelCondition('unit'))) {
      quick.priceModel = 'unit'
    } else if (isSameCondition(node, priceModelCondition('fixed'))) {
      quick.priceModel = 'fixed'
    }
  }

  return quick
}

export const stripQuickConditions = (where?: null | Where): undefined | Where => {
  if (!where || typeof where !== 'object') {
    return where ?? undefined
  }

  if (isQuickCondition(where)) {
    return undefined
  }

  const node = where as Record<string, unknown>

  if (Array.isArray(node.and)) {
    const rest = Object.fromEntries(Object.entries(node).filter(([key]) => key !== 'and'))
    const kept = node.and.map((child) => stripQuickConditions(child as Where)).filter(Boolean)

    if (!kept.length) {
      return Object.keys(rest).length ? (rest as Where) : undefined
    }

    return { ...rest, and: kept } as Where
  }

  return where
}

export const applyQuickFilters = (
  where: undefined | Where,
  quick: QuickFilters,
): undefined | Where => {
  const base = stripQuickConditions(where)
  const conditions: Where[] = []

  if (quick.line !== ALL_LINES) {
    conditions.push(lineCondition(quick.line))
  }

  if (quick.planType !== 'all') {
    conditions.push(planTypeCondition(quick.planType))
  }

  if (quick.priceModel !== 'all') {
    conditions.push(priceModelCondition(quick.priceModel))
  }

  if (!conditions.length) {
    return base
  }

  if (!base) {
    return conditions.length === 1 ? conditions[0] : { and: conditions }
  }

  return { and: [base, ...conditions] }
}
