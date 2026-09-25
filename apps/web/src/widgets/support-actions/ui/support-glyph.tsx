import { cn } from '@/shared/lib/utils'

import CalendarIcon from '../../../../public/icons/glyphs/calendar.svg'
import ChatBubblesIcon from '../../../../public/icons/glyphs/chat-bubbles.svg'
import MeetIcon from '../../../../public/icons/glyphs/meet.svg'
import UsersIcon from '../../../../public/icons/glyphs/users.svg'

const SUPPORT_ICONS = {
  meet: MeetIcon,
  users: UsersIcon,
  calendar: CalendarIcon,
  'chat-bubbles': ChatBubblesIcon,
} as const

export type SupportIconName = keyof typeof SUPPORT_ICONS

export function SupportGlyph({ name, className }: { name: SupportIconName; className?: string }) {
  const Icon = SUPPORT_ICONS[name]

  return <Icon className={cn('inline-block shrink-0 fill-current', className)} />
}
