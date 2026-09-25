import Image, { type ImageProps } from 'next/image'

import { resolveMediaImage, type CmsMedia } from '../lib/media'

type CmsImageProps = Omit<ImageProps, 'src'> & {
  media: CmsMedia
}

export function CmsImage({ media, alt, width, height, ...props }: CmsImageProps) {
  const image = resolveMediaImage(media)

  if (!image) {
    return null
  }

  return (
    <Image
      src={image.src}
      alt={alt}
      width={width ?? image.width}
      height={height ?? image.height}
      {...props}
    />
  )
}
