import { BookOpen02Icon, Call02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

import type { Header } from '@iva360/shared/payload-types'

type TopbarLink = NonNullable<NonNullable<Header['topbar']>['links']>[number]

export const TOPBAR_ICONS: Record<NonNullable<TopbarLink['icon']>, IconSvgElement | null> = {
  none: null,
  search: Search01Icon,
  phone: Call02Icon,
  book: BookOpen02Icon,
}
