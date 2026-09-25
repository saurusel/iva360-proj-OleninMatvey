import type { AppLocale } from '@iva360/shared/i18n'

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

export function plural(locale: AppLocale, count: number, forms: PluralForms): string {
  return forms[new Intl.PluralRules(locale).select(count)] ?? forms.other
}
