import axios from 'axios'
import {
  setAccessToken,
  setRefreshToken,
  setTenantId,
} from '@/services/httpClient'
import type { User } from '@/types'

const API_BASE = `${process.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/v1`

export async function seedAuthFromApi(): Promise<User> {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    email: 'admin@hris.com',
    password: 'password',
  })
  const { tokens, user } = res.data.data as {
    tokens: { accessToken: string; refreshToken: string }
    user: User
  }
  setAccessToken(tokens.accessToken)
  setRefreshToken(tokens.refreshToken)
  setTenantId(user.tenantId)
  return user
}
