import type { GlobalConfig } from 'payload'

import {
  linkField,
  LINK_ICONS,
  MOBILE_TAB_ICONS,
  PRODUCT_ICONS,
  validateHref,
} from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка',
  admin: { group: 'Контент' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'topbar',
      type: 'group',
      label: 'Топбар',
      admin: {
        description:
          'Верхняя полоса шапки на десктопе. На мобильной версии те же данные — в меню под бургером.',
      },
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
          maxLength: 30,
          admin: {
            description:
              'Для ссылки tel: берутся только цифры и «+»; без цифр телефон не выводится.',
          },
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-mail',
          maxLength: 60,
          admin: { description: 'На сайте выводится ссылкой mailto:.' },
        },
        {
          name: 'links',
          type: 'array',
          label: 'Ссылки топбара',
          labels: { singular: 'Ссылка', plural: 'Ссылки' },
          maxRows: 6,
          admin: {
            description: 'Иконка — только из набора: произвольную картинку задать нельзя.',
            initCollapsed: true,
            components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Текст',
              localized: true,
              required: true,
              maxLength: 30,
            },
            { name: 'href', type: 'text', label: 'Ссылка', required: true, validate: validateHref },
            {
              name: 'icon',
              type: 'select',
              label: 'Иконка',
              defaultValue: 'none',
              options: LINK_ICONS,
            },
          ],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
      required: true,
    },
    {
      name: 'logoHref',
      type: 'text',
      label: 'Ссылка логотипа',
      defaultValue: '/',
      validate: validateHref,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      localized: true,
      required: true,
      maxLength: 40,
    },
    {
      name: 'menu',
      type: 'array',
      label: 'Меню',
      labels: { singular: 'Пункт меню', plural: 'Пункты меню' },
      maxRows: 8,
      admin: {
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
          admin: {
            description:
              'Можно оставить пустым: тогда пункт только раскрывает подменю, как «Продукты» и «Отрасли».',
          },
          validate: validateHref,
        },
        {
          name: 'mobileIcon',
          type: 'select',
          label: 'Иконка нижней навигации',
          defaultValue: 'subscriptions',
          options: MOBILE_TAB_ICONS,
          admin: {
            description: 'Иконка пункта в нижней навигации на мобильной версии.',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Пункты подменю',
          labels: { singular: 'Подпункт', plural: 'Подпункты' },
          maxRows: 12,
          admin: {
            description:
              'На десктопе раскрывается панелью под шапкой, на мобильной — шторкой снизу.',
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
              maxLength: 40,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              localized: true,
              maxLength: 200,
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Иконка',
              defaultValue: 'none',
              options: PRODUCT_ICONS,
            },
            { name: 'href', type: 'text', label: 'Ссылка', required: true, validate: validateHref },
          ],
        },
      ],
    },
    {
      name: 'actions',
      type: 'group',
      label: 'Кнопки в шапке',
      admin: {
        description:
          'На мобильной версии корзина выводится иконкой, а вход — коротким текстом, если он задан.',
      },
      fields: [
        linkField({ name: 'cart', label: 'Корзина', defaultHref: '/cart' }),
        linkField({
          name: 'login',
          label: 'Вход',
          withShortLabel: true,
          defaultHref: '/login',
          maxLabelLength: 20,
        }),
        linkField({
          name: 'register',
          label: 'Регистрация',
          defaultHref: '/register',
          maxLabelLength: 20,
        }),
      ],
    },
  ],
}
