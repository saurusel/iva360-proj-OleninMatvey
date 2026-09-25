'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useI18n } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'
import { cn } from '@/shared/lib/utils'

import BlogIcon from '../../../../public/icons/mobile-tab-bar/blog.svg'
import EventsIcon from '../../../../public/icons/mobile-tab-bar/events.svg'
import IndustriesIcon from '../../../../public/icons/mobile-tab-bar/industries.svg'
import SubscriptionsIcon from '../../../../public/icons/mobile-tab-bar/subscriptions.svg'

import { getMenuItemKey, hasSubmenu, isMenuItemActive, type MenuItem } from '../lib/menu'
import { useSubmenu } from '../model/use-submenu'
import { SubmenuDrawer } from './submenu-drawer'

const ITEM_CLASS =
  'flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium transition-colors hover:text-primary'

const MOBILE_ICONS = {
  subscriptions: SubscriptionsIcon,
  industries: IndustriesIcon,
  blog: BlogIcon,
  events: EventsIcon,
} as const

export function MobileNav({ menu }: { menu: MenuItem[] }) {
  const { locale } = useI18n()
  const pathname = usePathname()
  const submenu = useSubmenu()

  if (!menu.length) {
    return null
  }

  const activeItem = menu.find((item, index) => getMenuItemKey(item, index) === submenu.activeKey)

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] lg:hidden">
        <ul className="flex h-16">
          {menu.map((item, index) => {
            const key = getMenuItemKey(item, index)
            const href = resolveHref(item.href, locale)
            const isActive = isMenuItemActive(item, pathname, locale)
            const itemClass = cn(
              ITEM_CLASS,
              isActive || submenu.isExpanded(key) ? 'text-primary' : 'text-muted-foreground',
            )
            const MobileIcon = MOBILE_ICONS[item.mobileIcon ?? 'subscriptions']
            const content = (
              <>
                <MobileIcon className="size-5 shrink-0 transition-colors [&_path]:stroke-current" />
                <span className="max-w-full truncate">{item.label}</span>
              </>
            )

            return (
              <li key={key} className="min-w-0 flex-1">
                {hasSubmenu(item) ? (
                  <button type="button" className={itemClass} onClick={() => submenu.toggle(key)}>
                    {content}
                  </button>
                ) : href ? (
                  <Link href={href} className={itemClass}>
                    {content}
                  </Link>
                ) : (
                  <span className={itemClass}>{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <SubmenuDrawer item={activeItem} open={submenu.isOpen} onClose={submenu.close} />
    </>
  )
}
