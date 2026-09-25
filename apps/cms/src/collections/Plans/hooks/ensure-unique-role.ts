import { ValidationError, type CollectionBeforeChangeHook, type Where } from 'payload'

import { resolvePinnedRole, type PlanRoleData } from '../roles'

const DUPLICATE_ROLE_MESSAGES = {
  isTrial: 'В этой продуктовой линии уже есть пробный тариф.',
  priceOnRequest: 'В этой продуктовой линии уже есть тариф с ценой по запросу.',
}

export const ensureUniqueRole: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const plan: PlanRoleData = { ...originalDoc, ...data }
  const role = resolvePinnedRole(plan)

  if (role === 'invalid') {
    throw new ValidationError({
      collection: 'plans',
      errors: [
        {
          path: 'isTrial',
          message: 'Тариф не может быть одновременно пробным и с ценой по запросу.',
        },
      ],
      id: originalDoc?.id,
      req,
    })
  }

  if (!role || !plan.line) {
    return data
  }

  const conditions: Where[] = [{ line: { equals: plan.line } }, { [role]: { equals: true } }]

  if (originalDoc?.id !== undefined) {
    conditions.push({ id: { not_equals: originalDoc.id } })
  }

  const { totalDocs } = await req.payload.find({
    collection: 'plans',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    req,
    where: { and: conditions },
  })

  if (totalDocs > 0) {
    throw new ValidationError({
      collection: 'plans',
      errors: [{ path: role, message: DUPLICATE_ROLE_MESSAGES[role] }],
      id: originalDoc?.id,
      req,
    })
  }

  return data
}
