import type { CollectionBeforeChangeHook } from 'payload'

export const assignOrder: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const line = data.line ?? originalDoc?.line
  const isLineChanged = operation === 'update' && originalDoc?.line !== line

  if (!line || (operation === 'update' && !isLineChanged)) {
    return data
  }

  if (operation === 'create' && typeof data.order === 'number' && data.order > 0) {
    return data
  }

  const { docs } = await req.payload.find({
    collection: 'plans',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    sort: '-order',
    where: { line: { equals: line } },
  })

  return { ...data, order: (docs[0]?.order ?? 0) + 1 }
}
