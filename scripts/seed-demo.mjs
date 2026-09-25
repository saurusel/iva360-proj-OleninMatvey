#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  consultation,
  durations,
  heroSlides,
  menu,
  plans,
  tariffLines,
  topbarLinks,
} from './seed-content.mjs'
import { translateLocalizedContent } from './seed-content.en.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cmsUrl = (process.env.CMS_INTERNAL_URL ?? 'http://127.0.0.1:3333').replace(/\/+$/, '')
const email = process.env.CMS_SEED_EMAIL ?? 'demo@example.ru'
const password = process.env.CMS_SEED_PASSWORD ?? 'demo'
const assetsDir = path.join(root, 'scripts/seed-assets')

const topbarHref = Object.fromEntries(topbarLinks.map((link) => [link.label, link.href]))

const topbar = [
  { label: 'Поиск', href: '#', icon: 'search' },
  { label: 'Партнерам', href: topbarHref['Партнерам'] ?? '/for-partners', icon: 'none' },
  { label: 'Контакты', href: topbarHref['Контакты'] ?? '/contacts', icon: 'phone' },
  { label: 'База знаний', href: topbarHref['База знаний'] ?? '/wiki', icon: 'book' },
]

async function login() {
  const response = await fetch(cmsUrl + '/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await response.json()
  if (!response.ok || !json.token) {
    throw new Error(
      'Не удалось войти: ' + response.status + ' ' + JSON.stringify(json).slice(0, 200),
    )
  }
  return json.token
}

async function request(pathname, options = {}) {
  const { method = 'GET', token, body } = options
  const response = await fetch(cmsUrl + pathname, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: 'JWT ' + token } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const json = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(
      method + ' ' + pathname + ' -> ' + response.status + ' ' + JSON.stringify(json).slice(0, 300),
    )
  }
  return json
}

async function ensureMedia(token, filename) {
  const localSize = fs.statSync(path.join(assetsDir, filename)).size
  const query = '/api/media?limit=10&where[filename][equals]=' + encodeURIComponent(filename)
  const existing = await request(query, { token })

  for (const doc of existing.docs) {
    if (doc.filesize === localSize) {
      console.log('  · медиа актуально: ' + filename)
      return doc.id
    }
    await request('/api/media/' + doc.id, { method: 'DELETE', token })
    console.log('  − заменяю устаревшее медиа: ' + filename)
  }

  const filePath = path.join(assetsDir, filename)
  const form = new FormData()
  const mime = filename.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
  form.append('file', new Blob([fs.readFileSync(filePath)], { type: mime }), filename)
  form.append('_payload', '{}')

  const response = await fetch(cmsUrl + '/api/media', {
    method: 'POST',
    headers: { Authorization: 'JWT ' + token },
    body: form,
  })
  const json = await response.json()
  if (!response.ok || !json.doc?.id) {
    throw new Error(
      'Загрузка ' + filename + ': ' + response.status + ' ' + JSON.stringify(json).slice(0, 200),
    )
  }
  console.log('  + медиа загружено: ' + filename)
  return json.doc.id
}

function preserveArrayIds(value, savedValue) {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      const savedItem = savedValue?.[index]
      const merged = preserveArrayIds(item, savedItem)

      return merged && typeof merged === 'object' && savedItem?.id
        ? { ...merged, id: savedItem.id }
        : merged
    })
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, childValue]) => [
        key,
        preserveArrayIds(childValue, savedValue?.[key]),
      ]),
    )
  }

  return value
}

function savedDocument(response) {
  return response.doc ?? response.result ?? response
}

async function main() {
  console.log('CMS: ' + cmsUrl)
  const token = await login()
  console.log('вошли как ' + email)

  const logoId = await ensureMedia(token, 'iva360-logo.svg')
  const trustMobileId = await ensureMedia(token, 'trust-mobile.png')
  const trustTabletId = await ensureMedia(token, 'trust-tablet.png')
  const trustDesktopId = await ensureMedia(token, 'trust-desktop.png')

  const slideImageIds = {}
  for (const slide of heroSlides) {
    const asset = slide.imageAsset
    if (asset && !slideImageIds[asset]) {
      slideImageIds[asset] = await ensureMedia(token, asset)
    }
  }

  const header = {
    topbar: { phone: '+7 495 648-66-73', email: 'info@iva360.ru', links: topbar },
    logo: logoId,
    logoHref: '/',
    title: 'IVA 360',
    menu,
    actions: {
      cart: { label: 'Корзина', href: '/cart' },
      login: { label: 'Войти', shortLabel: 'Вход', href: '/login' },
      register: { label: 'Регистрация', href: '/register' },
    },
  }

  const savedHeader = await request('/api/globals/header?locale=ru', {
    method: 'POST',
    token,
    body: header,
  })
  await request('/api/globals/header?locale=en', {
    method: 'POST',
    token,
    body: translateLocalizedContent(preserveArrayIds(header, savedDocument(savedHeader))),
  })
  console.log('  ✓ шапка заполнена: ru + en')

  const home = {
    hero: {
      slides: heroSlides.map((slide) => {
        const { imageAsset, ...rest } = slide
        return { ...rest, image: slideImageIds[imageAsset] ?? Object.values(slideImageIds)[0] }
      }),
      badgeStrip: {
        mobile: trustMobileId,
        tablet: trustTabletId,
        desktop: trustDesktopId,
      },
    },
  }

  const savedHome = await request('/api/globals/home?locale=ru', {
    method: 'POST',
    token,
    body: home,
  })
  await request('/api/globals/home?locale=en', {
    method: 'POST',
    token,
    body: translateLocalizedContent(preserveArrayIds(home, savedDocument(savedHome))),
  })
  console.log('  ✓ главная заполнена: ru + en, слайдов ' + heroSlides.length)

  const tariffsPage = {
    title: 'Подписки на продукты',
    lines: tariffLines,
    durations,
    consultation,
  }

  const savedTariffsPage = await request('/api/globals/tariffs-page?locale=ru', {
    method: 'POST',
    token,
    body: tariffsPage,
  })
  await request('/api/globals/tariffs-page?locale=en', {
    method: 'POST',
    token,
    body: translateLocalizedContent(preserveArrayIds(tariffsPage, savedDocument(savedTariffsPage))),
  })
  console.log(
    '  ✓ страница тарифов заполнена: ru + en, линий ' +
      tariffLines.length +
      ', периодов ' +
      durations.length,
  )

  const existing = await request('/api/plans?locale=ru&limit=200', { token })
  const usedIds = new Set()
  const planIds = new Map()
  const identityOf = (plan) => {
    if (plan.isTrial) return plan.line + ':trial'
    if (plan.priceOnRequest) return plan.line + ':corporate'
    return plan.line + ':ordinary:' + plan.name
  }
  const existingByIdentity = new Map(existing.docs.map((plan) => [identityOf(plan), plan]))

  for (const plan of plans) {
    const current = existingByIdentity.get(identityOf(plan))
    const planBody = {
      ...plan,
      draft: false,
      features: plan.features.map((item) => ({
        text: item.text,
        value: item.value || undefined,
      })),
    }
    const saved = await request(
      current ? '/api/plans/' + current.id + '?locale=ru' : '/api/plans?locale=ru',
      {
        method: current ? 'PATCH' : 'POST',
        token,
        body: planBody,
      },
    )
    const planId = String(saved.doc?.id ?? current?.id)
    usedIds.add(planId)
    planIds.set(identityOf(plan), {
      id: planId,
      body: preserveArrayIds(planBody, savedDocument(saved)),
    })
  }

  const stale = existing.docs.filter((doc) => !usedIds.has(String(doc.id)))
  for (const doc of stale) {
    await request('/api/plans/' + doc.id, { method: 'DELETE', token })
  }

  for (const { id, body } of planIds.values()) {
    await request('/api/plans/' + id + '?locale=en', {
      method: 'PATCH',
      token,
      body: translateLocalizedContent(body),
    })
  }
  console.log(
    '  ✓ тарифы ru + en: сохранено ' + plans.length + ', удалено устаревших ' + stale.length,
  )

  console.log('Готово. Дальше: pnpm db:backup')
}

main().catch((error) => {
  console.error('FAILED:', error.message ?? error)
  process.exitCode = 1
})
