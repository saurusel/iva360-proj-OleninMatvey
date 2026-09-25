import { Call02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import type { AppLocale } from '@iva360/shared/i18n'

import { getTariffsPage } from '@/shared/api'
import { getPhoneHref, resolveHref } from '@/shared/lib/href'
import { Button } from '@/shared/ui/button'

import ConsultationBackground from '../../../../public/icons/bg-consultation.svg'

export async function TariffsConsultation({ locale }: { locale: AppLocale }) {
  const consultation = (await getTariffsPage(locale))?.consultation

  if (!consultation?.title) {
    return null
  }

  const phoneHref = getPhoneHref(consultation.phone)
  const ctaHref = resolveHref(consultation.cta?.href, locale)

  return (
    <section className="container lg:mt-14">
      <div className="relative flex flex-col gap-6 overflow-hidden rounded-[12px] bg-(image:--gradient-promo) p-4 text-white md:flex-row md:items-center md:justify-between md:p-8 xl:p-10">
        <ConsultationBackground className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full" />
        <div className="relative flex flex-col gap-2">
          <h2 className="text-2xl leading-tight font-normal">{consultation.title}</h2>
          {consultation.text && <p className="text-base leading-6">{consultation.text}</p>}
        </div>

        <div className="relative flex shrink-0 flex-col items-start gap-4 md:items-end md:justify-center md:gap-6">
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 text-xl leading-[1.2] font-bold whitespace-nowrap hover:opacity-90"
            >
              <HugeiconsIcon icon={Call02Icon} size={20} className="shrink-0" />
              {consultation.phone}
            </a>
          )}
          {consultation.cta?.label && ctaHref && (
            <Button
              variant="white"
              size="lg"
              className="h-12 border-0 px-6 leading-[1.2] hover:bg-white/70"
              render={<Link href={ctaHref} />}
            >
              {consultation.cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
