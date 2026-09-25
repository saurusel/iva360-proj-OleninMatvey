import { sanitizeHref } from '@iva360/shared'
import type { Condition, Field, TextFieldValidation } from 'payload'

export const validateHref: TextFieldValidation = (value) =>
  !value || sanitizeHref(value) !== null
    ? true
    : 'Укажите относительный путь, якорь или ссылку с протоколом http, https, mailto или tel.'

export const LINK_ICONS = [
  { label: 'Без иконки', value: 'none' },
  { label: 'Поиск', value: 'search' },
  { label: 'Телефон', value: 'phone' },
  { label: 'База знаний', value: 'book' },
]

export const PRODUCT_ICONS = [
  { label: 'Без иконки', value: 'none' },
  { label: 'Встречи', value: 'meetings' },
  { label: 'Вебинары', value: 'webinar' },
  { label: 'Мессенджер', value: 'messenger' },
  { label: 'Почта', value: 'mail' },
  { label: 'Диск', value: 'drive' },
  { label: 'Доски', value: 'boards' },
  { label: 'ИИ-Ассистент', value: 'ai-assistant' },
  { label: 'Онлайн-трансляции', value: 'online-broadcasts' },
]

export const MOBILE_TAB_ICONS = [
  { label: 'Подписки', value: 'subscriptions' },
  { label: 'Отрасли', value: 'industries' },
  { label: 'Блог', value: 'blog' },
  { label: 'Мероприятия', value: 'events' },
]

type LinkFieldOptions = {
  name: string
  label: string
  required?: boolean

  withShortLabel?: boolean
  maxLabelLength?: number
  defaultHref?: string
  condition?: Condition
}

export function linkField({
  name,
  label,
  required = false,
  withShortLabel = false,
  maxLabelLength = 40,
  defaultHref,
  condition,
}: LinkFieldOptions): Field {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      label: 'Текст',
      localized: true,
      required,
      maxLength: maxLabelLength,
    },
  ]

  if (withShortLabel) {
    fields.push({
      name: 'shortLabel',
      type: 'text',
      label: 'Короткий текст (мобильная версия)',
      localized: true,
      maxLength: maxLabelLength,
    })
  }

  fields.push({
    name: 'href',
    type: 'text',
    label: 'Ссылка',
    required,
    defaultValue: defaultHref,
    validate: validateHref,
  })

  return {
    name,
    type: 'group',
    label,
    ...(condition ? { admin: { condition } } : {}),
    fields,
  }
}
