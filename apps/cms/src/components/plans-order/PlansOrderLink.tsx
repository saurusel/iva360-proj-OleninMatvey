'use client'

import { Pill, useConfig } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

export function PlansOrderLink() {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  return (
    <Pill pillStyle="light" to={formatAdminURL({ adminRoute, path: '/collections/plans/order' })}>
      Порядок тарифов
    </Pill>
  )
}
