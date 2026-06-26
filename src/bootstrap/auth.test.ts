import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { rootReducer } from '@/store/rootReducer'
import { bootstrapAuth } from './auth'

vi.mock('@/services/httpClient', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services/httpClient')>()
  return {
    ...actual,
    setAuthHandlers: vi.fn(),
    bootstrapCsrf: vi.fn().mockResolvedValue(undefined),
    clearSession: vi.fn(),
    setTenantId: vi.fn(),
  }
})

const { setAuthHandlers, bootstrapCsrf } = await import('@/services/httpClient')

describe('bootstrapAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('registers auth handlers on the HTTP client', async () => {
    const store = configureStore({ reducer: rootReducer })

    bootstrapAuth(store)

    expect(setAuthHandlers).toHaveBeenCalledOnce()
    expect(setAuthHandlers).toHaveBeenCalledWith(
      expect.objectContaining({
        refresh: expect.any(Function) as unknown,
        unauthorized: expect.any(Function) as unknown,
      }),
    )
    await vi.waitFor(() => {
      expect(bootstrapCsrf).toHaveBeenCalledOnce()
    })
  })

  it('starts session restore and probes /auth/me on every route', async () => {
    const store = configureStore({ reducer: rootReducer })
    const originalDispatch = store.dispatch.bind(store)
    const dispatchSpy = vi.spyOn(store, 'dispatch').mockImplementation((action) => {
      if (typeof action === 'function') {
        return Promise.resolve({ type: 'auth/fetchMe/rejected', payload: 'unauthorized' }) as never
      }
      return originalDispatch(action)
    })

    bootstrapAuth(store)

    expect(store.getState().auth.status).toBe('loading')
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'auth/startSessionRestore' }),
    )

    await vi.waitFor(() => {
      expect(bootstrapCsrf).toHaveBeenCalledOnce()
      expect(dispatchSpy).toHaveBeenCalled()
    })
  })
})
