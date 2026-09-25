'use client'

import { Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import type { Header } from '@iva360/shared/payload-types'

import { useI18n } from '@/shared/i18n'
import { getPhoneHref, resolveHref } from '@/shared/lib/href'
import { Button, buttonVariants } from '@/shared/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer'

import { TOPBAR_ICONS } from '../config/topbar-icons'

const LINK_CLASS =
  'flex items-center gap-2 py-3 text-sm leading-normal transition-colors hover:text-primary'

type ContactsDrawerProps = {
  topbar: Header['topbar']
  actions: Header['actions']
}

export function ContactsDrawer({ topbar, actions }: ContactsDrawerProps) {
  const { locale, t } = useI18n()
  const phoneHref = getPhoneHref(topbar?.phone)

  const links = topbar?.links?.filter((link) => link.icon !== 'search') ?? []
  const loginHref = resolveHref(actions?.login?.href, locale)
  const registerHref = resolveHref(actions?.register?.href, locale)

  return (
    <Drawer direction="top">
      <DrawerTrigger className={buttonVariants({ variant: 'outline', size: 'icon' })}>
        <HugeiconsIcon icon={Menu01Icon} size={20} className="size-5" />
      </DrawerTrigger>

      <DrawerContent
        className="border-b-0"
        overlayClassName="supports-backdrop-filter:backdrop-blur-none"
      >
        <DrawerHeader className="border-b pb-6">
          <DrawerTitle className="text-center text-sm leading-normal">
            {t.header.contactsTitle}
          </DrawerTitle>
          <DrawerDescription className="sr-only">{t.header.contactsDescription}</DrawerDescription>
        </DrawerHeader>

        {(phoneHref || topbar?.email) && (
          <div className="flex flex-col px-4">
            {phoneHref && (
              <a className={LINK_CLASS} href={phoneHref}>
                {topbar?.phone}
              </a>
            )}
            {topbar?.email && (
              <a className={LINK_CLASS} href={`mailto:${topbar.email}`}>
                {topbar.email}
              </a>
            )}
          </div>
        )}

        {links.length > 0 && (
          <div className="border-t px-4 pt-1">
            {links.map((link) => {
              const href = resolveHref(link.href, locale)
              const icon = link.icon && TOPBAR_ICONS[link.icon]

              if (!href) {
                return null
              }

              return (
                <Link key={link.id ?? link.label} className={LINK_CLASS} href={href}>
                  {icon && <HugeiconsIcon icon={icon} size={16} className="shrink-0" />}
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}

        {(loginHref || registerHref) && (
          <div className="flex flex-col gap-2 border-t px-4 pt-6 pb-4">
            {loginHref && (
              <Button size="lg" className="w-full text-sm" render={<Link href={loginHref} />}>
                {actions?.login?.label}
              </Button>
            )}
            {registerHref && (
              <Button
                variant="green"
                size="lg"
                className="w-full text-sm"
                render={<Link href={registerHref} />}
              >
                {actions?.register?.label}
              </Button>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
