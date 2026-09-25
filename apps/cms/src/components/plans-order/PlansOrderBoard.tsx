'use client'

import {
  Button,
  DraggableSortable,
  DraggableSortableItem,
  Pill,
  Select,
  toast,
  useConfig,
} from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export type OrderItem = {
  id: string
  name: string
}

type PlansOrderBoardProps = {
  corporate: OrderItem[]
  line: string
  lines: { label: string; value: string }[]
  ordinary: OrderItem[]
  trial: OrderItem[]
}

const rowStyle: React.CSSProperties = {
  alignItems: 'center',
  background: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-100)',
  borderRadius: '4px',
  display: 'flex',
  gap: '0.75rem',
  padding: '0.5rem 0.75rem',
}

const handleStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--theme-elevation-500)',
  cursor: 'grab',
  fontSize: '1.1rem',
  lineHeight: 1,
  padding: '0 0.25rem',
}

export function PlansOrderBoard({ corporate, line, lines, ordinary, trial }: PlansOrderBoardProps) {
  const { config } = useConfig()
  const { admin: adminRoute, api: apiRoute } = config.routes
  const router = useRouter()
  const searchParams = useSearchParams()

  const [items, setItems] = useState(ordinary)
  const [savedKey, setSavedKey] = useState(() => ordinary.map((item) => item.id).join('|'))
  const [saving, setSaving] = useState(false)

  const currentKey = useMemo(() => items.map((item) => item.id).join('|'), [items])
  const isDirty = currentKey !== savedKey

  useEffect(() => {
    if (!isDirty) {
      return
    }

    const warnAboutUnsavedOrder = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warnAboutUnsavedOrder)

    return () => window.removeEventListener('beforeunload', warnAboutUnsavedOrder)
  }, [isDirty])

  const changeLine = (value: string) => {
    if (isDirty && !window.confirm('Изменения порядка не сохранены. Перейти к другой категории?')) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('line', value)
    router.push(
      `${formatAdminURL({ adminRoute, path: '/collections/plans/order' })}?${params.toString()}`,
    )
  }

  const move = (from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const save = async () => {
    setSaving(true)

    try {
      const response = await fetch(`${apiRoute}/plans/reorder`, {
        body: JSON.stringify({ line, orderedOrdinaryIds: items.map((item) => item.id) }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result: unknown = await response.json().catch(() => null)
      const message =
        result &&
        typeof result === 'object' &&
        'message' in result &&
        typeof result.message === 'string'
          ? result.message
          : 'Не удалось сохранить порядок.'

      if (!response.ok) {
        toast.error(message)
        return
      }

      setSavedKey(currentKey)
      toast.success('Порядок сохранён')
      router.refresh()
    } catch {
      toast.error('Не удалось сохранить порядок.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <title>{`Порядок тарифов${config.admin.meta?.titleSuffix ?? ''}`}</title>
      <div style={{ paddingBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Порядок тарифов</h1>
        <p style={{ marginBottom: '1.5rem', opacity: 0.75 }}>
          Перетаскивайте обычные тарифы внутри выбранной категории. Пробный тариф и «По запросу»
          закреплены: сайт всегда ставит их на фиксированные места.
        </p>

        <div style={{ alignItems: 'flex-end', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ minWidth: '240px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 500,
                marginBottom: '0.25rem',
                opacity: 0.75,
              }}
            >
              Категория
            </label>
            <Select
              isClearable={false}
              isSearchable={false}
              onChange={(option) => {
                const next = Array.isArray(option) ? option[0] : option
                if (next && typeof next.value === 'string') {
                  changeLine(next.value)
                }
              }}
              options={lines}
              value={lines.find((option) => option.value === line) ?? lines[0]}
            />
          </div>

          <Pill pillStyle="light" to={formatAdminURL({ adminRoute, path: '/collections/plans' })}>
            К списку тарифов
          </Pill>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}
        >
          {trial.map((item) => (
            <div key={item.id} style={rowStyle}>
              <span style={{ flex: 1 }}>{item.name}</span>
              <Pill pillStyle="light-gray" size="small">
                Закреплено
              </Pill>
            </div>
          ))}

          <div>
            <h3 style={{ margin: '0.5rem 0' }}>Порядок вариантов тарифа</h3>

            {items.length ? (
              <DraggableSortable
                ids={items.map((item) => item.id)}
                onDragEnd={({ moveFromIndex, moveToIndex }) => {
                  if (moveFromIndex !== moveToIndex) {
                    move(moveFromIndex, moveToIndex)
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map((item) => (
                    <DraggableSortableItem id={item.id} key={item.id}>
                      {({
                        attributes,
                        isDragging,
                        listeners,
                        setNodeRef,
                        transform,
                        transition,
                      }) => (
                        <div
                          ref={setNodeRef}
                          style={{
                            ...rowStyle,
                            opacity: isDragging ? 0.6 : 1,
                            transform,
                            transition,
                          }}
                        >
                          <button
                            data-test-id={`plans-order-handle-${item.id}`}
                            style={handleStyle}
                            type="button"
                            {...attributes}
                            {...listeners}
                          >
                            ≡
                          </button>
                          <span style={{ flex: 1 }}>{item.name}</span>
                        </div>
                      )}
                    </DraggableSortableItem>
                  ))}
                </div>
              </DraggableSortable>
            ) : (
              <p style={{ opacity: 0.75 }}>В этой категории нет обычных тарифов.</p>
            )}
          </div>

          {corporate.map((item) => (
            <div key={item.id} style={rowStyle}>
              <span style={{ flex: 1 }}>{item.name}</span>
              <Pill pillStyle="light-gray" size="small">
                Закреплено
              </Pill>
            </div>
          ))}
        </div>

        <div
          style={{
            alignItems: 'center',
            background: 'var(--theme-bg)',
            bottom: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '1.5rem',
            padding: '1rem 0',
            position: 'sticky',
            zIndex: 2,
          }}
        >
          <Button buttonStyle="primary" disabled={!isDirty || saving} onClick={save} type="button">
            {saving ? 'Сохраняем…' : 'Сохранить порядок'}
          </Button>
          {isDirty && (
            <Button
              buttonStyle="secondary"
              disabled={saving}
              onClick={() => setItems(ordinary)}
              type="button"
            >
              Сбросить
            </Button>
          )}
          {isDirty && <span style={{ opacity: 0.75 }}>Есть несохранённые изменения</span>}
        </div>
      </div>
    </>
  )
}
