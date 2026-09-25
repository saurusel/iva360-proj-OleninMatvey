import { sanitizeHref } from '@iva360/shared'
import type { AppLocale } from '@iva360/shared/i18n'
import type { Header } from '@iva360/shared/payload-types'

export type MenuItem = NonNullable<Header['menu']>[number]
export type SubmenuItem = NonNullable<MenuItem['children']>[number]

export function getMenuItemKey(item: MenuItem, index: number): string {
  return item.id ?? String(index)
}

export function hasSubmenu(item: MenuItem): boolean {
  return Boolean(item.children?.length)
}

function toPagePath(href: string, locale: AppLocale): string {
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const prefix = `/${locale}`

  if (path === prefix) {
    return '/'
  }

  return path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path
}

export function isMenuItemActive(item: MenuItem, pathname: string, locale: AppLocale): boolean {
  const href = sanitizeHref(item.href)

  if (!href?.startsWith('/')) {
    return false
  }

  return toPagePath(href, locale) === toPagePath(pathname, locale)
}
