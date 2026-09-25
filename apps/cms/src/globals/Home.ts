import type { GlobalConfig } from 'payload'

import { linkField, PRODUCT_ICONS, validateHref } from '../fields/link'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Главная',
  admin: { group: 'Контент' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      admin: { description: 'Первый экран главной: слайдер и полоса бейджей под ним.' },
      fields: [
        {
          name: 'slides',
          type: 'array',
          label: 'Слайды',
          labels: { singular: 'Слайд', plural: 'Слайды' },
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Слайды переключаются автоматически, стрелками и точками под ними.',
            initCollapsed: true,
            components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок',
              localized: true,
              required: true,
              maxLength: 120,
              admin: { description: 'Лучше всего смотрится заголовок до 80 символов.' },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              localized: true,
              maxLength: 300,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Изображение',
              required: true,
            },
            {
              name: 'chips',
              type: 'array',
              label: 'Чипы продуктов',
              labels: { singular: 'Чип', plural: 'Чипы' },
              maxRows: 10,
              admin: {
                description:
                  'Быстрые ссылки на продукты под заголовком. Цвет чипа задаётся иконкой продукта.',
                initCollapsed: true,
                components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Название',
                  localized: true,
                  required: true,
                  maxLength: 30,
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Ссылка',
                  required: true,
                  validate: validateHref,
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Иконка продукта',
                  defaultValue: 'none',
                  options: PRODUCT_ICONS,
                },
              ],
            },
            linkField({
              name: 'cta',
              label: 'Основная кнопка',
              defaultHref: '/contacts',
            }),
            linkField({ name: 'ctaSecondary', label: 'Вторая кнопка' }),
          ],
        },
        {
          name: 'badgeStrip',
          type: 'group',
          label: 'Полоса документов',
          admin: {
            description:
              'Отдельная картинка под каждую ширину: на мобильной документы идут столбиком, на десктопе — в строку.',
          },
          fields: [
            {
              name: 'mobile',
              type: 'upload',
              relationTo: 'media',
              label: 'Мобильное изображение',
            },
            {
              name: 'tablet',
              type: 'upload',
              relationTo: 'media',
              label: 'Планшетное изображение',
            },
            {
              name: 'desktop',
              type: 'upload',
              relationTo: 'media',
              label: 'Десктопное изображение',
            },
          ],
        },
      ],
    },
  ],
}
