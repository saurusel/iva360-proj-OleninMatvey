'use client'

import Link from 'next/link'

import { localizeAppHref } from '@iva360/shared'

import { useI18n } from '@/shared/i18n'
import { Button } from '@/shared/ui/button'

export function NotFoundPage() {
  const { locale, t } = useI18n()

  return (
    <main className="container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-bold md:text-5xl">{t.notFound.title}</h1>
      <p className="text-muted-foreground">{t.notFound.description}</p>
      <Button size="lg" className="mt-4" render={<Link href={localizeAppHref('/', locale)} />}>
        {t.notFound.backHome}
      </Button>
    </main>
  )
}
