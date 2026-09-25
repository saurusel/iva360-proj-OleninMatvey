import type { Plan } from '@iva360/shared/payload-types'

import { isProductKey, ProductGlyph } from '@/entities/product'
import { useI18n } from '@/shared/i18n'

export function PlanProducts({ products }: { products: Plan['products'] }) {
  const { t } = useI18n()
  const productKeys = products?.map((product) => product.icon).filter(isProductKey) ?? []

  if (!productKeys.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-3">
      <p className="text-sm font-semibold">{t.tariffs.includedProducts}</p>
      <div className="grid grid-cols-10 gap-2">
        {productKeys.map((product, index) => (
          <ProductGlyph key={index} product={product} className="size-5" />
        ))}
      </div>
    </div>
  )
}
