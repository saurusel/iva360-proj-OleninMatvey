import Link from 'next/link'

import { isProductKey, ProductIllustration } from '@/entities/product'
import { useI18n } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer'

import type { MenuItem } from '../lib/menu'

type SubmenuDrawerProps = {
  item: MenuItem | undefined
  open: boolean
  onClose: () => void
}

export function SubmenuDrawer({ item, open, onClose }: SubmenuDrawerProps) {
  const { locale, t } = useI18n()

  return (
    <Drawer
      open={open && Boolean(item)}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
    >
      <DrawerContent className="border-t-0">
        <DrawerHeader className="border-b border-border/60">
          <DrawerTitle>{item?.label}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {item && t.header.submenuDescription(item.label)}
          </DrawerDescription>
        </DrawerHeader>

        <ul className="flex flex-col overflow-y-auto px-4 py-2">
          {item?.children?.map((child, index) => {
            const href = resolveHref(child.href, locale)

            if (!href) {
              return null
            }

            return (
              <li key={child.id ?? index} className="border-b border-border/60 last:border-0">
                <Link
                  href={href}
                  className="flex items-center gap-3 px-1 py-3 transition-colors hover:text-primary"
                >
                  {isProductKey(child.icon) && (
                    <ProductIllustration
                      product={child.icon}
                      size={24}
                      format="png"
                      className="size-6"
                    />
                  )}
                  <span className="text-base font-medium text-foreground">{child.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}
