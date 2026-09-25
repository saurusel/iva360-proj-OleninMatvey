'use client'

import { Pill } from '@payloadcms/ui'

type PlanRow = {
  isTrial?: boolean | null
  priceOnRequest?: boolean | null
  unit?: null | {
    max?: null | number
    min?: null | number
  }
}

export function PriceModelCell({ rowData }: { rowData?: PlanRow }) {
  const isTrial = rowData?.isTrial === true
  const onRequest = rowData?.priceOnRequest === true

  if (isTrial || onRequest) {
    return <span>—</span>
  }

  const unit = rowData?.unit ?? null
  const isUnitPrice = (unit?.max ?? 0) > (unit?.min ?? 0)

  return (
    <Pill pillStyle={isUnitPrice ? 'light' : 'light-gray'} size="small">
      {isUnitPrice ? 'Цена зависит от количества' : 'Фиксированная цена'}
    </Pill>
  )
}
