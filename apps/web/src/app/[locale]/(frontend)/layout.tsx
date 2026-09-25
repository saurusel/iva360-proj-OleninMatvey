import { resolveLocale } from '@/shared/i18n'
import { SiteHeader } from '@/widgets/header'
import { SupportActions } from '@/widgets/support-actions'

export default async function FrontendLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params)

  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <div className="h-[calc(4rem+env(safe-area-inset-bottom))] lg:hidden" />
      <SupportActions locale={locale} />
    </>
  )
}
