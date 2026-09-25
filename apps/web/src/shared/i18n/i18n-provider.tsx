'use client'

import { createContext, use, type ReactNode } from 'react'

import type { AppLocale } from '@iva360/shared/i18n'

import type { Dictionary } from './dictionaries/ru'
import { getDictionary } from './get-dictionary'

type I18nContextValue = {
  locale: AppLocale
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ locale, children }: { locale: AppLocale; children: ReactNode }) {
  return <I18nContext value={{ locale, t: getDictionary(locale) }}>{children}</I18nContext>
}

export function useI18n(): I18nContextValue {
  const context = use(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within <I18nProvider>')
  }

  return context
}
