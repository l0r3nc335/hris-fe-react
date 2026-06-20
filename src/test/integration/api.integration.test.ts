import { describe, expect, it } from 'vitest'
import { seedAuthFromApi } from './helpers'
import { httpClient } from '@/services/httpClient'

describe('API integration', () => {
  it('authenticates with seeded admin credentials via HttpOnly cookies', async () => {
    const user = await seedAuthFromApi()
    expect(user.email).toBe('admin@hris.com')
    expect(user.tenantId).toBeTruthy()
  })

  it('returns new HRIS module data', async () => {
    const user = await seedAuthFromApi()
    const headers = { 'X-Tenant-Id': user.tenantId }

    const [onboarding, benefits, training, inbox] = await Promise.all([
      httpClient.get('/onboarding', { headers }),
      httpClient.get('/benefits', { headers }),
      httpClient.get('/training', { headers }),
      httpClient.get('/messages/inbox', { headers }),
    ])

    expect(onboarding.data.data.length).toBeGreaterThan(0)
    expect(benefits.data.data.length).toBeGreaterThan(0)
    expect(training.data.data.length).toBeGreaterThan(0)
    expect(inbox.data.data.length).toBeGreaterThan(0)
  })

  it('returns org chart tree with nested children', async () => {
    const user = await seedAuthFromApi()
    const res = await httpClient.get('/org/positions-tree', {
      headers: { 'X-Tenant-Id': user.tenantId },
    })

    expect(Array.isArray(res.data.data)).toBe(true)
    expect(res.data.data[0]).toHaveProperty('children')
  })

  it('returns notification details for the header bell', async () => {
    const user = await seedAuthFromApi()
    const res = await httpClient.get('/notifications/recent', {
      headers: { 'X-Tenant-Id': user.tenantId },
    })

    expect(res.data.data.length).toBeGreaterThan(0)
    expect(res.data.data[0]).toMatchObject({
      title: expect.any(String),
      message: expect.any(String),
      read: expect.any(Boolean),
    })
  })
})
