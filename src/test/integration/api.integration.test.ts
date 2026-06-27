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

  it('searches users with AND criteria via POST /users/search', async () => {
    const user = await seedAuthFromApi()
    const headers = { 'X-Tenant-Id': user.tenantId }

    const res = await httpClient.post(
      '/users/search',
      { page: 1, limit: 20, isActive: true },
      { headers },
    )

    expect(res.data.data).toBeDefined()
    expect(res.data.meta).toMatchObject({
      page: 1,
      limit: 20,
      total: expect.any(Number),
    })
    expect(res.data.data.every((row: { status: string }) => row.status === 'active')).toBe(true)
  })

  it('searches employees with text criteria via POST /employees/search', async () => {
    const user = await seedAuthFromApi()
    const headers = { 'X-Tenant-Id': user.tenantId }

    const res = await httpClient.post(
      '/employees/search',
      { page: 1, limit: 20, status: 'active' },
      { headers },
    )

    expect(res.data.data).toBeDefined()
    expect(res.data.meta.total).toBeGreaterThanOrEqual(0)
    if (res.data.data.length > 0) {
      expect(res.data.data[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        status: 'active',
      })
    }
  })
})
