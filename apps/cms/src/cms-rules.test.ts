import assert from 'node:assert/strict'
import test from 'node:test'

import { Media } from './collections/Media'
import { Plans } from './collections/Plans'
import { resolvePinnedRole } from './collections/Plans/roles'
import { missingPlanPeriods } from './collections/Plans/validation'
import { Users } from './collections/Users'
import { plansReorder } from './endpoints/plans-reorder'
import { validateUniqueRowValue } from './fields/unique-row'
import { Header } from './globals/Header'

const accessResult = async (rule: unknown, user: unknown) => {
  assert.equal(typeof rule, 'function')
  return (rule as (args: unknown) => unknown)({ req: { user } })
}

test('anonymous users cannot read or mutate CMS users', async () => {
  assert.equal(await accessResult(Users.access?.read, null), false)
  assert.equal(await accessResult(Users.access?.create, null), false)
  assert.equal(await accessResult(Users.access?.update, null), false)
  assert.equal(await accessResult(Users.access?.delete, null), false)
  assert.equal(await accessResult(Users.access?.read, { id: 'admin' }), true)
})

test('media is publicly readable but writable only by an authenticated user', async () => {
  assert.equal(await accessResult(Media.access?.read, null), true)
  assert.equal(await accessResult(Media.access?.create, null), false)
  assert.equal(await accessResult(Media.access?.update, { id: 'admin' }), true)
})

test('public content is readable but only authenticated users can change it', async () => {
  assert.equal(await accessResult(Header.access?.read, null), true)
  assert.equal(await accessResult(Header.access?.update, null), false)
  assert.equal(await accessResult(Header.access?.update, { id: 'admin' }), true)
  assert.equal(await accessResult(Plans.access?.read, null), true)
  assert.equal(await accessResult(Plans.access?.create, null), false)
  assert.equal(await accessResult(Plans.access?.delete, { id: 'admin' }), true)
})

test('plan role and period invariants are deterministic', () => {
  assert.equal(resolvePinnedRole({ isTrial: true }), 'isTrial')
  assert.equal(resolvePinnedRole({ priceOnRequest: true }), 'priceOnRequest')
  assert.equal(resolvePinnedRole({ isTrial: true, priceOnRequest: true }), 'invalid')
  assert.deepEqual(missingPlanPeriods([{ duration: '3' }, { duration: '12' }]), ['6'])
  assert.deepEqual(
    missingPlanPeriods([{ duration: '3' }, { duration: '6' }, { duration: '12' }]),
    [],
  )
  assert.equal(
    validateUniqueRowValue([{ duration: '3' }, { duration: '3' }], 'duration', 'duplicate'),
    'duplicate',
  )
})

test('reorder endpoint rejects anonymous and malformed requests', async () => {
  const anonymous = await plansReorder({ user: null } as never)
  assert.equal(anonymous.status, 401)

  const malformed = await plansReorder({
    json: async () => ({ line: 'unknown', orderedOrdinaryIds: [] }),
    payload: {},
    user: { id: 'admin' },
  } as never)
  assert.equal(malformed.status, 400)
})
