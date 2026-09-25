import type { CollectionConfig } from 'payload'

import { plansReorder } from '../../endpoints/plans-reorder'
import { linkField, PRODUCT_ICONS } from '../../fields/link'
import { PLAN_PERIOD_OPTIONS } from '../../fields/plan-periods'
import { TARIFF_LINES } from '../../fields/tariff-lines'
import { assignOrder } from './hooks/assign-order'
import { ensureUniqueRole } from './hooks/ensure-unique-role'
import { hasNoPrice, hasQuantityField, isTrial } from './roles'
import {
  validateDefaultQuantity,
  validatePeriodRows,
  validateQuantityMax,
  validateTrialRole,
} from './validation'

export const Plans: CollectionConfig = {
  slug: 'plans',
  labels: { singular: 'Тариф', plural: 'Тарифы' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'planType', 'priceModel'],
    group: 'Тарифы',
    description: 'Подписки на странице тарифов, сгруппированные по продуктовым линиям.',
    listSearchableFields: ['name', 'line'],
    pagination: { defaultLimit: 30, limits: [10, 20, 30, 50, 100] },
    components: {
      views: {
        list: {
          Component: '/components/plans-list/PlansListView#PlansListView',
          actions: ['/components/plans-order/PlansOrderLink#PlansOrderLink'],
        },
        order: {
          Component: '/components/plans-order/PlansOrderView#PlansOrderView',
          path: '/order',
          exact: true,
          meta: { title: 'Порядок тарифов' },
        },
      },
    },
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  defaultSort: 'order',
  endpoints: [{ handler: plansReorder, method: 'post', path: '/reorder' }],
  hooks: { beforeChange: [ensureUniqueRole, assignOrder] },
  fields: [
    {
      name: 'planType',
      type: 'ui',
      label: 'Тип тарифа',
      admin: {
        condition: () => false,
        components: { Cell: '/components/plans-list/cells/PlanTypeCell#PlanTypeCell' },
        disableListColumn: false,
      },
    },
    {
      name: 'priceModel',
      type: 'ui',
      label: 'Тип расчёта',
      admin: {
        condition: () => false,
        components: { Cell: '/components/plans-list/cells/PriceModelCell#PriceModelCell' },
        disableListColumn: false,
      },
    },
    {
      name: 'line',
      type: 'select',
      label: 'Продуктовая линия',
      required: true,
      index: true,
      options: TARIFF_LINES,
      admin: {
        position: 'sidebar',
        description: 'Определяет вкладку на странице тарифов.',
      },
    },
    {
      name: 'isTrial',
      type: 'checkbox',
      label: 'Пробный период',
      defaultValue: false,
      validate: validateTrialRole,
      admin: {
        position: 'sidebar',
        description: 'Карточка «Бесплатно»: слева, без цены, с блоком «Содержит продукты».',
      },
    },
    {
      name: 'priceOnRequest',
      type: 'checkbox',
      label: 'Цена по запросу',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        condition: (data) => !isTrial(data),
        description: 'Карточка справа: вместо цены показывается «По запросу».',
      },
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Участвует в выборе варианта',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        condition: (data) => !hasNoPrice(data),
        description:
          'Центральная карточка в цвете линии: такие тарифы переключаются в ней как варианты одного тарифа.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      required: true,
      defaultValue: 0,
      admin: {
        hidden: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Название',
              localized: true,
              required: true,
              maxLength: 60,
              admin: { description: 'Так тариф называется в списке и на карточке.' },
            },
          ],
        },
        {
          label: 'Цена',
          admin: {
            description:
              'Либо готовая сумма за каждый период, либо расчёт по количеству пользователей.',
          },
          fields: [
            {
              name: 'prices',
              type: 'array',
              label: 'Готовые цены',
              labels: { singular: 'Период', plural: 'Периоды' },
              maxRows: 6,
              validate: validatePeriodRows(
                'Период указан дважды — у каждой цены должен быть свой период.',
                (data) => !hasNoPrice(data) && !hasQuantityField(data),
              ),
              admin: {
                condition: (data) => !hasNoPrice(data) && !hasQuantityField(data),
                description: 'Итоговая сумма за период — её и увидит покупатель.',
                initCollapsed: true,
                components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
              },
              fields: [
                {
                  name: 'duration',
                  type: 'select',
                  label: 'Период',
                  required: true,
                  options: PLAN_PERIOD_OPTIONS,
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Цена за период, ₽',
                  required: true,
                  min: 0,
                },
              ],
            },
            {
              name: 'unit',
              type: 'group',
              label: 'Цена зависит от количества',
              admin: {
                condition: (data) => !hasNoPrice(data),
                description: 'Итоговая цена = базовая сумма + цена за единицу × количество.',
              },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Настройки количества',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Подпись счётчика',
                      localized: true,
                      maxLength: 60,
                      admin: {
                        description: 'Текст слева от счётчика: «Пользователей мессенджера».',
                      },
                    },
                    { name: 'min', type: 'number', label: 'Минимум', min: 0 },
                    {
                      name: 'max',
                      type: 'number',
                      label: 'Максимум',
                      min: 0,
                      validate: validateQuantityMax,
                    },
                    { name: 'step', type: 'number', label: 'Шаг', min: 1, defaultValue: 1 },
                    {
                      name: 'defaultCount',
                      type: 'number',
                      label: 'Значение по умолчанию',
                      min: 0,
                      validate: validateDefaultQuantity,
                      admin: { description: 'С каким числом открывается карточка.' },
                    },
                  ],
                },
                {
                  name: 'unitRates',
                  type: 'array',
                  label: 'Расчёт цены по периодам',
                  labels: { singular: 'Период', plural: 'Периоды' },
                  maxRows: 6,
                  validate: validatePeriodRows(
                    'Период указан дважды — у каждого расчёта должен быть свой период.',
                    (data) => !hasNoPrice(data) && hasQuantityField(data),
                  ),
                  admin: {
                    condition: (data) => hasQuantityField(data),
                    description: 'Сумма за период при выбранном количестве — она уже итоговая.',
                    initCollapsed: true,
                    components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
                  },
                  fields: [
                    {
                      name: 'duration',
                      type: 'select',
                      label: 'Период',
                      required: true,
                      options: PLAN_PERIOD_OPTIONS,
                    },
                    {
                      name: 'unitPrice',
                      type: 'number',
                      label: 'Цена за единицу, ₽',
                      required: true,
                      min: 0,
                    },
                    {
                      name: 'fixedPrice',
                      type: 'number',
                      label: 'Базовая сумма, ₽',
                      required: true,
                      min: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Содержимое',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Что входит',
              labels: { singular: 'Пункт', plural: 'Пункты' },
              maxRows: 20,
              admin: {
                initCollapsed: true,
                components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Пункт',
                  localized: true,
                  required: true,
                  maxLength: 120,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Значение',
                  localized: true,
                  maxLength: 40,
                  admin: { description: 'Жирная часть после текста: «от 5 ГБ», «100».' },
                },
              ],
            },
            {
              name: 'products',
              type: 'array',
              label: 'Содержит продукты',
              labels: { singular: 'Продукт', plural: 'Продукты' },
              maxRows: 10,
              admin: {
                condition: (data) => isTrial(data),
                description: 'Иконки продуктов внутри пробной карточки.',
                initCollapsed: true,
                components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
              },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Иконка',
                  defaultValue: 'none',
                  options: PRODUCT_ICONS,
                },
              ],
            },
          ],
        },
        {
          label: 'Кнопки',
          fields: [
            linkField({
              name: 'cta',
              label: 'Основная кнопка',
              defaultHref: '/contacts',
            }),
            linkField({
              name: 'ctaSecondary',
              label: 'Дополнительная кнопка',
              condition: (data) => !isTrial(data),
            }),
          ],
        },
      ],
    },
  ],
}
