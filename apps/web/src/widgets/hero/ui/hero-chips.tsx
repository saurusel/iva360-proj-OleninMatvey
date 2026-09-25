import Link from 'next/link'

import type { AppLocale } from '@iva360/shared/i18n'

import { isProductKey, PRODUCT_APPEARANCE, ProductIllustration } from '@/entities/product'
import { resolveHref } from '@/shared/lib/href'
import { cn } from '@/shared/lib/utils'

import type { HeroSlideData } from './hero-slide'

type HeroChip = NonNullable<HeroSlideData['chips']>[number]

export function HeroChips({ chips, locale }: { chips: HeroChip[]; locale: AppLocale }) {
  return (
    <div className="mt-6 flex w-full flex-wrap gap-2.5 sm:mt-8">
      {chips.map((chip) => {
        const href = resolveHref(chip.href, locale)
        const product = isProductKey(chip.icon) && chip.icon

        if (!href) {
          return null
        }

        return (
          <Link
            key={chip.id ?? chip.label}
            href={href}
            className={cn(
              'inline-flex h-9 items-center gap-2.5 rounded-full px-3 text-sm leading-none font-semibold transition-opacity hover:opacity-90',
              product ? PRODUCT_APPEARANCE[product].chipTone : 'bg-muted text-foreground',
            )}
          >
            {product && <ProductIllustration product={product} size={24} className="size-6" />}
            {chip.label}
          </Link>
        )
      })}
    </div>
  )
}
