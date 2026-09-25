import type { Metadata, Viewport } from 'next'

import { locales } from '@iva360/shared/i18n'

import { getDictionary, I18nProvider, resolveLocale } from '@/shared/i18n'
import { cn } from '@/shared/lib/utils'

import { guarujaNeue, inter } from '../assets/fonts'

import '../assets/css/globals.css'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { meta } = getDictionary(await resolveLocale(params))

  return {
    applicationName: meta.applicationName,
    title: { default: meta.title, template: meta.titleTemplate },
    description: meta.description,
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  viewportFit: 'cover',
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params)

  return (
    <html lang={locale} className={cn(inter.variable, guarujaNeue.variable)}>
      <body className="flex min-h-screen flex-col">
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  )
}
