import type { Media } from '@iva360/shared/payload-types'

export type CmsMedia = string | Media | null | undefined

export type CmsMediaImage = {
  src: string
  width?: number
  height?: number
}

const MEDIA_FILES_PATH = '/api/media/file/'

function toMediaSrc(url: string): string {
  const { pathname } = new URL(url, 'http://localhost')

  return pathname.startsWith(MEDIA_FILES_PATH) ? pathname : url
}

export function resolveMediaImage(media: CmsMedia): CmsMediaImage | null {
  if (!media || typeof media !== 'object' || !media.url) {
    return null
  }

  return {
    src: toMediaSrc(media.url),
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
