import { localizeAppHref } from '@iva360/shared'
import type { AppLocale } from '@iva360/shared/i18n'

import { getHeader } from '@/shared/api'
import { getPhoneHref } from '@/shared/lib/href'

import { HelpMenu } from './help-menu'
import { MeetActions } from './meet-actions'
import { SupportGlyph } from './support-glyph'

export async function SupportActions({ locale }: { locale: AppLocale }) {
  const header = await getHeader(locale)

  return (
    <div className="fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-end gap-6 lg:bottom-6">
      <MeetActions href={localizeAppHref('/start_meet', locale)} />

      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#00b08b] text-white lg:size-14">
        <SupportGlyph name="chat-bubbles" className="h-[29px] w-7" />
      </span>

      <HelpMenu
        knowledgeBaseHref={localizeAppHref('/wiki', locale)}
        email={header?.topbar?.email}
        phoneHref={getPhoneHref(header?.topbar?.phone)}
      />
    </div>
  )
}
