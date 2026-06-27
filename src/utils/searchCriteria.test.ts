import { describe, expect, it } from 'vitest'
import { buildSearchPayload, createEmptySearchValues } from '@/utils/searchCriteria'
import { USER_SEARCH_FIELDS } from '@/modules/users/searchFields'

describe('buildSearchPayload', () => {
  it('strips empty text fields and any tri-state values', () => {
    const values = createEmptySearchValues(USER_SEARCH_FIELDS)
    values.email = 'admin@'
    values.firstName = '  '
    values.isActive = 'yes'
    values.emailVerified = 'any'

    expect(buildSearchPayload(values, USER_SEARCH_FIELDS)).toEqual({
      email: 'admin@',
      isActive: true,
    })
  })

  it('maps tri-state no to false', () => {
    const values = createEmptySearchValues(USER_SEARCH_FIELDS)
    values.isActive = 'no'
    values.emailVerified = 'no'

    expect(buildSearchPayload(values, USER_SEARCH_FIELDS)).toEqual({
      isActive: false,
      emailVerified: false,
    })
  })

  it('includes partial date ranges', () => {
    const values = createEmptySearchValues(USER_SEARCH_FIELDS)
    values.createdAtFrom = '2024-01-01'
    values.deletedAtTo = '2024-12-31'

    expect(buildSearchPayload(values, USER_SEARCH_FIELDS)).toEqual({
      createdAtFrom: '2024-01-01',
      deletedAtTo: '2024-12-31',
    })
  })
})

describe('createEmptySearchValues', () => {
  it('initializes tri-state and select fields to any', () => {
    const values = createEmptySearchValues(USER_SEARCH_FIELDS)
    expect(values.isActive).toBe('any')
    expect(values.emailVerified).toBe('any')
    expect(values.email).toBe('')
    expect(values.createdAtFrom).toBe('')
    expect(values.createdAtTo).toBe('')
  })
})
