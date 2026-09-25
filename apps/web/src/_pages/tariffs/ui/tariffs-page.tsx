import { resolveLocale } from '@/shared/i18n'
import { TariffsCatalog } from '@/widgets/tariffs-catalog'
import { TariffsConsultation } from '@/widgets/tariffs-consultation'

export async function TariffsPage({ params, searchParams }: PageProps<'/[locale]/tariffs'>) {
  const locale = await resolveLocale(params)

  return (
    <main className="pb-16 md:pb-24 lg:pb-32">
      <TariffsCatalog locale={locale} searchParams={await searchParams} />
      <TariffsConsultation locale={locale} />
    </main>
  )
}
