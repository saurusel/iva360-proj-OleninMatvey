import { useEffect, type RefObject } from 'react'

import type { CarouselApi } from '@/shared/ui/carousel'

export function useActiveSlideHeight(
  viewportRef: RefObject<HTMLElement | null>,
  api: CarouselApi,
  activeIndex: number,
) {
  useEffect(() => {
    const viewport = viewportRef.current
    const slide = api?.slideNodes()[activeIndex]

    if (!viewport || !slide) {
      return
    }

    const syncHeight = () => {
      viewport.style.height = `${slide.offsetHeight}px`
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(slide)

    return () => observer.disconnect()
  }, [viewportRef, api, activeIndex])
}
