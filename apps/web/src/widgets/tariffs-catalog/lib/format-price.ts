import type { AppLocale } from '@iva360/shared/i18n'

export function formatPrice(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value)
}
