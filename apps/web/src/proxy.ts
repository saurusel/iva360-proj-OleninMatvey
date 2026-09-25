import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isAppLocale } from '@iva360/shared/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isAppLocale(pathname.split('/')[1])) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
