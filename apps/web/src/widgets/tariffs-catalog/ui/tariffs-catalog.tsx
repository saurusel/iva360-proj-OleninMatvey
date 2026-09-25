import type { AppLocale } from '@iva360/shared/i18n'

import { getPlans, getTariffsPage } from '@/shared/api'

import { parseLineParam, parsePeriodParam } from '../lib/search-params'
import { TariffsCatalogClient } from './tariffs-catalog-client'

type TariffsCatalogProps = {
  locale: AppLocale
  searchParams: Record<string, string | string[] | undefined>
}

export async function TariffsCatalog({ locale, searchParams }: TariffsCatalogProps) {
  const [page, plans] = await Promise.all([getTariffsPage(locale), getPlans(locale)])
  const lines = page?.lines ?? []
  const periods = page?.durations ?? []
  const initialLineKey = parseLineParam(searchParams.line, lines)
  const initialMonths = parsePeriodParam(searchParams.period, periods)

  if (!page || !initialLineKey || !initialMonths) {
    return null
  }

  return (
    <section className="container py-10 max-sm:px-0">
      <TariffsCatalogClient
        title={page.title}
        lines={lines}
        periods={periods}
        plans={plans?.docs ?? []}
        initialLineKey={initialLineKey}
        initialMonths={initialMonths}
      />
    </section>
  )
}
