import type { Payload, PayloadRequest, SanitizedCollectionConfig } from 'payload'

import { TARIFF_LINES } from '../../fields/tariff-lines'
import { PlansOrderBoard, type OrderItem } from './PlansOrderBoard'

type PlansOrderViewProps = {
  collectionConfig?: SanitizedCollectionConfig
  initPageResult?: {
    req?: PayloadRequest
  }
  payload: Payload
  searchParams?: Record<string, string | string[] | undefined>
}

type PlanLike = {
  id: number | string
  isTrial?: boolean | null
  name?: null | string
  priceOnRequest?: boolean | null
}

const titleOf = (doc: PlanLike) => (doc.name && doc.name.trim() ? doc.name : `Тариф ${doc.id}`)

export async function PlansOrderView({
  initPageResult,
  payload,
  searchParams,
}: PlansOrderViewProps) {
  const req = initPageResult?.req
  const requested = typeof searchParams?.line === 'string' ? searchParams.line : undefined
  const line = TARIFF_LINES.find((item) => item.value === requested)?.value ?? TARIFF_LINES[0].value

  const { docs } = await payload.find({
    collection: 'plans',
    depth: 0,
    limit: 0,
    overrideAccess: false,
    pagination: false,
    req,
    sort: 'order',
    where: { line: { equals: line } },
  })

  const toItem = (doc: PlanLike): OrderItem => ({ id: String(doc.id), name: titleOf(doc) })

  return (
    <PlansOrderBoard
      corporate={docs.filter((doc) => !doc.isTrial && doc.priceOnRequest).map(toItem)}
      key={line}
      line={line}
      lines={TARIFF_LINES.map((item) => ({ label: item.label, value: item.value }))}
      ordinary={docs.filter((doc) => !doc.isTrial && !doc.priceOnRequest).map(toItem)}
      trial={docs.filter((doc) => doc.isTrial).map(toItem)}
    />
  )
}
