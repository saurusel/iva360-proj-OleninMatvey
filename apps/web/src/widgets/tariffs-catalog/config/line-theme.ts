import type { ProductKey } from '@/entities/product'
import type { ButtonVariants } from '@/shared/ui/button'

import type { TariffLine, TariffLineKey } from '../model/types'

type LineTheme = {
  tabActive: string
  tabIdle: string

  button: NonNullable<ButtonVariants['variant']>

  highlight: string

  outline: string
}

export const LINE_THEME: Record<TariffLineKey, LineTheme> = {
  meet: {
    tabActive: 'bg-meetings-primary text-white hover:bg-meetings-primary',
    tabIdle: 'text-meetings-text hover:bg-meetings-secondary',
    button: 'meetings-primary',
    highlight: 'border-meetings-primary',
    outline: 'border-meetings-primary text-meetings-primary hover:bg-meetings-secondary',
  },
  webinar: {
    tabActive: 'bg-webinars-primary text-white hover:bg-webinars-primary',
    tabIdle: 'text-webinars-text hover:bg-webinars-secondary',
    button: 'webinars-primary',
    highlight: 'border-webinars-primary',
    outline: 'border-webinars-primary text-webinars-primary hover:bg-webinars-secondary',
  },
  messenger: {
    tabActive: 'bg-messenger-primary text-white hover:bg-messenger-primary',
    tabIdle: 'text-messenger-text hover:bg-messenger-secondary',
    button: 'messenger-primary',
    highlight: 'border-messenger-primary',
    outline: 'border-messenger-primary text-messenger-primary hover:bg-messenger-secondary',
  },
  mail: {
    tabActive: 'bg-mail-primary text-white hover:bg-mail-primary',
    tabIdle: 'text-mail-text hover:bg-mail-secondary',
    button: 'mail-primary',
    highlight: 'border-mail-primary',
    outline: 'border-mail-primary text-mail-primary hover:bg-mail-secondary',
  },
  drive: {
    tabActive: 'bg-drive-primary text-white hover:bg-drive-primary',
    tabIdle: 'text-drive-text hover:bg-drive-secondary',
    button: 'drive-primary',
    highlight: 'border-drive-primary',
    outline: 'border-drive-primary text-drive-primary hover:bg-drive-secondary',
  },
  boards: {
    tabActive: 'bg-board-primary text-white hover:bg-board-primary',
    tabIdle: 'text-board-text hover:bg-board-secondary',
    button: 'board-primary',
    highlight: 'border-board-primary',
    outline: 'border-board-primary text-board-primary hover:bg-board-secondary',
  },
}

export const LINE_ICON_PRODUCT: Record<NonNullable<TariffLine['icon']>, ProductKey> = {
  meet: 'meetings',
  webinar: 'webinar',
  chat: 'messenger',
  mail: 'mail',
  disk: 'drive',
  boards: 'boards',
}
