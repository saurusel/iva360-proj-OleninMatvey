'use client'

import { getTranslation } from '@payloadcms/translations'
import {
  Gutter,
  ListControls,
  ListHeader,
  RelationshipProvider,
  Select,
  SelectionProvider,
  TableColumnsProvider,
  useListQuery,
  useStepNav,
  useTranslation,
  useWindowInfo,
} from '@payloadcms/ui'
import type { ClientCollectionConfig } from 'payload'
import React, { useEffect } from 'react'

import { PlansGroupsProvider } from './PlansGroupSection'
import {
  applyQuickFilters,
  LINE_OPTIONS,
  PLAN_TYPE_OPTIONS,
  PRICE_MODEL_OPTIONS,
  readQuickFilters,
  type QuickFilters,
} from './quick-filters'

export type PlansListShellProps = {
  AfterList?: React.ReactNode
  AfterListTable?: React.ReactNode
  BeforeList?: React.ReactNode
  BeforeListTable?: React.ReactNode
  children?: React.ReactNode
  collectionConfig: ClientCollectionConfig
  columnState: React.ComponentProps<typeof TableColumnsProvider>['columnState']
  description?: string
  disableBulkDelete?: boolean
  disableBulkEdit?: boolean
  disableQueryPresets?: boolean
  enableRowSelections?: boolean
  groupCount: number
  hasCreatePermission: boolean
  hasDeletePermission?: boolean
  hasTrashPermission?: boolean
  listMenuItems?: React.ComponentProps<typeof ListControls>['listMenuItems']
  newDocumentURL: string
  queryPreset?: React.ComponentProps<typeof ListControls>['queryPreset']
  queryPresetPermissions?: React.ComponentProps<typeof ListControls>['queryPresetPermissions']
  renderedFilters?: React.ComponentProps<typeof ListControls>['renderedFilters']
  resolvedFilterOptions?: React.ComponentProps<typeof ListControls>['resolvedFilterOptions']
  viewType?: React.ComponentProps<typeof ListHeader>['viewType']
}

const QUICK_SELECT_WIDTH = 240

function QuickSelect({
  label,
  onChange,
  options,
  testId,
  value,
}: {
  label: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  testId: string
  value: string
}) {
  return (
    <div data-test-id={testId} style={{ minWidth: QUICK_SELECT_WIDTH }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 500,
          marginBottom: '0.25rem',
          opacity: 0.75,
        }}
      >
        {label}
      </label>
      <Select
        isClearable={false}
        isSearchable
        onChange={(option) => {
          const next = Array.isArray(option) ? option[0] : option
          if (next && typeof next.value === 'string') {
            onChange(next.value)
          }
        }}
        options={options}
        value={options.find((option) => option.value === value) ?? options[0]}
      />
    </div>
  )
}

export function PlansListShell(props: PlansListShellProps) {
  const {
    AfterList,
    AfterListTable,
    BeforeList,
    BeforeListTable,
    children,
    collectionConfig,
    collectionSlug,
    columnState,
    description,
    disableQueryPresets,
    groupCount,
    hasCreatePermission,
    hasDeletePermission,
    hasTrashPermission,
    listMenuItems,
    newDocumentURL,
    queryPreset,
    queryPresetPermissions,
    renderedFilters,
    resolvedFilterOptions,
    viewType,
  } = {
    ...props,
    collectionSlug: props.collectionConfig.slug,
  }

  const { i18n } = useTranslation()
  const { query, refineListData } = useListQuery()
  const { setStepNav } = useStepNav()
  const {
    breakpoints: { s: smallBreak },
  } = useWindowInfo()

  const quick = readQuickFilters(query?.where)

  useEffect(() => {
    setStepNav([{ label: getTranslation(collectionConfig.labels.plural, i18n) }])
  }, [collectionConfig.labels.plural, i18n, setStepNav])

  const setQuick = (patch: Partial<QuickFilters>) => {
    const next: QuickFilters = { ...quick, ...patch }
    void refineListData({ where: applyQuickFilters(query?.where, next) })
  }

  return (
    <TableColumnsProvider collectionSlug={collectionSlug} columnState={columnState}>
      <div className={`collection-list collection-list--${collectionSlug}`}>
        {BeforeList}
        <Gutter className="collection-list__wrap">
          <SelectionProvider docs={[]} totalDocs={0}>
            <ListHeader
              collectionConfig={collectionConfig}
              Description={
                description ? (
                  <div className="collection-list__sub-header">{description}</div>
                ) : undefined
              }
              disableBulkDelete
              disableBulkEdit
              hasCreatePermission={hasCreatePermission}
              hasDeletePermission={hasDeletePermission}
              hasTrashPermission={hasTrashPermission}
              i18n={i18n}
              isBulkUploadEnabled={false}
              isTrashEnabled={false}
              newDocumentURL={newDocumentURL}
              openBulkUpload={() => undefined}
              smallBreak={smallBreak}
              viewType={viewType}
            />
          </SelectionProvider>

          <ListControls
            collectionConfig={collectionConfig}
            collectionSlug={collectionSlug}
            disableQueryPresets={disableQueryPresets}
            listMenuItems={listMenuItems}
            queryPreset={queryPreset}
            queryPresetPermissions={queryPresetPermissions}
            renderedFilters={renderedFilters}
            resolvedFilterOptions={resolvedFilterOptions}
          />

          <div
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <QuickSelect
              label="Категория"
              onChange={(value) => setQuick({ line: value })}
              options={LINE_OPTIONS}
              testId="plans-quick-filter-line"
              value={quick.line}
            />
            <QuickSelect
              label="Тип тарифа"
              onChange={(value) => setQuick({ planType: value as QuickFilters['planType'] })}
              options={PLAN_TYPE_OPTIONS}
              testId="plans-quick-filter-plan-type"
              value={quick.planType}
            />
            <QuickSelect
              label="Тип расчёта"
              onChange={(value) => setQuick({ priceModel: value as QuickFilters['priceModel'] })}
              options={PRICE_MODEL_OPTIONS}
              testId="plans-quick-filter-price-model"
              value={quick.priceModel}
            />
          </div>

          {BeforeListTable}

          <PlansGroupsProvider key={quick.line}>
            <div className="collection-list__tables">
              <RelationshipProvider>
                {groupCount > 0 ? (
                  children
                ) : (
                  <div className="collection-list__no-results">
                    <h3>{i18n.t('general:noResultsFound')}</h3>
                    <p>{i18n.t('general:noResultsDescription')}</p>
                  </div>
                )}
              </RelationshipProvider>
            </div>
          </PlansGroupsProvider>

          {AfterListTable}
        </Gutter>
        {AfterList}
      </div>
    </TableColumnsProvider>
  )
}
