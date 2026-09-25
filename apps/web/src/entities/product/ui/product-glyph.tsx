import { cn } from '@/shared/lib/utils'

import AiIcon from '../../../../public/icons/glyphs/ai.svg'
import BoardsIcon from '../../../../public/icons/glyphs/boards.svg'
import MessengerIcon from '../../../../public/icons/glyphs/chat.svg'
import DriveIcon from '../../../../public/icons/glyphs/disk.svg'
import MailIcon from '../../../../public/icons/glyphs/mail.svg'
import MeetingsIcon from '../../../../public/icons/glyphs/meet.svg'
import WebinarIcon from '../../../../public/icons/glyphs/webinar.svg'
import BroadcastsIcon from '../../../../public/icons/products/online-broadcasts.svg'

import { PRODUCT_APPEARANCE, type ProductKey } from '../model/product'

const PRODUCT_ICONS = {
  meetings: MeetingsIcon,
  webinar: WebinarIcon,
  messenger: MessengerIcon,
  mail: MailIcon,
  drive: DriveIcon,
  boards: BoardsIcon,
  'ai-assistant': AiIcon,
  'online-broadcasts': BroadcastsIcon,
} satisfies Record<ProductKey, typeof MeetingsIcon>

export function ProductGlyph({
  product,
  className,
  size,
}: {
  product: ProductKey
  className?: string
  size?: number
}) {
  const { glyphTone } = PRODUCT_APPEARANCE[product]
  const Icon = PRODUCT_ICONS[product]

  return (
    <Icon
      className={cn('inline-block shrink-0', glyphTone, className)}
      width={size}
      height={size}
    />
  )
}
