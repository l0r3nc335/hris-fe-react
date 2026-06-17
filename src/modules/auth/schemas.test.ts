import { describe, expect, it } from 'vitest'
import { forgotPasswordSchema, loginSchema, registerSchema } from '@/modules/auth/schemas'

describe('auth schemas', () => {
  it('validates login payload', () => {
    const result = loginSchema.safeParse({
      email: 'admin@hris.com',
      password: 'password',
    })

    expect(result.success).toBe(true)
  })

  it('rejects short login password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@hris.com',
      password: '123',
    })

    expect(result.success).toBe(false)
  })

  it('validates register payload', () => {
    const result = registerSchema.safeParse({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@hris.com',
      password: 'secret12',
    })

    expect(result.success).toBe(true)
  })

  it('validates forgot password payload', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'admin@hris.com',
    })

    expect(result.success).toBe(true)
  })
})
