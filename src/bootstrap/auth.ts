import { fetchMe, refreshSession } from '@/slices/authSlice'
import { setAuthHandlers, getAccessToken } from '@/services/httpClient'
import type { AppStore } from '@/store'

export function bootstrapAuth(store: AppStore): void {
  setAuthHandlers({
    refresh: async () => {
      const result = await store.dispatch(refreshSession())
      if (refreshSession.fulfilled.match(result)) return result.payload
      return null
    },
    unauthorized: () => {
      void store.dispatch(refreshSession())
    },
  })
  if (getAccessToken()) void store.dispatch(fetchMe())
}
