import type { AppLocale } from '@iva360/shared/i18n'

import { en } from './dictionaries/en'
import { ru, type Dictionary } from './dictionaries/ru'

const dictionaries: Record<AppLocale, Dictionary> = { ru, en }

export function getDictionary(locale: AppLocale): Dictionary {
  return dictionaries[locale]
}
