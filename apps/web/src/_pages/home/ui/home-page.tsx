import { resolveLocale } from '@/shared/i18n'
import { Hero } from '@/widgets/hero'

export async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params)

  return (
    <main>
      <Hero locale={locale} />
    </main>
  )
}
