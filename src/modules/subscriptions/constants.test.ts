import { describe, expect, it } from 'vitest'
import { formatBillingInterval, formatPrice } from './constants'

describe('subscription constants', () => {
  it('formats billing interval labels', () => {
    expect(formatBillingInterval('monthly')).toBe('Monthly')
    expect(formatBillingInterval('one_time')).toBe('One time')
    expect(formatBillingInterval(undefined)).toBe('—')
  })

  it('formats price with currency', () => {
    expect(formatPrice('49', 'USD')).toContain('49')
    expect(formatPrice(undefined, 'USD')).toBe('—')
  })
})
