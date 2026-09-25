import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медиафайл',
    plural: 'Медиа',
  },
  admin: {
    group: 'Основные',
  },
  lockDocuments: false,
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [],
  upload: {
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/avif',
      'image/svg+xml',
      'video/webm',
      'video/mp4',
      'application/pdf',
    ],
  },
}
