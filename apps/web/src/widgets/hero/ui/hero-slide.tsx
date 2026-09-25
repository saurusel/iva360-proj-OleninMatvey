import Link from 'next/link'

import type { AppLocale } from '@iva360/shared/i18n'
import type { Home } from '@iva360/shared/payload-types'

import { CmsImage } from '@/entities/cms-media'
import { resolveHref } from '@/shared/lib/href'
import { Button } from '@/shared/ui/button'

import { HeroChips } from './hero-chips'
import styles from './hero.module.css'

export type HeroSlideData = NonNullable<NonNullable<Home['hero']>['slides']>[number]

const CTA_CLASS = 'h-14 w-full px-6 text-lg sm:w-auto'

type HeroSlideProps = {
  slide: HeroSlideData
  locale: AppLocale
  isFirst: boolean
}

export function HeroSlide({ slide, locale, isFirst }: HeroSlideProps) {
  const Title = isFirst ? 'h1' : 'h2'
  const ctaHref = resolveHref(slide.cta?.href, locale)
  const secondaryCtaHref = resolveHref(slide.ctaSecondary?.href, locale)

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="@container order-2 flex flex-col items-start lg:order-1">
        <div className="flex w-full flex-col gap-2 sm:gap-3">
          <Title className={`${styles.title} font-bold whitespace-pre-line`}>{slide.title}</Title>
          {slide.description && (
            <p
              className={`${styles.description} leading-relaxed whitespace-pre-line text-muted-foreground`}
            >
              {slide.description}
            </p>
          )}
        </div>

        {slide.chips && slide.chips.length > 0 && <HeroChips chips={slide.chips} locale={locale} />}

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          {slide.cta?.label && ctaHref && (
            <Button className={CTA_CLASS} render={<Link href={ctaHref} />}>
              {slide.cta.label}
            </Button>
          )}
          {slide.ctaSecondary?.label && secondaryCtaHref && (
            <Button variant="green" className={CTA_CLASS} render={<Link href={secondaryCtaHref} />}>
              {slide.ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <CmsImage
          media={slide.image}
          alt={slide.title}
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading={isFirst ? 'eager' : 'lazy'}
          fetchPriority={isFirst ? 'high' : 'auto'}
          draggable={false}
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
