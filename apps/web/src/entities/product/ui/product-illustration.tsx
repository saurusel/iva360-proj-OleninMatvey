import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

import type { ProductKey } from '../model/product'
import { ProductGlyph } from './product-glyph'

const ILLUSTRATION_DIRS = {
  svg: '/icons/products',
  png: '/icons/products-png',
} as const

type ProductIllustrationProps = {
  product: ProductKey
  size: number
  format?: keyof typeof ILLUSTRATION_DIRS
  className?: string
}

export function ProductIllustration({
  product,
  size,
  format = 'svg',
  className,
}: ProductIllustrationProps) {
  if (format === 'svg') {
    return <ProductGlyph product={product} size={size} className={className} />
  }

  return (
    <Image
      src={`${ILLUSTRATION_DIRS.png}/${product}.png`}
      alt=""
      width={size}
      height={size}
      className={cn('shrink-0 object-contain', className)}
    />
  )
}
