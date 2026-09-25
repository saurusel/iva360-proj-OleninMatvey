import type { GlobalConfig, NumberFieldValidation } from 'payload'

import { linkField } from '../fields/link'
import { PLAN_PERIODS } from '../fields/plan-periods'
import { TARIFF_LINES, TARIFF_LINE_ICONS } from '../fields/tariff-lines'
import { uniqueRowValue } from '../fields/unique-row'

const validatePlanPeriod: NumberFieldValidation = (value) =>
  typeof value !== 'number' || PLAN_PERIODS.includes(value as (typeof PLAN_PERIODS)[number])
    ? true
    : 'Допустимые периоды: 3, 6 или 12 месяцев.'

export const TariffsPage: GlobalConfig = {
  slug: 'tariffs-page',
  label: 'Страница тарифов',
  admin: {
    group: 'Тарифы',
    description:
      'Вкладки, периоды оплаты и блок консультации. Карточки тарифов — в коллекции «Тарифы».',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок страницы',
      localized: true,
      required: true,
      maxLength: 120,
    },
    {
      name: 'lines',
      type: 'array',
      label: 'Вкладки продуктов',
      labels: { singular: 'Вкладка', plural: 'Вкладки' },
      maxRows: 6,
      validate: uniqueRowValue(
        'key',
        'Линия указана дважды — у каждой вкладки должен быть свой ключ.',
      ),
      admin: {
        description: 'Порядок вкладок на странице тарифов.',
        initCollapsed: true,
        components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          label: 'Ключ линии',
          required: true,
          options: TARIFF_LINES,
          admin: { description: 'Должен совпадать с продуктовой линией тарифов.' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Подпись вкладки',
          localized: true,
          required: true,
          maxLength: 30,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Иконка вкладки',
          defaultValue: 'meet',
          options: TARIFF_LINE_ICONS,
          admin: { description: 'Глиф продукта в цвете линии.' },
        },
        {
          name: 'withAi',
          type: 'checkbox',
          label: 'Показать бейдж AI',
          defaultValue: false,
          admin: { description: 'Маленький бейдж «AI» над вкладкой.' },
        },
        {
          name: 'disabled',
          type: 'checkbox',
          label: 'Скоро (вкладка видна, но не выбирается)',
          defaultValue: false,
          admin: { description: 'Для линий, которые ещё не продаются.' },
        },
      ],
    },
    {
      name: 'durations',
      type: 'array',
      label: 'Периоды оплаты',
      labels: { singular: 'Период', plural: 'Периоды' },
      maxRows: 4,
      validate: uniqueRowValue('months', 'Период указан дважды — месяцы не должны повторяться.'),
      admin: {
        description: 'Переключатель периода на странице тарифов.',
        initCollapsed: true,
        components: { RowLabel: '/components/ContentRowLabel#ContentRowLabel' },
      },
      fields: [
        {
          name: 'months',
          type: 'number',
          label: 'Месяцев',
          required: true,
          min: 3,
          max: 12,
          validate: validatePlanPeriod,
        },
        {
          name: 'discount',
          type: 'number',
          label: 'Скидка (доля), 0.1 = −10 %',
          min: 0,
          max: 1,
          defaultValue: 0,
          admin: {
            description: 'Печатается в переключателе периода; у первого периода не показывается.',
          },
        },
      ],
    },
    {
      name: 'consultation',
      type: 'group',
      label: 'Блок консультации',
      admin: {
        description: 'Тёмная карточка под карточками тарифов.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          localized: true,
          maxLength: 120,
          admin: { description: 'Без заголовка блок на сайте не выводится.' },
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Текст',
          localized: true,
          maxLength: 200,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
          maxLength: 30,
          admin: {
            description: 'Если не заполнен, телефона в блоке не будет.',
          },
        },
        linkField({ name: 'cta', label: 'Кнопка', defaultHref: '/contacts' }),
      ],
    },
  ],
}
