'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { useCarouselSelectedIndex } from '@/shared/lib/hooks/use-carousel-selected-index'
import { Carousel, CarouselContent, type CarouselApi } from '@/shared/ui/carousel'

import { useActiveSlideHeight } from '../lib/use-active-slide-height'
import { HeroControls } from './hero-controls'

const AUTOPLAY_DELAY_MS = 10_000

type HeroSliderProps = {
  slideCount: number
  children: ReactNode
}

export function HeroSlider({ slideCount, children }: HeroSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [plugins] = useState(() => [
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,

      rootNode: (emblaRoot) =>
        emblaRoot.closest<HTMLElement>('[data-slot="carousel"]') ?? emblaRoot,
    }),
  ])
  const viewportRef = useRef<HTMLDivElement>(null)
  const selectedIndex = useCarouselSelectedIndex(api)

  useActiveSlideHeight(viewportRef, api, selectedIndex)

  useEffect(() => {
    if (!api) {
      return
    }

    const restartAutoplay = () => api.plugins().autoplay?.reset()
    api.on('select', restartAutoplay)

    return () => {
      api.off('select', restartAutoplay)
    }
  }, [api])

  return (
    <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} plugins={plugins}>
      <div ref={viewportRef} className="overflow-hidden transition-[height] duration-300 ease-out">
        <CarouselContent className="ml-0 items-start lg:-ml-6">{children}</CarouselContent>
      </div>

      {slideCount > 1 && <HeroControls slideCount={slideCount} selectedIndex={selectedIndex} />}
    </Carousel>
  )
}
