import { getImageProps } from 'next/image'

import type { Home } from '@iva360/shared/payload-types'

import { resolveMediaImage } from '@/entities/cms-media'

type Documents = NonNullable<Home['hero']>['badgeStrip']

const BREAKPOINTS = [
  { key: 'desktop', media: '(min-width: 1024px)' },
  { key: 'tablet', media: '(min-width: 768px)' },
  { key: 'mobile', media: undefined },
] as const

export function HeroDocuments({ documents }: { documents: Documents }) {
  const images = BREAKPOINTS.flatMap(({ key, media }) => {
    const image = resolveMediaImage(documents?.[key])

    return image
      ? [{ media, props: getImageProps({ ...image, alt: '', sizes: '100vw' }).props }]
      : []
  })

  if (!images.length) {
    return null
  }

  const sources = images.slice(0, -1)
  const fallback = images[images.length - 1]

  return (
    <picture className="mt-11 block md:mt-15 lg:mt-20">
      {sources.map(({ media, props: { srcSet, width, height } }) => (
        <source key={media} media={media} srcSet={srcSet} width={width} height={height} />
      ))}
      <img {...fallback.props} alt="" className="h-auto w-full" />
    </picture>
  )
}
