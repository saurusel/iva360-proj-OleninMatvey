import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import type { AppLocale } from '@iva360/shared/i18n'
import type { Header } from '@iva360/shared/payload-types'

import { getPhoneHref, resolveHref } from '@/shared/lib/href'

import { TOPBAR_ICONS } from '../config/topbar-icons'

const LINK_CLASS = 'inline-flex items-center gap-1.5 transition-colors hover:text-primary'

export function HeaderTopbar({ topbar, locale }: { topbar: Header['topbar']; locale: AppLocale }) {
  if (!topbar) {
    return null
  }

  const phoneHref = getPhoneHref(topbar.phone)

  return (
    <div className="hidden border-b lg:block">
      <div className="container flex h-12 items-center justify-between text-sm leading-5">
        <div className="flex items-center gap-4 xl:gap-6">
          {phoneHref && (
            <a className={LINK_CLASS} href={phoneHref}>
              {topbar.phone}
            </a>
          )}
          {topbar.email && (
            <a className={LINK_CLASS} href={`mailto:${topbar.email}`}>
              {topbar.email}
            </a>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4 xl:gap-6">
          {topbar.links?.map((link) => {
            const href = resolveHref(link.href, locale)
            const icon = link.icon && TOPBAR_ICONS[link.icon]

            if (!href) {
              return null
            }

            return (
              <Link key={link.id ?? link.label} className={LINK_CLASS} href={href}>
                {icon && <HugeiconsIcon icon={icon} size={16} />}
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
