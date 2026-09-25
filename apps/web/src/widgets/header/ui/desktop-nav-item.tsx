import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

import { hasSubmenu, type MenuItem } from '../lib/menu'

const TRIGGER_CLASS =
  'inline-flex items-center text-base font-medium tracking-wide transition-colors hover:text-primary xl:text-lg'

type DesktopNavItemProps = {
  item: MenuItem
  href: string | null
  isActive: boolean
  isExpanded: boolean
  onOpen: () => void
  onToggle: () => void
}

export function DesktopNavItem({
  item,
  href,
  isActive,
  isExpanded,
  onOpen,
  onToggle,
}: DesktopNavItemProps) {
  const tone = isActive ? 'text-primary' : 'text-foreground'

  if (!hasSubmenu(item)) {
    return (
      <li>
        {href ? (
          <Link href={href} className={cn(TRIGGER_CLASS, tone)}>
            {item.label}
          </Link>
        ) : (
          <span className={cn(TRIGGER_CLASS, 'text-foreground')}>{item.label}</span>
        )}
      </li>
    )
  }

  const chevron = (
    <HugeiconsIcon
      icon={ArrowDown01Icon}
      size={16}
      strokeWidth={2.5}
      className={cn('size-4 opacity-70 transition-transform', isExpanded && 'rotate-180')}
    />
  )

  return (
    <li onMouseEnter={onOpen} onFocus={onOpen}>
      {href ? (
        <span className={cn(TRIGGER_CLASS, 'gap-1.5', tone)}>
          <Link href={href} className="inline-flex items-center">
            {item.label}
          </Link>
          <button type="button" className="inline-flex shrink-0 items-center" onClick={onToggle}>
            {chevron}
          </button>
        </span>
      ) : (
        <button
          type="button"
          className={cn(TRIGGER_CLASS, 'gap-1.5', isExpanded ? 'text-primary' : 'text-foreground')}
          onClick={onToggle}
        >
          {item.label}
          {chevron}
        </button>
      )}
    </li>
  )
}
