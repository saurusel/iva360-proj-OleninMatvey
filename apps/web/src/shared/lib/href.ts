import { localizeAppHref, sanitizeHref } from '@iva360/shared'
import type { AppLocale } from '@iva360/shared/i18n'

export function resolveHref(raw: string | null | undefined, locale: AppLocale): string | null {
  const href = sanitizeHref(raw)

  return href && localizeAppHref(href, locale)
}

export function getPhoneHref(phone: string | null | undefined): string | null {
  const digits = phone?.replace(/[^+\d]/g, '')

  return digits ? `tel:${digits}` : null
}
