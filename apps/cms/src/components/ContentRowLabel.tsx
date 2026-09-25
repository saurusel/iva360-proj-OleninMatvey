'use client'

import { useRowLabel } from '@payloadcms/ui'

type RowData = Record<string, unknown>

const asLabel = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined

export function ContentRowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>()
  const label =
    asLabel(data?.label) ??
    asLabel(data?.title) ??
    asLabel(data?.name) ??
    asLabel(data?.text) ??
    asLabel(data?.key) ??
    asLabel(data?.duration) ??
    (typeof data?.months === 'number' ? `${data.months} мес.` : undefined)

  return <span>{label ?? `Строка ${(rowNumber ?? 0) + 1}`}</span>
}
