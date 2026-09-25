import type { PayloadHandler } from 'payload'
import { commitTransaction, initTransaction, killTransaction } from 'payload'

import { TARIFF_LINES } from '../fields/tariff-lines'

const jsonError = (message: string, status = 400) => Response.json({ message }, { status })

export const plansReorder: PayloadHandler = async (req) => {
  const { payload, user } = req

  if (!user) {
    return jsonError('Требуется авторизация.', 401)
  }

  const body: unknown = await req.json?.()

  if (!body || typeof body !== 'object') {
    return jsonError('Некорректное тело запроса.')
  }

  const { line, orderedOrdinaryIds } = body as {
    line?: unknown
    orderedOrdinaryIds?: unknown
  }

  if (typeof line !== 'string' || !TARIFF_LINES.some((item) => item.value === line)) {
    return jsonError('Неизвестная продуктовая линия.')
  }

  if (
    !Array.isArray(orderedOrdinaryIds) ||
    !orderedOrdinaryIds.length ||
    !orderedOrdinaryIds.every((id) => typeof id === 'string' || typeof id === 'number')
  ) {
    return jsonError('Не передан порядок обычных тарифов линии.')
  }

  const orderedIds = orderedOrdinaryIds.map((id) => String(id))

  if (new Set(orderedIds).size !== orderedIds.length) {
    return jsonError('В присланном порядке есть повторяющиеся тарифы.')
  }

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

  const ordinary = docs.filter((doc) => !doc.isTrial && !doc.priceOnRequest)
  const pinnedTrial = docs.filter((doc) => doc.isTrial)
  const pinnedCorporate = docs.filter((doc) => doc.priceOnRequest && !doc.isTrial)

  const ordinaryIds = ordinary.map((doc) => String(doc.id))

  if (
    ordinaryIds.length !== orderedIds.length ||
    orderedIds.some((id) => !ordinaryIds.includes(id))
  ) {
    return jsonError('Состав тарифов линии изменился — обновите страницу и повторите.')
  }

  const ordered = [
    ...pinnedTrial,
    ...orderedIds.map((id) => ordinary[ordinaryIds.indexOf(id)]),
    ...pinnedCorporate,
  ]

  await initTransaction(req)

  try {
    for (const [index, doc] of ordered.entries()) {
      const nextOrder = index + 1

      if (doc.order === nextOrder) {
        continue
      }

      await payload.update({
        id: doc.id,
        collection: 'plans',
        data: { order: nextOrder },
        depth: 0,
        overrideAccess: false,
        req,
      })
    }

    await commitTransaction(req)
  } catch (error) {
    await killTransaction(req)
    payload.logger.error({ err: error, msg: 'plans reorder failed' })

    return jsonError('Не удалось сохранить порядок — изменения отменены.', 500)
  }

  return Response.json({
    line,
    success: true,
    order: ordered.map((doc, index) => ({ id: doc.id, order: index + 1 })),
  })
}
