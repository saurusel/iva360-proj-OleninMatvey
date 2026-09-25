import type { BillingPeriod, TariffLine, TariffLineKey } from '../model/types'

type SearchParamValue = string | string[] | undefined

const LINE_PARAMS: Record<TariffLineKey, string> = {
  meet: 'MEET',
  webinar: 'WEB',
  messenger: 'SAAS_MESSENGER_PLUS',
  mail: 'MAIL',
  drive: 'DRIVE',
  boards: 'BOARDS',
}

function firstValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export function parseLineParam(value: SearchParamValue, lines: TariffLine[]): TariffLineKey | null {
  const param = firstValue(value)?.toUpperCase()
  const available = lines.filter((line) => !line.disabled)
  const requested = available.find(
    (line) => line.key.toUpperCase() === param || LINE_PARAMS[line.key] === param,
  )

  return (requested ?? available[0])?.key ?? null
}

export function parsePeriodParam(value: SearchParamValue, periods: BillingPeriod[]): number | null {
  const param = firstValue(value)
  const requested = periods.find((period) => String(period.months) === param)

  return (requested ?? periods[0])?.months ?? null
}

export function syncSearchParams(lineKey: TariffLineKey, months: number) {
  const params = new URLSearchParams(window.location.search)
  params.set('line', LINE_PARAMS[lineKey])
  params.set('period', String(months))
  window.history.replaceState(null, '', `?${params}`)
}
