import type { AppLocale } from '@iva360/shared/i18n'

import { getHome } from '@/shared/api'
import { CarouselItem } from '@/shared/ui/carousel'

import { HeroDocuments } from './hero-documents'
import { HeroSlide } from './hero-slide'
import { HeroSlider } from './hero-slider'

export async function Hero({ locale }: { locale: AppLocale }) {
  const home = await getHome(locale)
  const slides = home?.hero?.slides ?? []

  if (!slides.length) {
    return null
  }

  return (
    <section className="pt-8 pb-10 md:pt-12 lg:pt-14">
      <div className="container">
        <HeroSlider slideCount={slides.length}>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id ?? index} className="pl-0 lg:pl-6">
              <HeroSlide slide={slide} locale={locale} isFirst={index === 0} />
            </CarouselItem>
          ))}
        </HeroSlider>
        <HeroDocuments documents={home?.hero?.badgeStrip} />
      </div>
    </section>
  )
}
