import Link from 'next/link'

import { localizeAppHref } from '@iva360/shared'
import type { AppLocale } from '@iva360/shared/i18n'

import { CmsImage } from '@/entities/cms-media'
import { getHeader } from '@/shared/api'
import { resolveHref } from '@/shared/lib/href'

import { HeaderActions } from './header-actions'
import { HeaderBar } from './header-bar'
import { HeaderTopbar } from './header-topbar'
import { MobileNav } from './mobile-nav'

export async function SiteHeader({ locale }: { locale: AppLocale }) {
  const header = await getHeader(locale)

  if (!header) {
    return null
  }

  const menu = header.menu ?? []

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip bg-background shadow-lg shadow-secondary/10">
      <HeaderTopbar topbar={header.topbar} locale={locale} />
      <HeaderBar
        menu={menu}
        logo={
          <Link
            href={resolveHref(header.logoHref, locale) ?? localizeAppHref('/', locale)}
            className="inline-flex max-w-[min(100%,8.5rem)] items-center sm:max-w-none"
          >
            <CmsImage
              media={header.logo}
              alt={header.title}
              width={99}
              height={36}
              loading="eager"
              className="h-9 w-fit max-w-full"
            />
          </Link>
        }
        actions={<HeaderActions actions={header.actions} topbar={header.topbar} locale={locale} />}
      />
      <MobileNav menu={menu} />
    </header>
  )
}
