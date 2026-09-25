import { buildPayloadLocaleQuery, type AppLocale } from '@iva360/shared/i18n'
import { parseWebEnv } from '@iva360/shared/schemas'

const { CMS_INTERNAL_URL } = parseWebEnv()

const REVALIDATE_SECONDS = process.env.NODE_ENV === 'production' ? 60 : 0

export type PayloadList<T> = {
  docs: T[]
  totalDocs: number
}

async function request<T>(
  path: string,
  locale: AppLocale,
  params: Record<string, string> = {},
): Promise<T | null> {
  const search = new URLSearchParams(buildPayloadLocaleQuery({ locale }))

  for (const [key, value] of Object.entries(params)) {
    search.set(key, value)
  }

  const url = `${CMS_INTERNAL_URL.replace(/\/+$/, '')}${path}?${search}`

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error(`[payload] ${response.status} ${response.statusText} — ${url}`)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`[payload] CMS is unavailable — ${url}`, error)
    return null
  }
}

export function getGlobal<T>(slug: string, locale: AppLocale): Promise<T | null> {
  return request<T>(`/api/globals/${slug}`, locale)
}

export function getCollection<T>(
  slug: string,
  locale: AppLocale,
  params: { limit: number; sort: string },
): Promise<PayloadList<T> | null> {
  return request<PayloadList<T>>(`/api/${slug}`, locale, {
    limit: String(params.limit),
    sort: params.sort,
  })
}
