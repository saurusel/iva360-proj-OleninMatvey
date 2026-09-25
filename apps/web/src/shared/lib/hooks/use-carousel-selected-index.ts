import { useSyncExternalStore } from 'react'

import type { CarouselApi } from '@/shared/ui/carousel'

export function useCarouselSelectedIndex(api: CarouselApi | undefined): number {
  return useSyncExternalStore(
    (onChange) => {
      api?.on('select', onChange).on('reInit', onChange)

      return () => {
        api?.off('select', onChange).off('reInit', onChange)
      }
    },
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  )
}
