import Link from 'next/link'

import { isProductKey, ProductIllustration } from '@/entities/product'
import { useI18n } from '@/shared/i18n'
import { resolveHref } from '@/shared/lib/href'
import { cn } from '@/shared/lib/utils'

import type { SubmenuItem } from '../lib/menu'

export function MegaMenu({ open, items }: { open: boolean; items: SubmenuItem[] }) {
  const { locale } = useI18n()

  return (
    <div
      inert={!open}
      className={cn(
        'absolute inset-x-0 top-full z-50 hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:grid',
        open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0">
        <div className="border-t bg-background shadow-lg shadow-secondary/10">
          <ul className="container grid grid-cols-4 gap-x-8 gap-y-2 py-9">
            {items.map((item, index) => {
              const href = resolveHref(item.href, locale)

              if (!href) {
                return null
              }

              return (
                <li key={item.id ?? index}>
                  <Link
                    href={href}
                    className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-muted"
                  >
                    {isProductKey(item.icon) && (
                      <ProductIllustration
                        product={item.icon}
                        size={40}
                        format="png"
                        className="size-10"
                      />
                    )}
                    <span className="space-y-1">
                      <span className="block text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="block text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
