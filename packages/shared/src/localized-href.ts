import { defaultLocale, type AppLocale } from './i18n'

const EXTERNAL_HREF = /^(https?:|tel:|mailto:|#|\?)/

export function localizeAppHref(href: string, locale: AppLocale): string {
  const prefix = `/${locale}`

  if (
    locale === defaultLocale ||
    EXTERNAL_HREF.test(href) ||
    !href.startsWith('/') ||
    href === prefix ||
    href.startsWith(`${prefix}/`)
  ) {
    return href
  }

  return href === '/' ? prefix : `${prefix}${href}`
}
