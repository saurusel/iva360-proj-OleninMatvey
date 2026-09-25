export const PRODUCT_KEYS = [
  'meetings',
  'webinar',
  'messenger',
  'mail',
  'drive',
  'boards',
  'ai-assistant',
  'online-broadcasts',
] as const

export type ProductKey = (typeof PRODUCT_KEYS)[number]

export function isProductKey(value: string | null | undefined): value is ProductKey {
  return PRODUCT_KEYS.includes(value as ProductKey)
}

type ProductAppearance = {
  glyphTone: string
  chipTone: string
}

export const PRODUCT_APPEARANCE: Record<ProductKey, ProductAppearance> = {
  meetings: {
    glyphTone: 'text-emerald-600',
    chipTone: 'bg-meetings-secondary text-meetings-primary',
  },
  webinar: {
    glyphTone: 'text-violet-500',
    chipTone: 'bg-webinars-secondary text-webinars-primary',
  },
  messenger: {
    glyphTone: 'text-indigo-500',
    chipTone: 'bg-messenger-secondary text-messenger-primary',
  },
  mail: {
    glyphTone: 'text-blue-500',
    chipTone: 'bg-mail-secondary text-mail-primary',
  },
  drive: {
    glyphTone: 'text-rose-500',
    chipTone: 'bg-drive-secondary text-drive-primary',
  },
  boards: {
    glyphTone: 'text-amber-400',
    chipTone: 'bg-board-secondary text-board-primary',
  },
  'ai-assistant': {
    glyphTone: 'text-fuchsia-500',
    chipTone: 'bg-ai-secondary text-ai-primary',
  },
  'online-broadcasts': {
    glyphTone: 'text-broadcasts-primary',
    chipTone: 'bg-broadcasts-secondary text-broadcasts-primary',
  },
}
