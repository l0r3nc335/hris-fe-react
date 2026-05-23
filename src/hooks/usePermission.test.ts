import { describe, expect, it } from 'vitest'
import { PERMISSIONS } from '@/constants/permissions'

describe('permissions constants', () => {
  it('defines employees read permission', () => {
    expect(PERMISSIONS.employeesRead).toBe('employees:read')
  })
})
