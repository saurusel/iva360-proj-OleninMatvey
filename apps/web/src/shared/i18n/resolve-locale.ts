import { notFound } from 'next/navigation'

import { isAppLocale, type AppLocale } from '@iva360/shared/i18n'

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<AppLocale> {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  return locale
}
