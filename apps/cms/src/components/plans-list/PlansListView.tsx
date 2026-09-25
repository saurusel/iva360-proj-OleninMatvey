import type { I18nClient } from '@payloadcms/translations'
import { GroupByPageControls, SelectionProvider, TableColumnsProvider } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { parseSearchParams } from '@payloadcms/ui/utilities/parseSearchParams'
import { renderTable } from '@payloadcms/ui/rsc'
import { ReadonlyURLSearchParams } from 'next/navigation'
import type {
  ColumnPreference,
  Payload,
  SanitizedCollectionConfig,
  SanitizedPermissions,
  Where,
} from 'payload'
import { combineWhereConstraints, mergeListSearchAndWhere } from 'payload/shared'
import React, { Fragment } from 'react'

import { TARIFF_LINES } from '../../fields/tariff-lines'
import { PlansGroupSection } from './PlansGroupSection'
import { PlansListShell, type PlansListShellProps } from './PlansListShell'

type PlansListViewProps = {
  columnState?: React.ComponentProps<typeof TableColumnsProvider>['columnState']
  collectionConfig: SanitizedCollectionConfig
  enableRowSelections?: boolean
  i18n: I18nClient
  listPreferences?: null | { limit?: null | number }
  locale?: 'all' | 'en' | 'ru'
  payload: Payload
  permissions?: SanitizedPermissions
  searchParams?: Record<string, string | string[] | undefined>
  user?: null | Parameters<typeof getClientConfig>[0]['user']
  viewType?: Parameters<typeof renderTable>[0]['viewType']
} & Omit<PlansListShellProps, 'collectionConfig' | 'groupCount'>

const flattenSearchParams = (searchParams?: Record<string, string | string[] | undefined>) => {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value === undefined) {
      continue
    }

    for (const item of Array.isArray(value) ? value : [value]) {
      params.append(key, item)
    }
  }

  return params
}

export async function PlansListView(props: PlansListViewProps) {
  const {
    columnState,
    collectionConfig,
    description,
    enableRowSelections = true,
    i18n,
    listPreferences,
    locale,
    payload,
    permissions,
    searchParams,
    user,
    viewType,
    ...shellProps
  } = props

  if (!user) {
    return null
  }

  const collectionSlug = collectionConfig.slug
  const clientConfig = getClientConfig({
    config: payload.config,
    i18n,
    importMap: payload.importMap,
    user,
  })
  const clientCollectionConfig = clientConfig.collections.find(
    (collection) => collection.slug === collectionSlug,
  )

  if (!clientCollectionConfig) {
    return null
  }

  const parsed = parseSearchParams(new ReadonlyURLSearchParams(flattenSearchParams(searchParams)))
  const readString = (key: string) => {
    const value = parsed[key]

    return typeof value === 'string' ? value : undefined
  }
  const readJson = <T,>(key: string): T | undefined => {
    const value = parsed[key]

    if (typeof value !== 'string') {
      return undefined
    }

    try {
      return JSON.parse(value) as T
    } catch {
      return undefined
    }
  }

  const whereFromUrl =
    parsed.where && typeof parsed.where === 'object' && !Array.isArray(parsed.where)
      ? (parsed.where as Where)
      : undefined

  const where = mergeListSearchAndWhere({
    collectionConfig,
    search: readString('search') ?? '',
    where: whereFromUrl,
  })

  const columnPreferences: ColumnPreference[] = (columnState ?? []).map(({ accessor, active }) => ({
    accessor,
    active,
  }))

  const queryByGroup = readJson<Record<string, { limit?: number; page?: number }>>('queryByGroup')
  const limit =
    Number(listPreferences?.limit) || collectionConfig.admin.pagination?.defaultLimit || 10
  const requestedPage = Number(readString('page'))
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : undefined
  const sort =
    readString('sort') ??
    (typeof collectionConfig.defaultSort === 'string' ? collectionConfig.defaultSort : undefined)

  const groups: React.ReactNode[] = []

  for (const line of TARIFF_LINES) {
    const groupPage = Number(queryByGroup?.[line.value]?.page) || page
    const data = await payload.find({
      collection: collectionSlug,
      depth: 0,
      draft: true,
      fallbackLocale: false,
      includeLockStatus: true,
      limit,
      locale,
      overrideAccess: false,
      page: groupPage,
      sort,
      where: combineWhereConstraints([where, { line: { equals: line.value } }]),
      ...(user ? { user } : {}),
    })

    if (!data.totalDocs) {
      continue
    }

    const { Table } = renderTable({
      clientCollectionConfig,
      collectionConfig,
      columns: columnPreferences,
      data,
      enableRowSelections,
      fieldPermissions: permissions?.collections?.[collectionSlug]?.fields,
      i18n,
      orderableFieldName: collectionConfig.orderable === true ? '_order' : '',
      payload,
      useAsTitle: collectionConfig.admin.useAsTitle,
      viewType,
    })

    groups.push(
      <Fragment key={line.value}>
        <SelectionProvider docs={data.docs} totalDocs={data.totalDocs}>
          <PlansGroupSection
            collectionConfig={clientCollectionConfig}
            count={data.totalDocs}
            groupValue={line.value}
            label={line.label}
            where={{ line: { equals: line.value } }}
          >
            {Table}
            <GroupByPageControls
              collectionConfig={clientCollectionConfig}
              data={data}
              groupByValue={line.value}
            />
          </PlansGroupSection>
        </SelectionProvider>
      </Fragment>,
    )
  }

  return (
    <PlansListShell
      {...shellProps}
      collectionConfig={clientCollectionConfig}
      columnState={columnState}
      description={description}
      groupCount={groups.length}
      viewType={viewType}
    >
      {groups}
    </PlansListShell>
  )
}
