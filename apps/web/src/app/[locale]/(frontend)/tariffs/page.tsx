import type { Metadata } from 'next'

import { getDictionary, resolveLocale } from '@/shared/i18n'

export { TariffsPage as default } from '@/_pages/tariffs'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tariffs'>): Promise<Metadata> {
  const { tariffs } = getDictionary(await resolveLocale(params))

  return { title: tariffs.title, description: tariffs.description }
}
