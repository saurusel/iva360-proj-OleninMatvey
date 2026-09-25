'use client'

import { Pill } from '@payloadcms/ui'

type PlanRow = {
  isTrial?: boolean | null
  priceOnRequest?: boolean | null
}

export function PlanTypeCell({ rowData }: { rowData?: PlanRow }) {
  const isTrial = rowData?.isTrial === true
  const onRequest = rowData?.priceOnRequest === true

  if (isTrial && onRequest) {
    return (
      <Pill pillStyle="error" size="small">
        Конфликт: «Пробный» и «По запросу»
      </Pill>
    )
  }

  if (isTrial) {
    return (
      <Pill pillStyle="light" size="small">
        Пробный
      </Pill>
    )
  }

  if (onRequest) {
    return (
      <Pill pillStyle="warning" size="small">
        По запросу
      </Pill>
    )
  }

  return (
    <Pill pillStyle="light-gray" size="small">
      Обычный
    </Pill>
  )
}
