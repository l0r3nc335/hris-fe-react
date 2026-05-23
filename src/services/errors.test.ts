import { describe, expect, it } from 'vitest'
import { normalizeApiError } from './errors'

describe('normalizeApiError', () => {
  it('normalizes unknown errors', () => {
    const result = normalizeApiError(new Error('fail'))
    expect(result.message).toBe('fail')
    expect(result.status).toBe(500)
  })
})
