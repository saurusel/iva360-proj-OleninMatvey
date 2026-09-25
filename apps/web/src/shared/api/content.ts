import type { AppLocale } from '@iva360/shared/i18n'
import type { Header, Home, Plan, TariffsPage } from '@iva360/shared/payload-types'

import { getCollection, getGlobal } from './payload'

export const getHeader = (locale: AppLocale) => getGlobal<Header>('header', locale)

export const getHome = (locale: AppLocale) => getGlobal<Home>('home', locale)

export const getTariffsPage = (locale: AppLocale) => getGlobal<TariffsPage>('tariffs-page', locale)

export const getPlans = (locale: AppLocale) =>
  getCollection<Plan>('plans', locale, { limit: 200, sort: 'order' })
