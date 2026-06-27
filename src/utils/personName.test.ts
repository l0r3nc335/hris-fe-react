import { describe, expect, it } from 'vitest'
import { parsePersonName, resolveSplitNameFields } from '@/utils/personName'

describe('parsePersonName', () => {
  it('splits a full name into first and last', () => {
    expect(parsePersonName('Jane Doe')).toEqual({ firstName: 'Jane', lastName: 'Doe' })
  })

  it('handles multi-word last names', () => {
    expect(parsePersonName('Jane Marie Doe')).toEqual({
      firstName: 'Jane',
      lastName: 'Marie Doe',
    })
  })

  it('returns a single token as first name only', () => {
    expect(parsePersonName('Jane')).toEqual({ firstName: 'Jane', lastName: '' })
  })
})

describe('resolveSplitNameFields', () => {
  it('uses explicit first and last name when present', () => {
    expect(
      resolveSplitNameFields({
        name: 'Ignored Name',
        firstName: 'Jane',
        lastName: 'Doe',
      }),
    ).toEqual({ firstName: 'Jane', lastName: 'Doe' })
  })

  it('parses the display name when split fields are missing', () => {
    expect(
      resolveSplitNameFields({
        name: 'Admin User',
      }),
    ).toEqual({ firstName: 'Admin', lastName: 'User' })
  })
})
