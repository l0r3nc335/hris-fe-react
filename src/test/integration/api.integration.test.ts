import axios from 'axios'
import { describe, expect, it } from 'vitest'

const API_BASE = `${process.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/v1`

async function login(): Promise<{ token: string; tenantId: string }> {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    email: 'admin@hris.com',
    password: 'password',
  })
  return {
    token: res.data.data.tokens.accessToken as string,
    tenantId: res.data.data.user.tenantId as string,
  }
}

function authHeaders(token: string, tenantId: string) {
  return {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Id': tenantId,
  }
}

describe('API integration', () => {
  it('authenticates with seeded admin credentials', async () => {
    const { token, tenantId } = await login()
    expect(token).toBeTruthy()
    expect(tenantId).toBeTruthy()
  })

  it('returns new HRIS module data', async () => {
    const { token, tenantId } = await login()
    const headers = authHeaders(token, tenantId)

    const [onboarding, benefits, training, inbox] = await Promise.all([
      axios.get(`${API_BASE}/onboarding`, { headers }),
      axios.get(`${API_BASE}/benefits`, { headers }),
      axios.get(`${API_BASE}/training`, { headers }),
      axios.get(`${API_BASE}/messages/inbox`, { headers }),
    ])

    expect(onboarding.data.data.length).toBeGreaterThan(0)
    expect(benefits.data.data.length).toBeGreaterThan(0)
    expect(training.data.data.length).toBeGreaterThan(0)
    expect(inbox.data.data.length).toBeGreaterThan(0)
  })

  it('returns org chart tree with nested children', async () => {
    const { token, tenantId } = await login()
    const res = await axios.get(`${API_BASE}/org/positions-tree`, {
      headers: authHeaders(token, tenantId),
    })

    expect(Array.isArray(res.data.data)).toBe(true)
    expect(res.data.data[0]).toHaveProperty('children')
  })

  it('returns notification details for the header bell', async () => {
    const { token, tenantId } = await login()
    const res = await axios.get(`${API_BASE}/notifications/recent`, {
      headers: authHeaders(token, tenantId),
    })

    expect(res.data.data.length).toBeGreaterThan(0)
    expect(res.data.data[0]).toMatchObject({
      title: expect.any(String),
      message: expect.any(String),
      read: expect.any(Boolean),
    })
  })
})
