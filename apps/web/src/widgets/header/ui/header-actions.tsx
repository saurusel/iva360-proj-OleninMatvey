import { Search01Icon, ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import type { AppLocale } from '@iva360/shared/i18n'
import type { Header } from '@iva360/shared/payload-types'

import { getDictionary } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { ContactsDrawer } from './contacts-drawer'

const AUTH_BUTTON_CLASS = 'h-9 px-3 text-sm xl:h-10 xl:px-4 xl:text-base'

type HeaderActionsProps = {
  actions: Header['actions']
  topbar: Header['topbar']
  locale: AppLocale
}

export function HeaderActions({ actions, topbar, locale }: HeaderActionsProps) {
  const t = getDictionary(locale).header
  const cartHref = resolveHref(actions?.cart?.href, locale)
  const cartLabel = actions?.cart?.label || t.cart
  const login = actions?.login
  const loginHref = resolveHref(login?.href, locale)
  const register = actions?.register
  const registerHref = resolveHref(register?.href, locale)

  return (
    <>
      <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">
        {cartHref && (
          <Button
            variant="white"
            className="h-9 px-2.5 xl:h-10 xl:px-4"
            title={cartLabel}
            render={<Link href={cartHref} />}
          >
            <HugeiconsIcon icon={ShoppingCart02Icon} size={20} className="size-5 xl:size-6" />
            <span className="hidden xl:inline">{cartLabel}</span>
          </Button>
        )}
        {login?.label && loginHref && (
          <Button className={AUTH_BUTTON_CLASS} render={<Link href={loginHref} />}>
            {login.label}
          </Button>
        )}
        {register?.label && registerHref && (
          <Button
            variant="green"
            className={AUTH_BUTTON_CLASS}
            render={<Link href={registerHref} />}
          >
            {register.label}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <Button variant="outline" size="icon" className="hover:text-primary">
          <HugeiconsIcon icon={Search01Icon} size={20} className="size-5" />
        </Button>
        {cartHref && (
          <Button variant="outline" size="icon" title={cartLabel} render={<Link href={cartHref} />}>
            <HugeiconsIcon icon={ShoppingCart02Icon} size={20} className="size-5" />
          </Button>
        )}
        <div className="flex items-center gap-1.5">
          {login?.label && loginHref && (
            <Button className={AUTH_BUTTON_CLASS} render={<Link href={loginHref} />}>
              {login.shortLabel || login.label}
            </Button>
          )}
          {register?.label && registerHref && (
            <Button
              variant="green"
              className={cn(AUTH_BUTTON_CLASS, 'hidden md:inline-flex')}
              render={<Link href={registerHref} />}
            >
              {register.label}
            </Button>
          )}
        </div>
        <ContactsDrawer topbar={topbar} actions={actions} />
      </div>
    </>
  )
}
