'use client'

import { ListSelection, Pill, useListQuery } from '@payloadcms/ui'
import type { ClientCollectionConfig, Where } from 'payload'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { ALL_LINES, readQuickFilters } from './quick-filters'

type GroupsState = {
  isOpen: (groupValue: string) => boolean
  toggle: (groupValue: string) => void
}

const GroupsContext = createContext<GroupsState | null>(null)

export function PlansGroupsProvider({ children }: { children: React.ReactNode }) {
  const { query } = useListQuery()
  const activeLine = readQuickFilters(query?.where).line
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const value = useMemo<GroupsState>(
    () => ({
      isOpen: (groupValue) =>
        open[groupValue] ?? (activeLine !== ALL_LINES && groupValue === activeLine),
      toggle: (groupValue) =>
        setOpen((prev) => ({
          ...prev,
          [groupValue]: !(
            prev[groupValue] ??
            (activeLine !== ALL_LINES && groupValue === activeLine)
          ),
        })),
    }),
    [activeLine, open],
  )

  return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
}

export function PlansGroupSection({
  children,
  collectionConfig,
  count,
  groupValue,
  label,
  where,
}: {
  children: React.ReactNode
  collectionConfig: ClientCollectionConfig
  count: number
  groupValue: string
  label: string
  where: Where
}) {
  const groups = useContext(GroupsContext)
  const open = groups?.isOpen(groupValue) ?? false

  return (
    <section style={{ marginBottom: '0.5rem' }}>
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <Pill
          id={`plans-group-toggle-${groupValue}`}
          onClick={() => groups?.toggle(groupValue)}
          pillStyle={open ? 'light' : 'light-gray'}
          size="medium"
        >
          <span style={{ display: 'inline-block', width: '1rem' }}>{open ? '▾' : '▸'}</span>
          {label} · {count}
        </Pill>

        <ListSelection
          collectionConfig={collectionConfig}
          label={label}
          modalPrefix={groupValue}
          where={where}
        />
      </header>

      {open && <div style={{ marginTop: '0.75rem' }}>{children}</div>}
    </section>
  )
}
