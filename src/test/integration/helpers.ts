import { bootstrapCsrf, httpClient, setTenantId } from '@/services/httpClient'
import type { User } from '@/types'

export async function seedAuthFromApi(): Promise<User> {
  await bootstrapCsrf()
  const res = await httpClient.post<{ data: { user: User } }>('/auth/login', {
    email: 'admin@hris.com',
    password: 'password',
  })
  const user = res.data.data.user
  setTenantId(user.tenantId)
  return user
}

export { seedAuthFromApi as createAuthenticatedClient }
