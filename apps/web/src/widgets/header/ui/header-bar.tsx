'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useI18n } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'

import { getMenuItemKey, isMenuItemActive, type MenuItem } from '../lib/menu'
import { useSubmenu } from '../model/use-submenu'
import { DesktopNavItem } from './desktop-nav-item'
import { MegaMenu } from './mega-menu'

type HeaderBarProps = {
  menu: MenuItem[]
  logo: ReactNode
  actions: ReactNode
}

export function HeaderBar({ menu, logo, actions }: HeaderBarProps) {
  const { locale } = useI18n()
  const pathname = usePathname()
  const submenu = useSubmenu()

  const submenuItems =
    menu.find((item, index) => getMenuItemKey(item, index) === submenu.activeKey)?.children ?? []
  const isSubmenuOpen = submenu.isOpen && submenuItems.length > 0

  return (
    <>
      <div
        className="relative z-50"
        onMouseLeave={submenu.close}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            submenu.close()
          }
        }}
      >
        <div className="container flex h-16 items-center gap-2 xl:gap-4">
          <div className="flex min-w-0 shrink items-center lg:shrink-0">{logo}</div>

          <nav className="hidden min-w-0 flex-1 overflow-hidden lg:flex">
            <ul className="mx-auto flex shrink-0 items-center gap-4 xl:gap-6 2xl:gap-8">
              {menu.map((item, index) => {
                const key = getMenuItemKey(item, index)

                return (
                  <DesktopNavItem
                    key={key}
                    item={item}
                    href={resolveHref(item.href, locale)}
                    isActive={isMenuItemActive(item, pathname, locale)}
                    isExpanded={submenu.isExpanded(key)}
                    onOpen={() => submenu.open(key)}
                    onToggle={() => submenu.toggle(key)}
                  />
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center">{actions}</div>
        </div>

        <MegaMenu open={isSubmenuOpen} items={submenuItems} />
      </div>

      {isSubmenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-40 bg-black/50" onClick={submenu.close} />,
          document.body,
        )}
    </>
  )
}
